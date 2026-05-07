import { BlurView } from '@react-native-community/blur'
import {
  BackdropFilter,
  BlendMode,
  BlurStyle,
  Canvas,
  ColorChannel,
  ImageFilter,
  Skia,
  TileMode,
  makeImageFromView,
  vec,
} from '@shopify/react-native-skia'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Platform, View } from 'react-native'
import { frag, glsl } from './utils'

const commonGlsl = glsl`
  uniform vec2 resolution;
  uniform float radius;
  uniform shader blurredImage;
  uniform shader gradientMap;
  uniform float thickness;

  const float index = 1.5;
  const float displacementScale = 20.0;
  float baseHeight() { return thickness * 80.0; }
  const float color_mix = 0.001;
  const vec4 color_base = vec4(1.0, 1.0, 1.0, 0.0);

  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  vec2 calculateGradient(vec2 p, vec2 halfSize, float r) {
    const float epsilon = 0.5;
    vec2 ex = vec2(epsilon, 0.0);
    vec2 ey = vec2(0.0, epsilon);
    return vec2(
      sdRoundedBox(p + ex, halfSize, r) - sdRoundedBox(p - ex, halfSize, r),
      sdRoundedBox(p + ey, halfSize, r) - sdRoundedBox(p - ey, halfSize, r)
    ) / (2.0 * epsilon);
  }

  vec3 getNormal(float sd, vec2 g, float thickness) {
    float n_cos = max(thickness + sd, 0.0) / thickness;
    float n_sin = sqrt(1.0 - n_cos * n_cos);
    return normalize(vec3(g.x * n_cos, g.y * n_cos, n_sin));
  }

  float getHeight(float sd, float thickness) {
    if (sd >= 0.0) return 0.0;
    if (sd < -thickness) return thickness;
    float x = thickness + sd;
    return sqrt(thickness * thickness - x * x);
  }

  float insetBandFrost(float dOuter, float dInner, float feather) {
    float f = max(feather, 0.5);
    float insideOuter = 1.0 - smoothstep(-f, f, dOuter);
    float inBandNotCore = smoothstep(-f, f, dInner);
    return clamp(insideOuter * inBandNotCore, 0.0, 1.0);
  }
`

const shader1 = frag`
  ${commonGlsl}

  vec4 calculateLiquidGlass(float sd, vec2 g, vec2 fragCoord, float frost) {
    vec3 normal = getNormal(sd, g, thickness);
    vec2 uv = fragCoord / resolution;
    vec3 incident = normalize(vec3(uv - 0.5, -1.0));

    vec3 refract_vec = refract(incident, normal, 1.0 / index);
    float h = getHeight(sd, thickness);
    float refract_length = (h + baseHeight()) / dot(vec3(0.0, 0.0, -1.0), refract_vec);

    vec4 grad = gradientMap.eval(fragCoord);
    vec2 displacement = (grad.rg - vec2(0.5)) * displacementScale;
    vec2 coord = fragCoord + refract_vec.xy * refract_length + displacement;

    vec4 refract_color = blurredImage.eval(coord);

    vec3 reflect_vec = reflect(incident, normal);
    float c = clamp(abs(reflect_vec.x - reflect_vec.y), 0.0, 1.0);
    float bright = pow(c, 0.8);
    vec4 reflect_color = vec4(bright, bright, bright, 0.4);
    float cosTheta = clamp(dot(-incident, normal), 0.0, 1.0);
    float f0 = pow((index - 1.0) / (index + 1.0), 2.0);
    float fresnel = f0 + (1.0 - f0) * pow(1.0 - cosTheta, 5.0);
    reflect_color.rgb *= fresnel * (0.8 + frost * 0.4);

    return mix(
      mix(refract_color, reflect_color, clamp((1.0 - normal.z) * 0.8 + fresnel * 0.6, 0.0, 1.0)),
      color_base,
      color_mix
    );
  }

  vec4 main(vec2 fragCoord) {
    vec2 p = fragCoord - resolution * 0.5;
    vec2 halfOuter = resolution * 0.5;
    vec2 halfInner = max(halfOuter - vec2(radius), vec2(0.5));

    float dOuter = sdRoundedBox(p, halfOuter, radius);
    float dInner = sdRoundedBox(p, halfInner, radius);
    if (dOuter > 0.0) return blurredImage.eval(fragCoord);

    vec2 g = calculateGradient(p, halfOuter, radius);
    float frost = insetBandFrost(dOuter, dInner, 3.0);
    return calculateLiquidGlass(dOuter, g, fragCoord, frost);
  }
`

const shader2 = frag`
  ${commonGlsl}

  vec4 calculateLiquidGlass(float sd, vec2 g, vec2 fragCoord, float frost) {
    float transmission = 0.9;
    float chromaticAberration = 0.03;
    float distortionScale = 9.0;

    vec3 normal = getNormal(sd, g * distortionScale, thickness);
    vec3 incident = vec3(0.0, 0.0, -1.0);

    float cosTheta = clamp(dot(-incident, normal), 0.0, 1.0);
    float f0 = pow((index - 1.0) / (index + 1.0), 2.0);
    float fresnel = f0 + (1.0 - f0) * pow(1.0 - cosTheta, 5.0);

    vec3 refract_vec = refract(incident, normal, 1.0 / index);
    float h = getHeight(sd, thickness);
    float refract_length = (h + baseHeight()) / dot(vec3(0.0, 0.0, -1.0), refract_vec);

    vec4 grad = gradientMap.eval(fragCoord);
    vec2 mapOffset = (grad.rg - vec2(0.5)) * displacementScale;
    vec2 coordBase = fragCoord + refract_vec.xy * refract_length * 0.22 + mapOffset;
    vec2 offset_px = refract_vec.xy * chromaticAberration * 18.0;

    vec4 coreR = blurredImage.eval(coordBase - offset_px);
    vec4 coreG = blurredImage.eval(coordBase);
    vec4 coreB = blurredImage.eval(coordBase + offset_px);

    float frostMix = smoothstep(0.05, 0.95, frost);
    vec3 splitRGB = vec3(coreR.r, coreG.g, coreB.b);
    vec3 mergedRGB = mix(splitRGB, coreG.rgb, frostMix);
    vec4 refract_color = vec4(
      mergedRGB,
      coreG.a
    );

    vec4 reflect_color = vec4(1.0, 1.0, 1.0, 0.0);

    vec4 glass_color = mix(
      refract_color,
      reflect_color,
      clamp(fresnel * (1.0 - transmission) + frost * 0.08, 0.0, 1.0)
    );
    return mix(glass_color, vec4(1.0, 1.0, 1.0, 0.0), 0.05);
  }

  vec4 main(vec2 fragCoord) {
    vec2 p = fragCoord - resolution * 0.5;
    vec2 halfOuter = resolution * 0.5;
    vec2 halfInner = max(halfOuter - vec2(radius), vec2(0.5));

    float dOuter = sdRoundedBox(p, halfOuter, radius);
    float dInner = sdRoundedBox(p, halfInner, radius);
    if (dOuter > 0.0) return blurredImage.eval(fragCoord);

    vec2 g = calculateGradient(p, halfOuter, radius);
    float frost = insetBandFrost(dOuter, dInner, 3.0);
    return calculateLiquidGlass(dOuter, g, fragCoord, frost);
  }
`

interface ShaderProps {
  size: { width: number; height: number }
  layout: { x: number; y: number }
  thickness: number
  radius: number
  chromaticAberration?: boolean
}

export const Shader = ({ size, layout, thickness, radius, chromaticAberration }: ShaderProps) => {
  const shaderFilter = chromaticAberration ? shader2 : shader1
  const { width, height } = size
  const clip = Skia.RRectXY(Skia.XYWHRect(0, 0, width, height), radius, radius)
  const backdropRef = useRef<View>(null)
  const [backdropImage, setBackdropImage] = useState<Awaited<
    ReturnType<typeof makeImageFromView>
  > | null>(null)

  const captureBackdrop = useCallback(async () => {
    if (!backdropRef.current) return
    try {
      const image = await makeImageFromView(backdropRef)
      if (!image) return
      setBackdropImage((prev: any) => {
        prev?.dispose()
        return image
      })
    } catch {
      // The native tag can be unavailable briefly during mount/layout.
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    const capture = async () => {
      if (cancelled) return
      try {
        await captureBackdrop()
      } catch {}
    }

    const startTimer = setTimeout(() => {
      void capture()
    }, 80)
    const interval = setInterval(() => {
      void capture()
    }, 180)

    return () => {
      cancelled = true
      clearTimeout(startTimer)
      clearInterval(interval)
    }
  }, [captureBackdrop, width, height, radius])

  const yStart = Math.ceil((radius / height) * 15) / 100
  const yEnd = Math.floor(100 - (radius / height) * 15) / 100
  const xStart = Math.ceil((radius / width) * 15) / 100
  const xEnd = Math.floor(100 - (radius / width) * 15) / 100

  const gradientSnapshot = useMemo(() => {
    const surface = Skia.Surface.Make(width, height)
    if (!surface) return null
    const canvas = surface.getCanvas()

    // 1. Base gray #808080
    const basePaint = Skia.Paint()
    basePaint.setColor(Skia.Color('#808080'))
    canvas.drawRect(Skia.XYWHRect(0, 0, width, height), basePaint)

    // 2. Navy #000080
    const navyPaint = Skia.Paint()
    navyPaint.setColor(Skia.Color('#000080'))
    canvas.drawRect(Skia.XYWHRect(0, 0, width, height), navyPaint)

    // 3. Green gradient Y - screen
    const greenPaint = Skia.Paint()
    greenPaint.setBlendMode(BlendMode.Screen)
    greenPaint.setShader(
      Skia.Shader.MakeLinearGradient(
        vec(0, height * yStart),
        vec(0, height * yEnd),
        [Skia.Color('#00FF00'), Skia.Color('#000000')],
        [0, 1],
        TileMode.Clamp
      )
    )
    canvas.drawRect(Skia.XYWHRect(0, 0, width, height), greenPaint)

    // 4. Red gradient X - screen
    const redPaint = Skia.Paint()
    redPaint.setBlendMode(BlendMode.Screen)
    redPaint.setShader(
      Skia.Shader.MakeLinearGradient(
        vec(width * xStart, 0),
        vec(width * xEnd, 0),
        [Skia.Color('#FF0000'), Skia.Color('#000000')],
        [0, 1],
        TileMode.Clamp
      )
    )
    canvas.drawRect(Skia.XYWHRect(0, 0, width, height), redPaint)

    // 5. thickness rect blurred
    const thicknessPaint = Skia.Paint()
    thicknessPaint.setColor(Skia.Color('#808080'))
    thicknessPaint.setMaskFilter(Skia.MaskFilter.MakeBlur(BlurStyle.Normal, thickness, false))
    canvas.drawRRect(
      Skia.RRectXY(
        Skia.XYWHRect(thickness, thickness, width - 2 * thickness, height - 2 * thickness),
        radius,
        radius
      ),
      thicknessPaint
    )

    return surface.makeImageSnapshot()
  }, [width, height, yStart, yEnd, xStart, xEnd, radius, thickness])

  const glassFilter = useMemo(() => {
    if (!backdropImage || !gradientSnapshot) return null
    const gradientImageFilter = Skia.ImageFilter.MakeCompose(
      Skia.ImageFilter.MakeImage(
        gradientSnapshot,
        { x: 0, y: 0, width, height },
        { x: 0, y: 0, width, height }
      ),
      Skia.ImageFilter.MakeBlur(2, 2, TileMode.Clamp)
    )

    const backdropFilter = Skia.ImageFilter.MakeImage(
      backdropImage,
      { x: layout.x, y: layout.y, width, height },
      { x: 0, y: 0, width, height }
    )

    const displacedBackdrop = Skia.ImageFilter.MakeDisplacementMap(
      ColorChannel.R,
      ColorChannel.G,
      20,
      gradientImageFilter,
      backdropFilter
    )

    const builder = Skia.RuntimeShaderBuilder(shaderFilter)
    builder.setUniform('resolution', [width, 40])
    builder.setUniform('radius', [radius])
    builder.setUniform('thickness', [thickness])

    const filter = Skia.ImageFilter.MakeRuntimeShaderWithChildren(
      builder,
      2,
      ['blurredImage', 'gradientMap'],
      [displacedBackdrop, gradientImageFilter]
    )
    return filter
  }, [backdropImage, gradientSnapshot, shaderFilter, width, height, radius])

  return (
    <>
      <BlurView
        ref={backdropRef}
        blurType="dark"
        blurAmount={1}
        overlayColor="rgba(255, 255, 255, 0.01)"
        style={{ position: 'absolute', width, height: 40 }}
        {...(Platform.OS === 'android' ? { autoUpdate: true } : {})}
      />
      {!!glassFilter && (
        <Canvas colorSpace="srgb" style={{ position: 'absolute', width, height: 40 }}>
          <BackdropFilter clip={clip} filter={<ImageFilter filter={glassFilter} />} />
        </Canvas>
      )}
    </>
  )
}
