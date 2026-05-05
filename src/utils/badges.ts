export type Badge = {
  id: string
  title: string
  description: string
  unlocked: boolean
}

export const getBadges = (
  streak: number,
  history: Record<string, number>
): Badge[] => {
  const totalStands = Object.values(history).reduce(
    (sum, val) => sum + val,
    0
  )

  return [
    {
      id: 'streak_3',
      title: '3 Day Streak',
      description: 'Stay consistent for 3 days',
      unlocked: streak >= 3,
    },
    {
      id: 'streak_7',
      title: '7 Day Streak',
      description: 'A full week of discipline',
      unlocked: streak >= 7,
    },
    {
      id: 'stands_50',
      title: '50 Stands',
      description: 'You stood up 50 times',
      unlocked: totalStands >= 50,
    },
    {
      id: 'stands_100',
      title: '100 Stands',
      description: 'Century milestone',
      unlocked: totalStands >= 100,
    },
  ]
}