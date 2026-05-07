import React, { forwardRef } from 'react'
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native'
import { Shader } from './shader'

type GlassContainerProps = ViewProps & {
  size: { width: number; height: number }
  layout: { x: number; y: number }
  contentStyle?: StyleProp<ViewStyle>
  radius: number
  thickness: number
  chromaticAberration?: boolean
  children: React.ReactNode
}
const GlassContainer = forwardRef<View, GlassContainerProps>(
  (
    {
      children,
      style,
      contentStyle,
      size,
      layout,
      radius,
      thickness,
      chromaticAberration,
      onLayout,
      ...rootProps
    },
    ref
  ) => {
    return (
      <View
        ref={ref}
        onLayout={onLayout}
        style={[
          {
            display: 'flex',
            position: 'relative',
            borderRadius: radius,
          },

          style,
        ]}
        {...rootProps}
      >
        {size.width > 0 && size.height > 0 && (
          <Shader size={size} radius={radius} thickness={thickness} layout={layout} />
        )}
        {contentStyle ? (
          <View
            style={[
              {
                display: 'flex',
                position: 'relative',
                width: '100%',
                height: '100%',
              },

              contentStyle,
            ]}
          >
            {children}
          </View>
        ) : (
          children
        )}
      </View>
    )
  }
)

export default GlassContainer
