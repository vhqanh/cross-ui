'use client'

import { useCallback, useEffect, useId, useRef } from 'react'

export type AdvancedRadius = {
  tl?: number
  tr?: number
  br?: number
  bl?: number
}

const DURATION = 800
const REST_ANGLE = 45
const ROTATE_DEG = 180

export const BorderLight = ({
  borderLight,
  width,
  height,
  radius,
  advancedRadius,
  isHovered,
}: {
  borderLight: number
  width: number
  height: number
  radius: number
  advancedRadius?: AdvancedRadius
  isHovered: boolean
}) => {
  const uid = useId().replace(/:/g, '')
  const gradId = `border-grad-${uid}`
  const gradRef = useRef<SVGLinearGradientElement>(null)

  const rafRef = useRef<number>(0)
  const angleRef = useRef<number>(REST_ANGLE)
  const isSpinningRef = useRef<boolean>(false)

  const maxR = Math.min(width, height) / 2
  const tl = Math.min(advancedRadius?.tl ?? radius, maxR)
  const tr = Math.min(advancedRadius?.tr ?? radius, maxR)
  const br = Math.min(advancedRadius?.br ?? radius, maxR)
  const bl = Math.min(advancedRadius?.bl ?? radius, maxR)

  const buildPath = () => {
    const x = 0.5
    const y = 0.5
    const w = width - 1
    const h = height - 1
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
    ].join(' ')
  }

  function angleToGradientCoords(deg: number) {
    const rad = (deg * Math.PI) / 180
    const x1 = 0.5 - 0.5 * Math.cos(rad)
    const y1 = 0.5 - 0.5 * Math.sin(rad)
    const x2 = 0.5 + 0.5 * Math.cos(rad)
    const y2 = 0.5 + 0.5 * Math.sin(rad)
    return { x1, y1, x2, y2 }
  }

  const applyAngle = useCallback((deg: number) => {
    const grad = gradRef.current
    if (!grad) return
    const { x1, y1, x2, y2 } = angleToGradientCoords(deg)
    grad.setAttribute('x1', String(x1))
    grad.setAttribute('y1', String(y1))
    grad.setAttribute('x2', String(x2))
    grad.setAttribute('y2', String(y2))
  }, [])

  const spinForward = useCallback(() => {
    if (isSpinningRef.current) return

    isSpinningRef.current = true
    const startAngle = angleRef.current
    const targetAngle = startAngle + ROTATE_DEG
    let startTs: number | null = null

    const forward = (ts: number) => {
      if (startTs === null) startTs = ts
      const t = Math.min((ts - startTs) / DURATION, 1)
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      const angle = startAngle + ROTATE_DEG * eased
      angleRef.current = angle
      applyAngle(angle)

      if (t < 1) {
        rafRef.current = requestAnimationFrame(forward)
      } else {
        angleRef.current = targetAngle
        applyAngle(targetAngle)
        isSpinningRef.current = false
      }
    }

    rafRef.current = requestAnimationFrame(forward)
  }, [applyAngle])

  useEffect(() => {
    if (isHovered) {
      spinForward()
    }
  }, [isHovered, spinForward])
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const restCoords = angleToGradientCoords(REST_ANGLE)

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'visible',
        zIndex: 2,
        pointerEvents: 'none',
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
          <stop offset="0%" stopColor="var(--liquid-stop-color, white)" stopOpacity={borderLight} />
          <stop offset="33%" stopColor="var(--liquid-stop-color, white)" stopOpacity={0} />
          <stop offset="67%" stopColor="var(--liquid-stop-color, white)" stopOpacity={0} />
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
  )
}
