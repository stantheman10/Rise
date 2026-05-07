import { create } from 'zustand'
import { saveData, loadData } from '../services/storage'
import { getTodayDate, calculateStreak } from '../utils/streak'
import { updateReminder } from '../services/notifications'

type StandState = {
  todayCount: number
  dailyGoal: number
  frequency: number
  streak: number
  lastActiveDate: string | null
  history: Record<string, number>

  init: () => Promise<void>
  logStand: () => Promise<void>
  setDailyGoal: (goal: number) => void
  setFrequency: (value: number) => void
}

export const useStandStore = create<StandState>((set, get) => ({
  todayCount: 0,
  dailyGoal: 12,
  frequency: 45,
  streak: 0,
  lastActiveDate: null,
  history: {},

  // 🔄 INIT (load + reset if new day)
  init: async () => {
    const data = await loadData()

    if (data) {
      const today = getTodayDate()
      const isSameDay = data.lastActiveDate === today

      const updatedState = {
        todayCount: isSameDay ? data.todayCount : 0,
        dailyGoal: data.dailyGoal ?? 12,
        frequency: data.frequency ?? 45,
        streak: data.streak ?? 0,
        lastActiveDate: data.lastActiveDate ?? null,
        history: data.history || {},
      }

      set(updatedState)
      saveData(updatedState)
    }
  },

  // 🚀 LOG STAND
  logStand: async () => {
    const state = get()
    const today = getTodayDate()

    const newStreak = calculateStreak(
      state.lastActiveDate,
      state.streak
    )

    const updatedHistory = {
      ...state.history,
      [today]: (state.history[today] || 0) + 1,
    }

    const newState = {
      ...state,
      todayCount: state.todayCount + 1,
      streak: newStreak,
      lastActiveDate: today,
      history: updatedHistory,
    }

    set(newState)
    saveData(newState)

    // Reset the notification timer
    await updateReminder(state.frequency)
  },

  // 🎯 UPDATE DAILY GOAL
  setDailyGoal: (goal: number) => {
    const state = get()

    const newState = {
      ...state,
      dailyGoal: goal,
    }

    set(newState)
    saveData(newState)
  },

  // ⏱ UPDATE FREQUENCY
  setFrequency: (value: number) => {
    const state = get()

    const newState = {
      ...state,
      frequency: value,
    }

    set(newState)
    saveData(newState)
  },
}))