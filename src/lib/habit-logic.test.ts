import test from 'node:test'
import assert from 'node:assert/strict'

import { computeCompletedHabitUpdate, computeIncrementalBalance, mergeUpdatedHabit } from './habit-logic'
import type { Habit } from './firestore'

const baseHabit: Habit = {
  id: 'habit-1',
  userId: 'user-1',
  name: 'Meditation',
  icon: '🧘',
  color: '#22c55e',
  growth_stage: 0,
  streak_count: 0,
  status: 'active',
  last_watered_at: null,
}

test('computeCompletedHabitUpdate starts streak at 1 for first completion', () => {
  const now = '2026-03-25T10:00:00.000Z'
  const update = computeCompletedHabitUpdate(baseHabit, now, 'user-1')

  assert.ok(update)
  assert.equal(update?.streak_count, 1)
  assert.equal(update?.growth_stage, 1)
  assert.equal(update?.last_watered_at, now)
  assert.equal(update?.status, 'active')
  assert.equal(update?.userId, 'user-1')
})

test('computeCompletedHabitUpdate increments streak when last completion was yesterday', () => {
  const now = '2026-03-25T10:00:00.000Z'
  const update = computeCompletedHabitUpdate({
    ...baseHabit,
    streak_count: 6,
    growth_stage: 3,
    last_watered_at: '2026-03-24T08:00:00.000Z',
  }, now, 'user-1')

  assert.ok(update)
  assert.equal(update?.streak_count, 7)
  assert.equal(update?.growth_stage, 4)
})

test('computeCompletedHabitUpdate resets streak when previous completion was older than yesterday', () => {
  const now = '2026-03-25T10:00:00.000Z'
  const update = computeCompletedHabitUpdate({
    ...baseHabit,
    streak_count: 6,
    growth_stage: 3,
    last_watered_at: '2026-03-20T08:00:00.000Z',
  }, now, 'user-1')

  assert.ok(update)
  assert.equal(update?.streak_count, 1)
  assert.equal(update?.growth_stage, 1)
})

test('computeCompletedHabitUpdate returns null if already completed today', () => {
  const now = '2026-03-25T10:00:00.000Z'
  const update = computeCompletedHabitUpdate({
    ...baseHabit,
    streak_count: 6,
    growth_stage: 3,
    last_watered_at: '2026-03-25T01:00:00.000Z',
  }, now, 'user-1')

  assert.equal(update, null)
})

test('mergeUpdatedHabit only changes the targeted habit', () => {
  const habits: Habit[] = [
    baseHabit,
    { ...baseHabit, id: 'habit-2', name: 'Journal' },
  ]

  const merged = mergeUpdatedHabit(habits, 'habit-2', { streak_count: 3, growth_stage: 2 })

  assert.equal(merged[0].streak_count, 0)
  assert.equal(merged[1].streak_count, 3)
  assert.equal(merged[1].growth_stage, 2)
})

test('computeIncrementalBalance only increments when reward is granted', () => {
  assert.equal(computeIncrementalBalance(10, true, 1), 11)
  assert.equal(computeIncrementalBalance(10, false, 1), 10)
  assert.equal(computeIncrementalBalance(10, true, 5), 15)
})
