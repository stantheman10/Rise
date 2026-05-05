import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useStandStore } from '../store/useStandStore'
import { getBadges } from '../utils/badges'
import BadgeCard from '../components/BadgeCard'
import Toast from '../components/Toast'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function BadgesScreen() {
  const { streak, history } = useStandStore()

  const prevUnlocked = useRef<string[]>([])
  const [toast, setToast] = useState<string | null>(null)

  const badges = getBadges(streak, history)

  useEffect(() => {
    const unlockedNow = badges
      .filter(b => b.unlocked)
      .map(b => b.id)

    const newUnlock = unlockedNow.find(
      id => !prevUnlocked.current.includes(id)
    )

    if (newUnlock) {
      const badge = badges.find(b => b.id === newUnlock)
      if (badge) {
        setToast(`🏆 ${badge.title} unlocked!`)
      }
    }

    prevUnlocked.current = unlockedNow
  }, [badges])

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0F1E' }}>
    <View style={{ flex: 1 }}>
      
      {/* Toast */}
      {toast && (
        <Toast
          message={toast}
          onHide={() => setToast(null)}
        />
      )}

      {/* Content */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text style={styles.title}>Achievements</Text>
        <Text style={styles.subtitle}>
          Unlock badges by staying consistent.
        </Text>

        {badges.map((badge) => (
          <BadgeCard
            key={badge.id}
            title={badge.title}
            description={badge.description}
            unlocked={badge.unlocked}
          />
        ))}
      </ScrollView>

    </View>
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
})