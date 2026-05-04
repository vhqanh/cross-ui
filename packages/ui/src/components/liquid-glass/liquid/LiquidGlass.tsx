"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { getDisplacementMap } from "./displacement-filter";
import { isIOSDevice } from "./utils";

const DURATION = 800;
const REST_ANGLE = 45;
const ROTATE_DEG = 180;

export type AdvancedRadius = {
  tl?: number;
  tr?: number;
  br?: number;
  bl?: number;
};

export interface LiquidOptions {
  className?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
  displacementScale?: number;
  blur?: number;
  cornerRadius?: number;
  advancedRadius?: AdvancedRadius;
  chromaticAberration?: number;
  depth?: number;
  borderLight?: number;
  brightness?: number;
  isSupported?: boolean;
}

const BorderLight = ({
  borderLight,
  width,
  height,
  radius,
  advancedRadius,
  isHovered,
}: {
  borderLight: number;
  width: number;
  height: number;
  radius: number;
  advancedRadius?: AdvancedRadius;
  isHovered: boolean;
}) => {
  const uid = useId().replace(/:/g, "");
  const gradId = `border-grad-${uid}`;
  const gradRef = useRef<SVGLinearGradientElement>(null);

  const rafRef = useRef<number>(0);
  const angleRef = useRef<number>(REST_ANGLE);
  const isSpinningRef = useRef<boolean>(false);

  const maxR = Math.min(width, height) / 2;
  const tl = Math.min(advancedRadius?.tl ?? radius, maxR);
  const tr = Math.min(advancedRadius?.tr ?? radius, maxR);
  const br = Math.min(advancedRadius?.br ?? radius, maxR);
  const bl = Math.min(advancedRadius?.bl ?? radius, maxR);

  const buildPath = () => {
    const x = 0.5;
    const y = 0.5;
    const w = width - 1;
    const h = height - 1;
    return [
      `M ${x + tl} ${y}`,
      `L ${x + w - tr} ${y}`,
      `A ${tr} ${tr} 0 0 1 ${x + w} ${y + tr}`,
      `L ${x + w} ${y + h - br}`,
      `A ${br} ${br} 0 0 1 ${x + w - br} ${y + h}`,
      `L ${x + bl} ${y + h}`,
      `A ${bl} ${bl} 0 0 1 ${x} ${y + h - bl}`,
      `L ${x} ${y + tl}`,
      `A ${tl} ${tl} 0 0 1 ${x + tl} ${y}`,
      `Z`,
    ].join(" ");
  };

  function angleToGradientCoords(deg: number) {
    const rad = (deg * Math.PI) / 180;
    const x1 = 0.5 - 0.5 * Math.cos(rad);
    const y1 = 0.5 - 0.5 * Math.sin(rad);
    const x2 = 0.5 + 0.5 * Math.cos(rad);
    const y2 = 0.5 + 0.5 * Math.sin(rad);
    return { x1, y1, x2, y2 };
  }

  const applyAngle = useCallback((deg: number) => {
    const grad = gradRef.current;
    if (!grad) return;
    const { x1, y1, x2, y2 } = angleToGradientCoords(deg);
    grad.setAttribute("x1", String(x1));
    grad.setAttribute("y1", String(y1));
    grad.setAttribute("x2", String(x2));
    grad.setAttribute("y2", String(y2));
  }, []);

  const spinForward = useCallback(() => {
    if (isSpinningRef.current) return;

    isSpinningRef.current = true;
    const startAngle = angleRef.current;
    const targetAngle = startAngle + ROTATE_DEG;
    let startTs: number | null = null;

    const forward = (ts: number) => {
      if (startTs === null) startTs = ts;
      const t = Math.min((ts - startTs) / DURATION, 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const angle = startAngle + ROTATE_DEG * eased;
      angleRef.current = angle;
      applyAngle(angle);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(forward);
      } else {
        angleRef.current = targetAngle;
        applyAngle(targetAngle);
        isSpinningRef.current = false;
      }
    };

    rafRef.current = requestAnimationFrame(forward);
  }, [applyAngle]);

  useEffect(() => {
    if (isHovered) {
      spinForward();
    }
  }, [isHovered, spinForward]);
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const restCoords = angleToGradientCoords(REST_ANGLE);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "visible",
        zIndex: 2,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradId}
          ref={gradRef}
          x1={restCoords.x1}
          y1={restCoords.y1}
          x2={restCoords.x2}
          y2={restCoords.y2}
          gradientUnits="objectBoundingBox"
        >
          <stop
            offset="0%"
            stopColor="var(--liquid-stop-color, white)"
            stopOpacity={borderLight}
          />
          <stop
            offset="33%"
            stopColor="var(--liquid-stop-color, white)"
            stopOpacity={0}
          />
          <stop
            offset="67%"
            stopColor="var(--liquid-stop-color, white)"
            stopOpacity={0}
          />
          <stop
            offset="100%"
            stopColor="var(--liquid-stop-color, white)"
            stopOpacity={borderLight}
          />
        </linearGradient>
      </defs>

      <path
        className="blc-border-path"
        d={buildPath()}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="1"
        pathLength={100}
        strokeLinecap="round"
      />
    </svg>
  );
};
/* ---------- SVG filter ---------- */
const GlassFilter = React.memo<{
  id: string;
  displacementScale: number;
  width: number;
  height: number;
  radius: number;
  advancedRadius?: AdvancedRadius;
  blur: number;
  chromaticAberration: number;
  depth: number;
  borderLight: number;
  isSupported: boolean;
  isHovered: boolean;
}>(
  ({
    id,
    displacementScale,
    width,
    height,
    radius,
    advancedRadius,
    chromaticAberration,
    depth,
    borderLight,
    isSupported,
    isHovered,
  }) => {
    const [displacementMapHref, setDisplacementMapHref] = useState("");
    // const [specMapHref, setSpecMapHref] = useState('')

    useEffect(() => {
      const maps: Promise<string>[] = [
        getDisplacementMap({ width, height, radius, depth }),
      ];
      Promise.all(maps).then(([dispHref, _]) => {
        React.startTransition(() => {
          if (!!dispHref) setDisplacementMapHref(dispHref);
          // if (specHref) setSpecMapHref(specHref)
        });
      });
    }, [radius, height, width, depth, borderLight]);

    const hasChromaticAberration = chromaticAberration > 0;

    return (
      <>
        {isSupported && (
          <svg
            style={{
              // display: 'none',
              position: "absolute",
              width,
              height,
            }}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <filter
                id={id}
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                colorInterpolationFilters="sRGB"
              >
                {!!displacementMapHref && (
                  <feImage
                    href={displacementMapHref}
                    width="100%"
                    height="100%"
                    result="DISP_MAP"
                    preserveAspectRatio="none"
                  />
                )}

                {hasChromaticAberration ? (
                  <>
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="DISP_MAP"
                      scale={displacementScale + chromaticAberration * 2}
                      xChannelSelector="R"
                      yChannelSelector="G"
                      result="RED_DISPLACED"
                    />
                    <feColorMatrix
                      in="RED_DISPLACED"
                      type="matrix"
                      values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                      result="RED_CHANNEL"
                    />
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="DISP_MAP"
                      scale={displacementScale + chromaticAberration}
                      xChannelSelector="R"
                      yChannelSelector="G"
                      result="GREEN_DISPLACED"
                    />
                    <feColorMatrix
                      in="GREEN_DISPLACED"
                      type="matrix"
                      values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                      result="GREEN_CHANNEL"
                    />
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="DISP_MAP"
                      scale={displacementScale}
                      xChannelSelector="R"
                      yChannelSelector="G"
                      result="BLUE_DISPLACED"
                    />
                    <feColorMatrix
                      in="BLUE_DISPLACED"
                      type="matrix"
                      values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                      result="BLUE_CHANNEL"
                    />
                    <feBlend
                      in="GREEN_CHANNEL"
                      in2="BLUE_CHANNEL"
                      mode="screen"
                      result="GB_COMBINED"
                    />
                    <feBlend
                      in="RED_CHANNEL"
                      in2="GB_COMBINED"
                      mode="screen"
                      result="BACKDROP"
                    />
                  </>
                ) : (
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="DISP_MAP"
                    scale={displacementScale}
                    xChannelSelector="R"
                    yChannelSelector="G"
                    result="BACKDROP"
                  />
                )}
              </filter>
            </defs>
          </svg>
        )}
        {borderLight > 0 && (
          <BorderLight
            borderLight={borderLight}
            width={width}
            height={height}
            radius={radius}
            advancedRadius={advancedRadius}
            isHovered={isHovered}
          />
        )}
      </>
    );
  }
);

GlassFilter.displayName = "GlassFilter";

/* ---------- container ---------- */
type GlassContainerProps = React.ComponentPropsWithoutRef<"div"> & {
  contentClassName?: string;
  displacementScale?: number;
  blur?: number;
  cornerRadius?: number;
  advancedRadius?: AdvancedRadius;
  size?: { width: number; height: number };
  chromaticAberration?: number;
  depth?: number;
  borderLight?: number;
  brightness?: number;
  isSupported?: boolean;
};

const GlassContainer = forwardRef<HTMLDivElement, GlassContainerProps>(
  (
    {
      children,
      className = "",
      contentClassName = "",
      style,
      displacementScale = 100,
      blur = 2,
      cornerRadius = 10,
      advancedRadius,
      size = { width: 0, height: 0 },
      chromaticAberration = 0,
      depth = 10,
      borderLight = 0,
      brightness = 75,
      isSupported = true,
      onMouseEnter,
      onMouseLeave,
      ...rootProps
    },
    ref
  ) => {
    const reactId = useId();
    const [isHovered, setHover] = useState(false);

    const filterId = useMemo(() => {
      const safe = reactId.replace(/[^a-zA-Z0-9_-]/g, "");
      return safe ? `glass-${safe}` : `glass-fallback`;
    }, [reactId]);

    const backdropStyle = useMemo(() => {
      if (isIOSDevice) {
        return {
          backdropFilter: `blur(${
            blur * 2
          }px) brightness(${brightness}%) saturate(100%)`,
          WebkitBackdropFilter: `blur(${
            blur * 2
          }px) brightness(${brightness}%) saturate(100%)`,
          background: "rgba(255, 255, 255, 0.08)",
        };
      }
      return {
        filter: `url(#${filterId})`,
        WebkitFilter: `url(#${filterId})`,
        backdropFilter: `blur(${blur}px) brightness(${brightness}%) saturate(100%)`,
        WebkitBackdropFilter: `blur(${blur}px) brightness(${brightness}%) saturate(100%)`,
      };
    }, [filterId, blur, brightness]);

    const resolvedBorderRadius = useMemo(() => {
      if (advancedRadius) {
        const tl = advancedRadius.tl ?? cornerRadius;
        const tr = advancedRadius.tr ?? cornerRadius;
        const br = advancedRadius.br ?? cornerRadius;
        const bl = advancedRadius.bl ?? cornerRadius;
        return `${tl}px ${tr}px ${br}px ${bl}px`;
      }
      return `${cornerRadius}px`;
    }, [cornerRadius, advancedRadius]);

    return (
      <div
        className="liquid-glass-container relative inline-flex items-center overflow-hidden transition-all duration-200 ease-in-out"
        ref={ref}
        style={{
          borderRadius: resolvedBorderRadius,
          ...style,
        }}
        onMouseEnter={(event) => {
          setHover(true);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          setHover(false);
          onMouseLeave?.(event);
        }}
        {...rootProps}
      >
        {size.width > 0 && size.height > 0 && (
          <GlassFilter
            id={filterId}
            displacementScale={displacementScale}
            width={size.width}
            height={size.height}
            radius={cornerRadius}
            advancedRadius={advancedRadius}
            blur={blur}
            chromaticAberration={chromaticAberration}
            depth={depth}
            borderLight={borderLight}
            isSupported={!isIOSDevice && isSupported}
            isHovered={isHovered}
          />
        )}
        <span
          style={{
            ...backdropStyle,
            position: "absolute",
            inset: "0",
            borderRadius: resolvedBorderRadius,
            overflow: "hidden",
          }}
        />
        <div
          className={contentClassName}
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

GlassContainer.displayName = "GlassContainer";

/* ---------- public API ---------- */
export interface LiquidGlassProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  children: React.ReactNode;
  contentClassName?: string;
  displacementScale?: number;
  blur?: number;
  cornerRadius?: number;
  advancedRadius?: AdvancedRadius;
  chromaticAberration?: number;
  depth?: number;
  borderLight?: number;
  brightness?: number;
  isSupported?: boolean;
  liquidOptions?: LiquidOptions;
}

export default function LiquidGlass({
  children,
  className,
  contentClassName,
  style,
  displacementScale,
  blur,
  cornerRadius,
  advancedRadius,
  chromaticAberration,
  depth,
  borderLight,
  brightness,
  isSupported,
  liquidOptions,
  ...rootProps
}: LiquidGlassProps) {
  const resolvedClassName = className;
  const resolvedContentClassName = contentClassName;
  const resolvedStyle = {
    ...(liquidOptions?.style ?? {}),
    ...(style ?? {}),
  };
  const resolvedDisplacementScale =
    displacementScale ?? liquidOptions?.displacementScale ?? 80;
  const resolvedBlur = blur ?? liquidOptions?.blur ?? 4;
  const resolvedCornerRadius =
    cornerRadius ?? liquidOptions?.cornerRadius ?? 16;
  const resolvedAdvancedRadius =
    advancedRadius ?? liquidOptions?.advancedRadius;
  const resolvedChromaticAberration =
    chromaticAberration ?? liquidOptions?.chromaticAberration ?? 0;
  const resolvedDepth = depth ?? liquidOptions?.depth ?? 10;
  const resolvedBorderLight = borderLight ?? liquidOptions?.borderLight ?? 0;
  const resolvedBrightness = brightness ?? liquidOptions?.brightness ?? 75;
  const resolvedIsSupported = isSupported ?? liquidOptions?.isSupported ?? true;

  const glassRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null
  );
  useEffect(() => {
    if (!glassRef.current) return;

    const updateGlassSize = () => {
      if (glassRef.current) {
        const rect = glassRef.current.getBoundingClientRect();
        setSize({ width: rect.width, height: rect.height });
      }
    };

    updateGlassSize();

    const observer = new ResizeObserver(updateGlassSize);
    observer.observe(glassRef.current as unknown as Element);

    return () => observer.disconnect();
  }, []);

  return (
    <GlassContainer
      ref={glassRef}
      className={resolvedClassName}
      contentClassName={resolvedContentClassName}
      style={resolvedStyle}
      cornerRadius={resolvedCornerRadius}
      advancedRadius={resolvedAdvancedRadius}
      displacementScale={resolvedDisplacementScale}
      blur={resolvedBlur}
      chromaticAberration={resolvedChromaticAberration}
      depth={resolvedDepth}
      size={size ?? { width: 0, height: 0 }}
      borderLight={resolvedBorderLight}
      brightness={resolvedBrightness}
      isSupported={resolvedIsSupported}
      {...rootProps}
    >
      {children}
    </GlassContainer>
  );
}
