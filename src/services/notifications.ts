import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { Platform } from 'react-native'

/**
 * 🔔 Notification behavior config
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
  shouldShowAlert: true,
  shouldPlaySound: true,
  shouldSetBadge: false,
  shouldShowBanner: true,
  shouldShowList: true,
})
})

/**
 * 🧠 Motivational messages (rotates randomly)
 */
const messages = [
  "Time to stand 🧍‍♂️",
  "Break the sit streak 🔥",
  "Move your body a bit 💪",
  "Don’t lose your streak ⚠️",
  "You’ve been sitting too long 👀",
]

const getRandomMessage = () => {
  return messages[Math.floor(Math.random() * messages.length)]
}

/**
 * 📲 Request permission
 */
export const requestPermissions = async (): Promise<boolean> => {
  if (!Device.isDevice) {
    console.log('Must use physical device for notifications')
    return false
  }

  const { status } = await Notifications.requestPermissionsAsync()

  if (status !== 'granted') {
    console.log('Notification permission denied')
    return false
  }

  // Android specific channel (IMPORTANT)
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('stand-reminder', {
      name: 'Stand Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#00E5FF',
    })
  }

  return true
}

/**
 * ⏱ Schedule repeating reminder
 */
export const scheduleReminder = async (intervalMinutes: number) => {
  try {
    // Clear existing notifications first
    await Notifications.cancelAllScheduledNotificationsAsync()

    const message = getRandomMessage()

    await Notifications.scheduleNotificationAsync({
      content: {
        title: message,
        body: "Get up and move for a bit.",
        sound: true,
      },
      trigger: {
  type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
  seconds: intervalMinutes * 60,
  repeats: true,
}
    })

    console.log(`Reminder set every ${intervalMinutes} minutes`)
  } catch (error) {
    console.log('Error scheduling reminder:', error)
  }
}

/**
 * ❌ Cancel all reminders
 */
export const cancelReminders = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync()
    console.log('All reminders cancelled')
  } catch (error) {
    console.log('Error cancelling reminders:', error)
  }
}

/**
 * 🔄 Reset reminder (use when user changes frequency)
 */
export const updateReminder = async (intervalMinutes: number) => {
  await cancelReminders()
  await scheduleReminder(intervalMinutes)
}