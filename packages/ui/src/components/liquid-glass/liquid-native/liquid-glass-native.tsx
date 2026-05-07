import React, { useRef, useState } from 'react'
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native'
import GlassContainer from './glass-container'

export interface LiquidGlassProps extends Omit<ViewProps, 'children'> {
  children: React.ReactNode
  contentStyle?: StyleProp<ViewStyle>
  radius?: number
  chromaticAberration?: boolean
  thickness?: number
}

export default function LiquidGlassNative({
  children,
  style,
  contentStyle,
  radius = 16,
  chromaticAberration,
  thickness = 10,
  ...rootProps
}: LiquidGlassProps) {
  const glassRef = useRef<View>(null)
  const [size, setSize] = useState<{ width: number; height: number } | null>(null)
  const [layout, setLayout] = useState<{ x: number; y: number } | null>(null)

  const handleLayout = () => {
    glassRef.current?.measureInWindow((x, y, width, height) => {
      setSize({ width, height })
      setLayout({ x, y })
    })
  }

  return (
    <GlassContainer
      ref={glassRef}
      onLayout={handleLayout}
      size={size ?? { width: 0, height: 0 }}
      layout={layout ?? { x: 0, y: 0 }}
      thickness={thickness}
      radius={radius}
      chromaticAberration={chromaticAberration}
      {...rootProps}
    >
      {children}
    </GlassContainer>
  )
}
