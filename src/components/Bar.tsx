import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'

type Props = {
  value: number
  maxValue: number
  isToday?: boolean
}

export default function Bar({ value, maxValue, isToday }: Props) {
  const height = useSharedValue(0)

  const maxHeight = 120

  useEffect(() => {
    const ratio = value / (maxValue || 1)
    height.value = withTiming(ratio * maxHeight, { duration: 600 })
  }, [value])

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }))

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bar,
          animatedStyle,
          isToday && styles.todayBar,
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 16,
    backgroundColor: '#1A2A3A',
    borderRadius: 8,
  },
  todayBar: {
    backgroundColor: '#00E5FF',
  },
})