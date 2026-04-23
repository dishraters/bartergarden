'use client'

import { useState, useEffect } from 'react'
import { updateHabit, Habit, addShellcoinReward } from '@/lib/firestore'
import { getTodayExercises, EXERCISES } from '@/lib/train-data'
import { computeCompletedHabitUpdate } from '@/lib/habit-logic'
import { getGrowthStage } from '@/lib/growth'

interface TrainModalV2Props {
  isOpen: boolean
  onClose: () => void
  habit: Habit | null
  userId: string
  onComplete: () => void
}

interface ExerciseProgress {
  exerciseId: string
  currentLevel: number
  completedSets: number
}

export function TrainModalV2({ isOpen, onClose, habit, userId, onComplete }: TrainModalV2Props) {
  const [exercises, setExercises] = useState<ExerciseProgress[]>([])
  const [showCompletion, setShowCompletion] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const todayExerciseIds = getTodayExercises()
    if (todayExerciseIds.length === 0) {
      setExercises([])
      return
    }

    setExercises(
      todayExerciseIds.map(id => ({
        exerciseId: id,
        currentLevel: 1,
        completedSets: 0,
      }))
    )
  }, [isOpen])

  const handleSetComplete = (exerciseId: string) => {
    setExercises(current => current.map(ex => {
      if (ex.exerciseId === exerciseId) {
        const exercise = EXERCISES[ex.exerciseId]
        const progression = exercise.progressions[ex.currentLevel - 1]
        if (ex.completedSets < progression.sets) {
          return { ...ex, completedSets: ex.completedSets + 1 }
        }
      }
      return ex
    }))
  }

  const allCompleted = exercises.length > 0 && exercises.every(ex => {
    const exercise = EXERCISES[ex.exerciseId]
    const progression = exercise.progressions[ex.currentLevel - 1]
    return ex.completedSets >= progression.sets
  })

  const handleFinish = async () => {
    if (!habit || !allCompleted) return

    setIsSaving(true)
    try {
      const updates = computeCompletedHabitUpdate(habit, new Date().toISOString(), userId)
      if (!updates) return

      await updateHabit(habit.id, updates)
      try {
        await addShellcoinReward(userId, habit.id, habit.name, 1)
      } catch (rewardErr) {
        console.warn('Shellcoin reward failed:', rewardErr)
      }

      setShowCompletion(true)
      setTimeout(() => {
        onComplete()
        setShowCompletion(false)
        setExercises([])
        onClose()
      }, 1800)
    } catch (err) {
      console.error('Error saving workout:', err)
      alert('Failed to save workout')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  if (exercises.length === 0 && !showCompletion) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '1.75rem', maxWidth: '480px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.22)' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#0f172a', margin: 0, marginBottom: '0.75rem' }}>Rest Day 🌴</h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.5 }}>No workout is scheduled for today. Enjoy the recovery and come back tomorrow.</p>
          <button onClick={onClose} style={{ width: '100%', padding: '1rem', background: '#0f766e', color: 'white', border: 'none', borderRadius: '14px', fontWeight: 700, cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div style={{ background: 'white', borderRadius: '28px', padding: '1.25rem', maxWidth: '520px', width: '100%', boxShadow: '0 24px 80px rgba(15,23,42,0.22)', maxHeight: '88vh', overflowY: 'auto' }}>
        {showCompletion ? (
          <div style={{ textAlign: 'center', padding: '2rem 0.5rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '0.75rem' }}>💪</div>
            <h2 style={{ fontSize: '1.65rem', marginBottom: '0.5rem', color: '#0f172a' }}>Workout Complete</h2>
            <p style={{ color: '#64748b', marginBottom: '1rem' }}>{exercises.length} exercises finished</p>
            <p style={{ color: '#0f766e', marginBottom: '1rem', fontSize: '1.05rem', fontWeight: 700 }}>Habit completed, +1 Shellcoin 🐚</p>
            <p style={{ color: '#16a34a', fontSize: '1.05rem', fontWeight: 700 }}>🌱 Plant grew to stage {getGrowthStage((habit?.streak_count || 0) + 1) + 1}</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94a3b8', margin: 0, marginBottom: '0.35rem' }}>Training</p>
              <h1 style={{ fontSize: '1.8rem', margin: 0, color: '#334155' }}>💪 Today&apos;s Workout</h1>
              <p style={{ margin: '0.45rem 0 0 0', color: '#64748b', fontSize: '0.95rem' }}>Finish each set to complete today&apos;s training habit.</p>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {exercises.map((ex) => {
                const exercise = EXERCISES[ex.exerciseId]
                const progression = exercise.progressions[ex.currentLevel - 1]
                const setsLeft = progression.sets - ex.completedSets

                return (
                  <div key={ex.exerciseId} style={{ padding: '1.1rem', background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div>
                        <p style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>{exercise.name}</p>
                        <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0.3rem 0 0 0' }}>Level {ex.currentLevel}: {progression.name}</p>
                      </div>
                      <div style={{ padding: '0.35rem 0.7rem', background: setsLeft === 0 ? '#dcfce7' : '#e2e8f0', color: setsLeft === 0 ? '#166534' : '#475569', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {setsLeft === 0 ? 'Done' : `${setsLeft} left`}
                      </div>
                    </div>

                    <p style={{ fontSize: '1rem', color: '#475569', margin: 0, marginBottom: '1rem' }}>
                      {progression.reps ? `${progression.reps} reps` : `${progression.seconds} seconds`} × {progression.sets} sets
                    </p>

                    <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
                      {Array.from({ length: progression.sets }).map((_, i) => {
                        const isDone = i < ex.completedSets
                        const isNext = i === ex.completedSets
                        return (
                          <button
                            key={i}
                            onClick={() => handleSetComplete(ex.exerciseId)}
                            disabled={!isNext}
                            style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '999px',
                              border: isNext ? '2px solid #14b8a6' : '1px solid #d6d3d1',
                              background: isDone ? '#14b8a6' : isNext ? '#ffffff' : '#f1f5f9',
                              color: isDone ? 'white' : isNext ? '#0f766e' : '#94a3b8',
                              fontWeight: 800,
                              cursor: isNext ? 'pointer' : 'default',
                              fontSize: '0.95rem',
                              boxShadow: isNext ? '0 6px 18px rgba(20,184,166,0.18)' : 'none',
                            }}
                          >
                            {isDone ? '✓' : i + 1}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={handleFinish}
              disabled={!allCompleted || isSaving}
              style={{
                width: '100%',
                marginTop: '1.25rem',
                padding: '1rem',
                background: allCompleted ? 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)' : '#d6d3d1',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                fontWeight: 800,
                cursor: allCompleted ? 'pointer' : 'not-allowed',
                fontSize: '1rem',
                boxShadow: allCompleted ? '0 12px 24px rgba(20,184,166,0.24)' : 'none',
              }}
            >
              {isSaving ? 'Saving workout...' : allCompleted ? 'Finish workout +1 Shellcoin' : 'Complete all sets to finish'}
            </button>

            <button
              onClick={onClose}
              style={{
                width: '100%',
                marginTop: '0.85rem',
                padding: '0.95rem',
                background: 'white',
                color: '#64748b',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: 600,
              }}
            >
              Close without finishing
            </button>
          </>
        )}
      </div>
    </div>
  )
}
