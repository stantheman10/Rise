export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0]
}

export const getYesterdayDate = () => {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

export const calculateStreak = (
  lastDate: string | null,
  currentStreak: number
) => {
  const today = getTodayDate()
  const yesterday = getYesterdayDate()

  if (!lastDate) return 1

  if (lastDate === today) return currentStreak // already counted today

  if (lastDate === yesterday) return currentStreak + 1

  return 1 // streak broken
}