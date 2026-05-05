import React, { useEffect } from 'react'
import { Text, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'

export default function Toast({ message, onHide }: any) {
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(-40)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 })
    translateY.value = withTiming(0)

    const timeout = setTimeout(() => {
      opacity.value = withTiming(0)
      translateY.value = withTiming(-40)
      onHide()
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  return (
    <Animated.View style={[styles.toast, style]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: '#00E5FF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    zIndex: 999,
  },

  text: {
    color: '#001f24',
    fontWeight: '600',
  },
})