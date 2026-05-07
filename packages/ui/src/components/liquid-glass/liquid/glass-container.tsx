'use client'

import React, { forwardRef, useId, useMemo, useState } from 'react'

import { AdvancedRadius } from './border-light'
import { GlassFilter } from './glass-filter'
import { isIOSDevice } from './utils'

/* ---------- container ---------- */
type GlassContainerProps = React.ComponentPropsWithoutRef<'div'> & {
  contentClassName?: string
  displacementScale?: number
  blur?: number
  cornerRadius?: number
  advancedRadius?: AdvancedRadius
  size?: { width: number; height: number }
  chromaticAberration?: number
  depth?: number
  borderLight?: number
  brightness?: number
  isSupported?: boolean
}

export const GlassContainer = forwardRef<HTMLDivElement, GlassContainerProps>(
  (
    {
      children,
      className = '',
      contentClassName = '',
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
    const reactId = useId()
    const [isHovered, setHover] = useState(false)

    const filterId = useMemo(() => {
      const safe = reactId.replace(/[^a-zA-Z0-9_-]/g, '')
      return safe ? `glass-${safe}` : `glass-fallback`
    }, [reactId])

    const backdropStyle = useMemo(() => {
      if (isIOSDevice) {
        return {
          backdropFilter: `blur(${blur * 2}px) brightness(${brightness}%) saturate(100%)`,
          WebkitBackdropFilter: `blur(${blur * 2}px) brightness(${brightness}%) saturate(100%)`,
          background: 'rgba(255, 255, 255, 0.08)',
        }
      }
      return {
        filter: `url(#${filterId})`,
        WebkitFilter: `url(#${filterId})`,
        backdropFilter: `blur(${blur}px) brightness(${brightness}%) saturate(100%)`,
        WebkitBackdropFilter: `blur(${blur}px) brightness(${brightness}%) saturate(100%)`,
      }
    }, [filterId, blur, brightness])

    const resolvedBorderRadius = useMemo(() => {
      if (advancedRadius) {
        const tl = advancedRadius.tl ?? cornerRadius
        const tr = advancedRadius.tr ?? cornerRadius
        const br = advancedRadius.br ?? cornerRadius
        const bl = advancedRadius.bl ?? cornerRadius
        return `${tl}px ${tr}px ${br}px ${bl}px`
      }
      return `${cornerRadius}px`
    }, [cornerRadius, advancedRadius])

    return (
      <div
        className="liquid-glass-container relative inline-flex items-center overflow-hidden transition-all duration-200 ease-in-out"
        ref={ref}
        style={{
          borderRadius: resolvedBorderRadius,
          ...style,
        }}
        onMouseEnter={(event) => {
          setHover(true)
          onMouseEnter?.(event)
        }}
        onMouseLeave={(event) => {
          setHover(false)
          onMouseLeave?.(event)
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
            position: 'absolute',
            inset: '0',
            borderRadius: resolvedBorderRadius,
            overflow: 'hidden',
          }}
        />
        <div
          className={contentClassName}
          style={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          {children}
        </div>
      </div>
    )
  }
)

GlassContainer.displayName = 'GlassContainer'
