export type GrowthStage = {
  label: string
  streakMin: number
  scale: string
  aura: string
}

export type HabitVisual = {
  key: string
  name: string
  plant: string
  stages: [string, string, string, string, string, string, string]
  accent: string
  surface: string
  glow: string
  description: string
}

export const GROWTH_STAGES: Record<number, GrowthStage> = {
  0: { label: 'Seed', streakMin: 0, scale: 'scale-[0.82]', aura: 'opacity-30' },
  1: { label: 'Rooted', streakMin: 1, scale: 'scale-[0.9]', aura: 'opacity-40' },
  2: { label: 'Sprout', streakMin: 2, scale: 'scale-[0.96]', aura: 'opacity-55' },
  3: { label: 'Leafing', streakMin: 4, scale: 'scale-100', aura: 'opacity-65' },
  4: { label: 'Budding', streakMin: 7, scale: 'scale-105', aura: 'opacity-80' },
  5: { label: 'Blooming', streakMin: 11, scale: 'scale-110', aura: 'opacity-95' },
  6: { label: 'Flourishing', streakMin: 16, scale: 'scale-[1.14]', aura: 'opacity-100' },
}

// Using real plant progression images for all habits
const PLANT_STAGES: [string, string, string, string, string, string, string] = [
  '/images/plants/stage1.png',
  '/images/plants/stage2.png',
  '/images/plants/stage3.png',
  '/images/plants/stage4.png',
  '/images/plants/stage5.png',
  '/images/plants/stage6.png',
  '/images/plants/stage7.png',
]

export const HABIT_VISUALS: Record<string, HabitVisual> = {
  Meditation: {
    key: 'meditation',
    name: 'Meditation',
    plant: 'Lotus',
    stages: PLANT_STAGES,
    accent: '#b57edc',
    surface: 'from-violet-100 via-fuchsia-50 to-white',
    glow: 'from-violet-300/35 to-fuchsia-200/10',
    description: 'A calm lotus that opens wider with each streak.',
  },
  Journal: {
    key: 'journal',
    name: 'Journal',
    plant: 'Moonbloom',
    stages: PLANT_STAGES,
    accent: '#f472b6',
    surface: 'from-rose-100 via-pink-50 to-white',
    glow: 'from-rose-300/35 to-pink-200/10',
    description: 'A reflective bloom that gets brighter as thoughts pile up.',
  },
  Train: {
    key: 'train',
    name: 'Train',
    plant: 'Iron Fern',
    stages: PLANT_STAGES,
    accent: '#22c55e',
    surface: 'from-emerald-100 via-lime-50 to-white',
    glow: 'from-emerald-300/35 to-lime-200/10',
    description: 'A strong fern that thickens into a powerhouse plant.',
  },
  Breakfast: {
    key: 'breakfast',
    name: 'Breakfast',
    plant: 'Sunpetal',
    stages: PLANT_STAGES,
    accent: '#f59e0b',
    surface: 'from-amber-100 via-yellow-50 to-white',
    glow: 'from-amber-300/35 to-yellow-200/10',
    description: 'A bright morning flower that loves consistency.',
  },
  Lunch: {
    key: 'lunch',
    name: 'Lunch',
    plant: 'Meadowleaf',
    stages: PLANT_STAGES,
    accent: '#84cc16',
    surface: 'from-lime-100 via-green-50 to-white',
    glow: 'from-lime-300/35 to-green-200/10',
    description: 'A balanced midday flower that fills out the garden.',
  },
  Dinner: {
    key: 'dinner',
    name: 'Dinner',
    plant: 'Twilight Bloom',
    stages: PLANT_STAGES,
    accent: '#fb7185',
    surface: 'from-orange-100 via-rose-50 to-white',
    glow: 'from-orange-300/35 to-rose-200/10',
    description: 'A warm flower that closes the day with color.',
  },
  'Stop Eating': {
    key: 'stop-eating',
    name: 'Stop Eating',
    plant: 'Moon Vine',
    stages: PLANT_STAGES,
    accent: '#6366f1',
    surface: 'from-indigo-100 via-slate-50 to-white',
    glow: 'from-indigo-300/35 to-slate-200/10',
    description: 'A night vine that rewards restraint and rhythm.',
  },
  Plan: {
    key: 'plan',
    name: 'Plan',
    plant: 'Compass Fern',
    stages: PLANT_STAGES,
    accent: '#0ea5e9',
    surface: 'from-sky-100 via-cyan-50 to-white',
    glow: 'from-sky-300/35 to-cyan-200/10',
    description: 'A structured fern that sharpens the path ahead.',
  },
  'Mindful Movements': {
    key: 'mindful-movements',
    name: 'Mindful Movements',
    plant: 'Breeze Orchid',
    stages: PLANT_STAGES,
    accent: '#14b8a6',
    surface: 'from-teal-100 via-emerald-50 to-white',
    glow: 'from-teal-300/35 to-emerald-200/10',
    description: 'A breezy orchid that dances when you show up.',
  },
  Birding: {
    key: 'birding',
    name: 'Birding',
    plant: 'Sky Nest Fern',
    stages: PLANT_STAGES,
    accent: '#38bdf8',
    surface: 'from-sky-100 via-cyan-50 to-white',
    glow: 'from-sky-300/35 to-cyan-200/10',
    description: 'A bright sky fern for your best bird sightings.',
  },
}

export function getGrowthStage(streakCount: number): number {
  if (streakCount >= 16) return 6
  if (streakCount >= 11) return 5
  if (streakCount >= 7) return 4
  if (streakCount >= 4) return 3
  if (streakCount >= 2) return 2
  if (streakCount >= 1) return 1
  return 0
}

export function getHabitVisual(name: string): HabitVisual {
  return HABIT_VISUALS[name] ?? {
    key: 'default',
    name,
    plant: 'Garden Seedling',
    stages: PLANT_STAGES,
    accent: '#22c55e',
    surface: 'from-green-100 via-emerald-50 to-white',
    glow: 'from-green-300/35 to-emerald-200/10',
    description: 'A little plant that grows with your consistency.',
  }
}

export function getHabitArt(name: string, stage: number) {
  const visual = getHabitVisual(name)
  const safeStage = Math.max(0, Math.min(stage, visual.stages.length - 1)) as 0 | 1 | 2 | 3 | 4 | 5 | 6
  return visual.stages[safeStage]
}

export function calculateDewdrops(streakCount: number): number {
  if (streakCount === 30) return 50
  if (streakCount === 7) return 20
  if (streakCount === 3) return 10
  return 1
}
