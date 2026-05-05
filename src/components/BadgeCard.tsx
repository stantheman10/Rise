import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import { useEffect } from 'react'

type Props = {
  title: string
  description: string
  unlocked: boolean
}

export default function BadgeCard({ title, description, unlocked }: Props) {
  const scale = useSharedValue(1)

  useEffect(() => {
    if (unlocked) {
      scale.value = 1.2
      scale.value = withSpring(1)
    }
  }, [unlocked])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View style={[styles.card, animatedStyle, unlocked && styles.unlocked]}>
      <Text style={[styles.title, unlocked && styles.activeText]}>
        {title}
      </Text>

      <Text style={styles.desc}>{description}</Text>

      {!unlocked && <Text style={styles.locked}>Locked</Text>}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    opacity: 0.5,
  },

  unlocked: {
    opacity: 1,
    borderWidth: 1,
    borderColor: '#00E5FF',
  },

  title: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },

  activeText: {
    color: '#00E5FF',
  },

  desc: {
    color: '#7DD3FC',
    fontSize: 12,
    marginTop: 4,
  },

  locked: {
    marginTop: 6,
    color: '#AAA',
    fontSize: 11,
  },
})