export const getLast7Days = () => {
  const days: string[] = []

  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().split('T')[0])
  }

  return days
}

export const formatHistoryForChart = (
  history: Record<string, number>
) => {
  const days = getLast7Days()

  return days.map((date) => ({
    date,
    value: history[date] || 0,
  }))
}