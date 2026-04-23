'use client'

import { useState } from 'react'
import { updateHabit, Habit, addShellcoinReward } from '@/lib/firestore'

interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  completed: boolean
}

interface TrainModalProps {
  isOpen: boolean
  onClose: () => void
  habit: Habit | null
  userId: string
  onComplete: () => void
}

const DEFAULT_EXERCISES: Exercise[] = [
  { id: '1', name: 'Push-ups', sets: 3, reps: 10, completed: false },
  { id: '2', name: 'Squats', sets: 3, reps: 15, completed: false },
  { id: '3', name: 'Plank', sets: 3, reps: 30, completed: false },
  { id: '4', name: 'Lunges', sets: 2, reps: 10, completed: false },
]

export function TrainModal({ isOpen, onClose, habit, userId, onComplete }: TrainModalProps) {
  const [exercises, setExercises] = useState<Exercise[]>(DEFAULT_EXERCISES)
  const [workoutTitle, setWorkoutTitle] = useState('Quick Workout')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)

  const completedCount = exercises.filter(e => e.completed).length
  const canFinish = completedCount > 0

  const toggleExercise = (id: string) => {
    setExercises(exercises.map(ex =>
      ex.id === id ? { ...ex, completed: !ex.completed } : ex
    ))
  }

  const handleFinish = async () => {
    if (!habit || !canFinish) return

    setIsSubmitting(true)
    try {
      const today = new Date().toISOString()
      const nextStage = Math.min((habit.growth_stage || 1) + 1, 7)

      await updateHabit(habit.id, {
        growth_stage: nextStage,
        streak_count: (habit.streak_count || 0) + 1,
        last_watered_at: today,
      })

      // Grant fake Shellcoin reward
      await addShellcoinReward(userId, habit.id, habit.name, 1)

      setShowCompletion(true)
      
      setTimeout(() => {
        onComplete()
        setShowCompletion(false)
        setExercises(DEFAULT_EXERCISES)
        setWorkoutTitle('Quick Workout')
        onClose()
      }, 2000)
    } catch (err) {
      console.error('Error saving workout:', err)
      alert('Failed to save workout')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '2rem',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}>
        {showCompletion ? (
          // Completion screen
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💪</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#333' }}>
              Workout Complete!
            </h2>
            <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '1rem' }}>
              {completedCount} exercise{completedCount !== 1 ? 's' : ''} completed
            </p>
            <p style={{ color: '#22c55e', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
              🌱 Plant grew to stage {Math.min((habit?.growth_stage || 1) + 1, 7)}!
            </p>
          </div>
        ) : (
          // Workout form
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '1.5rem', margin: 0, color: '#667eea' }}>
                💪 {workoutTitle}
              </h1>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#999',
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              {completedCount} of {exercises.length} exercises completed
            </p>

            {/* Exercise list */}
            <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  onClick={() => toggleExercise(exercise.id)}
                  style={{
                    padding: '1rem',
                    background: exercise.completed ? '#e8f5e9' : '#f5f5f5',
                    border: `2px solid ${exercise.completed ? '#4caf50' : '#ddd'}`,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '4px',
                      border: `2px solid ${exercise.completed ? '#4caf50' : '#ddd'}`,
                      background: exercise.completed ? '#4caf50' : 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      flexShrink: 0,
                    }}
                  >
                    {exercise.completed ? '✓' : ''}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      margin: 0,
                      fontWeight: 'bold',
                      color: '#333',
                      textDecoration: exercise.completed ? 'line-through' : 'none',
                    }}>
                      {exercise.name}
                    </p>
                    <p style={{
                      margin: '0.25rem 0 0 0',
                      fontSize: '0.85rem',
                      color: '#999',
                    }}>
                      {exercise.sets} sets × {exercise.reps} reps
                    </p>
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    color: exercise.completed ? '#4caf50' : '#ddd',
                  }}>
                    {exercise.completed ? '✓' : '○'}
                  </div>
                </div>
              ))}
            </div>

            {/* Finish button */}
            <button
              onClick={handleFinish}
              disabled={!canFinish || isSubmitting}
              style={{
                width: '100%',
                padding: '1rem',
                background: canFinish ? '#667eea' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: canFinish ? 'pointer' : 'not-allowed',
                fontSize: '1rem',
              }}
            >
              {isSubmitting ? 'Saving...' : canFinish ? '✅ Finish Workout' : 'Complete at least 1 exercise'}
            </button>

            <p style={{
              fontSize: '0.85rem',
              color: '#999',
              marginTop: '1rem',
              textAlign: 'center',
            }}>
              Tap exercises to mark them as completed
            </p>
          </>
        )}
      </div>
    </div>
  )
}
