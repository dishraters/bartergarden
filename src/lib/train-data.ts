// Train progression levels and schedules

export type ProgressionLevel = {
  level: number
  name: string
  sets: number
  reps?: number
  seconds?: number
}

export type Exercise = {
  id: string
  name: string
  progressions: ProgressionLevel[]
}

export const EXERCISES: Record<string, Exercise> = {
  pushups: {
    id: 'pushups',
    name: 'Push-ups',
    progressions: [
      { level: 1, name: 'Beginner', sets: 3, reps: 5 },
      { level: 2, name: 'Novice', sets: 3, reps: 10 },
      { level: 3, name: 'Intermediate', sets: 3, reps: 15 },
      { level: 4, name: 'Advanced', sets: 3, reps: 20 },
      { level: 5, name: 'Strong', sets: 4, reps: 15 },
      { level: 6, name: 'Very Strong', sets: 4, reps: 20 },
      { level: 7, name: 'Elite', sets: 5, reps: 20 },
      { level: 8, name: 'Master', sets: 5, reps: 25 },
      { level: 9, name: 'Expert', sets: 5, reps: 30 },
      { level: 10, name: 'Legend', sets: 5, reps: 50 },
    ],
  },
  pullups: {
    id: 'pullups',
    name: 'Pull-ups',
    progressions: [
      { level: 1, name: 'Beginner', sets: 3, reps: 1 },
      { level: 2, name: 'Novice', sets: 3, reps: 3 },
      { level: 3, name: 'Intermediate', sets: 3, reps: 5 },
      { level: 4, name: 'Advanced', sets: 3, reps: 8 },
      { level: 5, name: 'Strong', sets: 3, reps: 10 },
      { level: 6, name: 'Very Strong', sets: 4, reps: 10 },
      { level: 7, name: 'Elite', sets: 4, reps: 15 },
      { level: 8, name: 'Master', sets: 5, reps: 15 },
      { level: 9, name: 'Expert', sets: 5, reps: 20 },
      { level: 10, name: 'Legend', sets: 5, reps: 30 },
    ],
  },
  squats: {
    id: 'squats',
    name: 'Squats',
    progressions: [
      { level: 1, name: 'Beginner', sets: 3, reps: 10 },
      { level: 2, name: 'Novice', sets: 3, reps: 15 },
      { level: 3, name: 'Intermediate', sets: 3, reps: 20 },
      { level: 4, name: 'Advanced', sets: 3, reps: 25 },
      { level: 5, name: 'Strong', sets: 4, reps: 20 },
      { level: 6, name: 'Very Strong', sets: 4, reps: 25 },
      { level: 7, name: 'Elite', sets: 4, reps: 30 },
      { level: 8, name: 'Master', sets: 5, reps: 30 },
      { level: 9, name: 'Expert', sets: 5, reps: 40 },
      { level: 10, name: 'Legend', sets: 5, reps: 50 },
    ],
  },
  legraises: {
    id: 'legraises',
    name: 'Leg Raises',
    progressions: [
      { level: 1, name: 'Beginner', sets: 3, reps: 5 },
      { level: 2, name: 'Novice', sets: 3, reps: 8 },
      { level: 3, name: 'Intermediate', sets: 3, reps: 10 },
      { level: 4, name: 'Advanced', sets: 3, reps: 15 },
      { level: 5, name: 'Strong', sets: 3, reps: 20 },
      { level: 6, name: 'Very Strong', sets: 4, reps: 15 },
      { level: 7, name: 'Elite', sets: 4, reps: 20 },
      { level: 8, name: 'Master', sets: 4, reps: 25 },
      { level: 9, name: 'Expert', sets: 5, reps: 25 },
      { level: 10, name: 'Legend', sets: 5, reps: 30 },
    ],
  },
  bridges: {
    id: 'bridges',
    name: 'Bridges',
    progressions: [
      { level: 1, name: 'Beginner', sets: 3, seconds: 15 },
      { level: 2, name: 'Novice', sets: 3, seconds: 20 },
      { level: 3, name: 'Intermediate', sets: 3, seconds: 30 },
      { level: 4, name: 'Advanced', sets: 3, seconds: 45 },
      { level: 5, name: 'Strong', sets: 3, seconds: 60 },
      { level: 6, name: 'Very Strong', sets: 4, seconds: 45 },
      { level: 7, name: 'Elite', sets: 4, seconds: 60 },
      { level: 8, name: 'Master', sets: 4, seconds: 90 },
      { level: 9, name: 'Expert', sets: 5, seconds: 90 },
      { level: 10, name: 'Legend', sets: 5, seconds: 120 },
    ],
  },
  twists: {
    id: 'twists',
    name: 'Twists',
    progressions: [
      { level: 1, name: 'Beginner', sets: 3, reps: 10 },
      { level: 2, name: 'Novice', sets: 3, reps: 15 },
      { level: 3, name: 'Intermediate', sets: 3, reps: 20 },
      { level: 4, name: 'Advanced', sets: 3, reps: 25 },
      { level: 5, name: 'Strong', sets: 3, reps: 30 },
      { level: 6, name: 'Very Strong', sets: 4, reps: 25 },
      { level: 7, name: 'Elite', sets: 4, reps: 30 },
      { level: 8, name: 'Master', sets: 4, reps: 40 },
      { level: 9, name: 'Expert', sets: 5, reps: 40 },
      { level: 10, name: 'Legend', sets: 5, reps: 50 },
    ],
  },
}

// Weekly schedule
export const DAILY_SCHEDULE: Record<number, string[]> = {
  0: [], // Sunday - rest
  1: ['pushups', 'pullups'], // Monday
  2: ['squats', 'legraises'], // Tuesday
  3: ['bridges', 'twists'], // Wednesday
  4: ['pushups', 'legraises'], // Thursday
  5: ['pullups', 'squats'], // Friday
  6: ['bridges', 'twists'], // Saturday
}

export function getTodayExercises(): string[] {
  const today = new Date().getDay()
  return DAILY_SCHEDULE[today] || []
}

export function getExerciseProgressions(exerciseId: string): ProgressionLevel[] {
  return EXERCISES[exerciseId]?.progressions || []
}

export type UserExerciseProgress = {
  userId: string
  exerciseId: string
  currentLevel: number
  createdAt?: string
  updatedAt?: string
}
