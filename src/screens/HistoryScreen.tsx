import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { useStandStore } from '../store/useStandStore'
import { formatHistoryForChart } from '../utils/history'
import Bar from '../components/Bar'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HistoryScreen() {
  const { history, streak } = useStandStore()
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const data = formatHistoryForChart(history)

  const maxValue = Math.max(...data.map(d => d.value), 1)

  const total = data.reduce((sum, d) => sum + d.value, 0)
  const average = (total / 7).toFixed(1)

  const today = new Date().toISOString().split('T')[0]

  // Get stands for selected day
  const selectedDayStands = selectedDay ? (history[selectedDay] || []) : []
  const sortedStands = selectedDayStands
    .map(timestamp => new Date(timestamp))
    .sort((a, b) => b.getTime() - a.getTime()) // Most recent first

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0F1E' }}>
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
      
      {/* Header */}
      <Text style={styles.title}>Activity History</Text>
      <Text style={styles.subtitle}>
        Your movement over the last 7 days.
      </Text>

      {/* Chart Card */}
      <View style={styles.card}>
        <View style={styles.chart}>
          {data.map(item => {
            const isToday = item.date === today
            const isSelected = item.date === selectedDay

            return (
              <Pressable
                key={item.date}
                style={styles.barWrapper}
                onPress={() => setSelectedDay(item.date === selectedDay ? null : item.date)}
              >
                <Bar
                  value={item.value}
                  maxValue={maxValue}
                  isToday={isToday}
                />
                <Text style={[styles.day, isSelected && styles.selectedDay]}>
                  {new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </Text>
                {isSelected && <View style={styles.selectionIndicator} />}
              </Pressable>
            )
          })}
        </View>

        {/* Weekly total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Weekly Total</Text>
          <Text style={styles.totalValue}>{total} Stands</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>STREAK</Text>
          <Text style={styles.statValue}>{streak}</Text>
          <Text style={styles.statSub}>Days</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>AVERAGE</Text>
          <Text style={styles.statValue}>{average}</Text>
          <Text style={styles.statSub}>Per day</Text>
        </View>
      </View>

      {/* Selected Day Stands */}
      {selectedDay && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Stands on {new Date(selectedDay).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric'
            })}
          </Text>

          {sortedStands.length === 0 ? (
            <Text style={styles.noStandsText}>No stands recorded for this day</Text>
          ) : (
            sortedStands.map((date, index) => (
              <View key={index} style={styles.standItem}>
                <Text style={styles.standText}>Stand #{sortedStands.length - index}</Text>
                <Text style={styles.standTime}>
                  {date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </Text>
              </View>
            ))
          )}
        </View>
      )}

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

  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
  },

  barWrapper: {
    alignItems: 'center',
  },

  day: {
    color: '#7DD3FC',
    marginTop: 6,
    fontSize: 12,
  },

  selectedDay: {
    color: '#00E5FF',
    fontWeight: '700',
  },

  selectionIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#00E5FF',
    marginTop: 4,
  },

  totalRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  totalLabel: {
    color: '#AAA',
  },

  totalValue: {
    color: '#00E5FF',
    fontWeight: '700',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  statCard: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 20,
    width: '48%',
  },

  statLabel: {
    color: '#7DD3FC',
    fontSize: 12,
  },

  statValue: {
    color: '#00E5FF',
    fontSize: 28,
    fontWeight: '700',
  },

  statSub: {
    color: '#AAA',
  },

  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    marginBottom: 15,
    fontWeight: '600',
  },

  standItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#1A2A3A',
    borderRadius: 8,
    marginBottom: 8,
  },

  standText: {
    color: '#FFF',
    fontSize: 16,
  },

  standTime: {
    color: '#7DD3FC',
    fontSize: 14,
  },

  noStandsText: {
    color: '#7DD3FC',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
})