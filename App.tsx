import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabs from './src/navigation/BottomTabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useStandStore } from './src/store/useStandStore'
import { requestPermissions, scheduleReminder } from './src/services/notifications'

export default function App() {
  useEffect(() => {
    const setup = async () => {
      const store = useStandStore.getState()

      // 1. Load persisted data first
      await store.init()

      // 2. Request permission
      const granted = await requestPermissions()
      if (!granted) return

      // 3. Use saved frequency (NOT hardcoded)
      const { frequency } = useStandStore.getState()

      await scheduleReminder(frequency)
    }

    setup()
  }, [])

  return (
   <SafeAreaProvider> {/* ✅ ADD THIS */}
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}