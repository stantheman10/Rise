import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

type Props = {
  progress: number // 0 → 1
  size?: number
  strokeWidth?: number
}

export default function ProgressRing({
  progress,
  size = 220,
  strokeWidth = 14,
}: Props) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const animatedProgress = useSharedValue(0)

 useEffect(() => {
  animatedProgress.value = withTiming(progress, {
    duration: 700,
    easing: Easing.out(Easing.cubic),
  })
}, [progress])

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      circumference - circumference * animatedProgress.value,
  }))

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        {/* Background ring */}
        <Circle
          stroke="#1A2A3A"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Progress ring */}
        <AnimatedCircle
          stroke="#00E5FF"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  )
}