import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useStandStore } from '../store/useStandStore'
import { formatHistoryForChart } from '../utils/history'
import Bar from '../components/Bar'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HistoryScreen() {
  const { history, streak } = useStandStore()

  const data = formatHistoryForChart(history)

  const maxValue = Math.max(...data.map(d => d.value), 1)

  const total = data.reduce((sum, d) => sum + d.value, 0)
  const average = (total / 7).toFixed(1)

  const today = new Date().toISOString().split('T')[0]

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

            return (
              <View key={item.date} style={styles.barWrapper}>
                <Bar
                  value={item.value}
                  maxValue={maxValue}
                  isToday={isToday}
                />
                <Text style={styles.day}>
                  {new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </Text>
              </View>
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

      {/* Recent Activity (static for now) */}
      <Text style={styles.sectionTitle}>Recent Stands</Text>

      <View style={styles.activityCard}>
        <Text style={styles.activityText}>Morning Stretch</Text>
        <Text style={styles.activityTime}>Today • 08:45 AM</Text>
      </View>

      <View style={styles.activityCard}>
        <Text style={styles.activityText}>Desk Break</Text>
        <Text style={styles.activityTime}>Today • 11:15 AM</Text>
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
    marginBottom: 10,
  },

  activityCard: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
  },

  activityText: {
    color: '#FFF',
  },

  activityTime: {
    color: '#7DD3FC',
    fontSize: 12,
  },
})