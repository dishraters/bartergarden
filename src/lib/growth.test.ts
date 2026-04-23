import test from 'node:test'
import assert from 'node:assert/strict'

import {
  calculateDewdrops,
  getGrowthStage,
  getHabitArt,
  getHabitVisual,
  GROWTH_STAGES,
  HABIT_VISUALS,
} from './growth'

test('getGrowthStage maps streak thresholds correctly', () => {
  assert.equal(getGrowthStage(0), 0)
  assert.equal(getGrowthStage(1), 1)
  assert.equal(getGrowthStage(2), 2)
  assert.equal(getGrowthStage(3), 2)
  assert.equal(getGrowthStage(4), 3)
  assert.equal(getGrowthStage(6), 3)
  assert.equal(getGrowthStage(7), 4)
  assert.equal(getGrowthStage(10), 4)
  assert.equal(getGrowthStage(11), 5)
  assert.equal(getGrowthStage(15), 5)
  assert.equal(getGrowthStage(16), 6)
  assert.equal(getGrowthStage(99), 6)
})

test('growth stage metadata is complete and ordered', () => {
  const stageKeys = Object.keys(GROWTH_STAGES).map(Number)
  assert.deepEqual(stageKeys, [0, 1, 2, 3, 4, 5, 6])

  for (let i = 1; i < stageKeys.length; i += 1) {
    assert.ok(GROWTH_STAGES[i].streakMin > GROWTH_STAGES[i - 1].streakMin)
  }
})

test('getHabitVisual returns known visual configs', () => {
  const meditation = getHabitVisual('Meditation')
  assert.equal(meditation.key, HABIT_VISUALS.Meditation.key)
  assert.equal(meditation.plant, 'Lotus')
  assert.equal(meditation.stages.length, 7)
})

test('getHabitVisual returns safe fallback for unknown habits', () => {
  const visual = getHabitVisual('Custom Habit')
  assert.equal(visual.key, 'default')
  assert.equal(visual.name, 'Custom Habit')
  assert.equal(visual.plant, 'Garden Seedling')
  assert.equal(visual.stages.length, 7)
})

test('getHabitArt clamps stage indices safely', () => {
  const meditation = HABIT_VISUALS.Meditation
  assert.equal(getHabitArt('Meditation', -1), meditation.stages[0])
  assert.equal(getHabitArt('Meditation', 0), meditation.stages[0])
  assert.equal(getHabitArt('Meditation', 6), meditation.stages[6])
  assert.equal(getHabitArt('Meditation', 999), meditation.stages[6])
})

test('calculateDewdrops returns milestone rewards', () => {
  assert.equal(calculateDewdrops(1), 1)
  assert.equal(calculateDewdrops(2), 1)
  assert.equal(calculateDewdrops(3), 10)
  assert.equal(calculateDewdrops(7), 20)
  assert.equal(calculateDewdrops(30), 50)
})
