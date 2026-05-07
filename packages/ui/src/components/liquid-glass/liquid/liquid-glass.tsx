'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AdvancedRadius } from './border-light'
import { GlassContainer } from './glass-container'

export interface LiquidOptions {
  className?: string
  contentClassName?: string
  style?: React.CSSProperties
  displacementScale?: number
  blur?: number
  cornerRadius?: number
  advancedRadius?: AdvancedRadius
  chromaticAberration?: number
  depth?: number
  borderLight?: number
  brightness?: number
  isSupported?: boolean
}

/* ---------- public API ---------- */
export interface LiquidGlassProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  children: React.ReactNode
  contentClassName?: string
  displacementScale?: number
  blur?: number
  cornerRadius?: number
  advancedRadius?: AdvancedRadius
  chromaticAberration?: number
  depth?: number
  borderLight?: number
  brightness?: number
  isSupported?: boolean
  liquidOptions?: LiquidOptions
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
  const resolvedClassName = className ?? liquidOptions?.className ?? ''
  const resolvedContentClassName = contentClassName ?? liquidOptions?.contentClassName ?? ''
  const resolvedStyle = {
    ...(liquidOptions?.style ?? {}),
    ...(style ?? {}),
  }
  const resolvedDisplacementScale = displacementScale ?? liquidOptions?.displacementScale ?? 80
  const resolvedBlur = blur ?? liquidOptions?.blur ?? 4
  const resolvedCornerRadius = cornerRadius ?? liquidOptions?.cornerRadius ?? 16
  const resolvedAdvancedRadius = advancedRadius ?? liquidOptions?.advancedRadius
  const resolvedChromaticAberration = chromaticAberration ?? liquidOptions?.chromaticAberration ?? 0
  const resolvedDepth = depth ?? liquidOptions?.depth ?? 10
  const resolvedBorderLight = borderLight ?? liquidOptions?.borderLight ?? 0
  const resolvedBrightness = brightness ?? liquidOptions?.brightness ?? 75
  const resolvedIsSupported = isSupported ?? liquidOptions?.isSupported ?? true

  const glassRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ width: number; height: number } | null>(null)
  useEffect(() => {
    if (!glassRef.current) return

    const updateGlassSize = () => {
      if (glassRef.current) {
        const rect = glassRef.current.getBoundingClientRect()
        setSize({ width: rect.width, height: rect.height })
      }
    }

    updateGlassSize()

    const observer = new ResizeObserver(updateGlassSize)
    observer.observe(glassRef.current as unknown as Element)

    return () => observer.disconnect()
  }, [])

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
  )
}
