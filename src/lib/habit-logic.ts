import { getGrowthStage } from './growth'
import type { Habit } from './firestore'

const getDateOnly = (value?: string | null) => (value ? value.split('T')[0] : null)
const getLocalDateString = (value: string | Date) => {
  const date = typeof value === 'string' ? new Date(value) : value
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function computeCompletedHabitUpdate(habit: Habit, nowIso: string, userId?: string) {
  const today = getLocalDateString(nowIso)
  const yesterday = getLocalDateString(new Date(new Date(nowIso).getTime() - 86400000))
  const lastCompletedDate = getDateOnly(habit.last_watered_at)

  if (lastCompletedDate === today) {
    return null
  }

  const newStreak = lastCompletedDate === yesterday ? habit.streak_count + 1 : 1
  const newStage = getGrowthStage(newStreak)

  return {
    userId,
    streak_count: newStreak,
    growth_stage: newStage,
    last_watered_at: nowIso,
    status: 'active' as const,
  }
}

export function computeIncrementalBalance(currentBalance: number, rewardGranted: boolean, rewardAmount = 1) {
  return rewardGranted ? currentBalance + rewardAmount : currentBalance
}

export function mergeUpdatedHabit(habits: Habit[], habitId: string, updates: Partial<Habit>) {
  return habits.map((habit) => (habit.id === habitId ? { ...habit, ...updates } : habit))
}
