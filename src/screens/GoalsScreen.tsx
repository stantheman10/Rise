import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native'
import Slider from '@react-native-community/slider'
import { useStandStore } from '../store/useStandStore'
import { updateReminder } from '../services/notifications'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function GoalsScreen() {
  const {
    dailyGoal,
    frequency,
    setDailyGoal,
    setFrequency,
  } = useStandStore()

  const [expanded, setExpanded] = useState(false)

  const handleGoalChange = (value: number) => {
    setDailyGoal(value)
  }

  const handleFrequencyChange = async (value: number) => {
    setFrequency(value)
    await updateReminder(value)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0F1E' }}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* Header */}
      <Text style={styles.title}>Daily Ambition</Text>
      <Text style={styles.subtitle}>
        Precision settings for your standing vitality.
      </Text>

      {/* Stand Frequency */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>STAND FREQUENCY</Text>
          <Text style={styles.value}>{frequency} m</Text>
        </View>

        <Slider
          minimumValue={30}
          maximumValue={60}
          step={5}
          value={frequency}
          onSlidingComplete={handleFrequencyChange}
          minimumTrackTintColor="#00E5FF"
          maximumTrackTintColor="#1A2A3A"
          thumbTintColor="#00E5FF"
        />

        <View style={styles.scaleRow}>
          <Text style={styles.scale}>30M</Text>
          <Text style={styles.scale}>45M</Text>
          <Text style={styles.scale}>60M</Text>
        </View>
      </View>

      {/* Daily Goal */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>DAILY GOAL</Text>
          <Text style={styles.value}>{dailyGoal} stands</Text>
        </View>

        <Slider
          minimumValue={4}
          maximumValue={24}
          step={1}
          value={dailyGoal}
          onValueChange={handleGoalChange}
          minimumTrackTintColor="#00E5FF"
          maximumTrackTintColor="#1A2A3A"
          thumbTintColor="#00E5FF"
        />

        <View style={styles.scaleRow}>
          <Text style={styles.scale}>4</Text>
          <Text style={styles.scale}>12</Text>
          <Text style={styles.scale}>24</Text>
        </View>
      </View>

      {/* Advanced Settings */}
      <Pressable onPress={() => setExpanded(!expanded)}>
        <Text style={styles.advanced}>
          ADVANCED SETTINGS {expanded ? '▲' : '▼'}
        </Text>
      </Pressable>

      {expanded && (
        <View style={styles.card}>
          <Text style={styles.advancedText}>
            More features coming soon...
          </Text>
        </View>
      )}

      {/* Promo Card */}
      <View style={styles.promo}>
        <Text style={styles.promoTitle}>PEAK PERFORMANCE</Text>
        <Text style={styles.promoText}>
          Unlock your potential.
        </Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
    padding: 20,
  },

  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '700',
  },

  subtitle: {
    color: '#7DD3FC',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  label: {
    color: '#7DD3FC',
    fontSize: 12,
  },

  value: {
    color: '#00E5FF',
    fontWeight: '700',
  },

  scaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  scale: {
    color: '#7DD3FC',
    fontSize: 12,
  },

  advanced: {
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 10,
  },

  advancedText: {
    color: '#7DD3FC',
  },

  promo: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  },

  promoTitle: {
    color: '#00E5FF',
    fontSize: 12,
    marginBottom: 5,
  },

  promoText: {
    color: '#FFF',
    fontSize: 16,
  },
})