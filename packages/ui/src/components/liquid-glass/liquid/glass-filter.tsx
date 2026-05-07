'use client'

import React, { useEffect, useState } from 'react'

import { AdvancedRadius, BorderLight } from './border-light'
import { getDisplacementMap } from './displacement-filter'

export const GlassFilter = React.memo<{
  id: string
  displacementScale: number
  width: number
  height: number
  radius: number
  advancedRadius?: AdvancedRadius
  blur: number
  chromaticAberration: number
  depth: number
  borderLight: number
  isSupported: boolean
  isHovered: boolean
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
    const [displacementMapHref, setDisplacementMapHref] = useState('')
    // const [specMapHref, setSpecMapHref] = useState('')

    useEffect(() => {
      const maps: Promise<string>[] = [getDisplacementMap({ width, height, radius, depth })]
      Promise.all(maps).then(([dispHref, _]) => {
        React.startTransition(() => {
          if (dispHref) setDisplacementMapHref(dispHref)
          // if (specHref) setSpecMapHref(specHref)
        })
      })
    }, [radius, height, width, depth, borderLight])

    const hasChromaticAberration = chromaticAberration > 0

    return (
      <>
        {isSupported && (
          <svg
            style={{
              // display: 'none',
              position: 'absolute',
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
                    <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="BACKDROP" />
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
    )
  }
)

GlassFilter.displayName = 'GlassFilter'
