'use client'

import { useState } from 'react'
import { updateHabit, Habit, addShellcoinReward } from '@/lib/firestore'
import { computeCompletedHabitUpdate } from '@/lib/habit-logic'
import { getGrowthStage } from '@/lib/growth'

interface StretchModalProps {
  isOpen: boolean
  onClose: () => void
  habit: Habit | null
  userId: string
  onComplete: () => void
}

const STRETCH_POSES = [
  {
    id: 1,
    name: 'Neck Stretch',
    emoji: '🧠',
    description: 'Gently tilt your head to each side, holding for 15-20 seconds.',
    image: '🫖', // Using emoji as placeholder
    instructions: [
      '1. Sit up straight with shoulders relaxed',
      '2. Slowly tilt your right ear toward your right shoulder',
      '3. Hold for 15-20 seconds',
      '4. Repeat on the left side',
    ],
  },
  {
    id: 2,
    name: 'Cat-Cow',
    emoji: '🐱',
    description: 'A gentle spinal warm-up that opens and closes the spine.',
    image: '🐱',
    instructions: [
      '1. Start on hands and knees (tabletop position)',
      '2. Inhale: Drop your belly, lift your gaze (Cow)',
      '3. Exhale: Round your spine, tuck your chin (Cat)',
      '4. Repeat 5-8 times slowly and mindfully',
    ],
  },
  {
    id: 3,
    name: "Child's Pose",
    emoji: '🧘',
    description: 'A restorative pose that calms the mind and gently stretches your back.',
    image: '🧘',
    instructions: [
      "1. Start on hands and knees",
      '2. Sink your hips back toward your heels',
      '3. Rest your forehead on the ground',
      '4. Extend arms forward and breathe deeply for 30 seconds',
    ],
  },
  {
    id: 4,
    name: 'Downward Dog',
    emoji: '🐶',
    description: 'An energizing pose that stretches your hamstrings and shoulders.',
    image: '🐶',
    instructions: [
      '1. Start on hands and knees',
      '2. Press palms firmly into the ground',
      '3. Lift hips toward the ceiling, forming an inverted V',
      '4. Hold for 20-30 seconds, breathing deeply',
    ],
  },
  {
    id: 5,
    name: 'Seated Forward Fold',
    emoji: '🙏',
    description: 'A calming finish that stretches your hamstrings and back.',
    image: '🙏',
    instructions: [
      '1. Sit on the floor with legs extended in front',
      '2. Inhale to lengthen your spine',
      '3. Exhale and fold forward gently',
      '4. Hold for 30-60 seconds without forcing',
    ],
  },
]

export function StretchModal({ isOpen, onClose, habit, userId, onComplete }: StretchModalProps) {
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0)
  const [showCompletion, setShowCompletion] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const currentPose = STRETCH_POSES[currentPoseIndex]
  const isLastPose = currentPoseIndex === STRETCH_POSES.length - 1
  const isFirstPose = currentPoseIndex === 0

  const handleNext = () => {
    if (currentPoseIndex < STRETCH_POSES.length - 1) {
      setCurrentPoseIndex(currentPoseIndex + 1)
    }
  }

  const handleBack = () => {
    if (currentPoseIndex > 0) {
      setCurrentPoseIndex(currentPoseIndex - 1)
    }
  }

  const handleFinish = async () => {
    if (!habit || !isLastPose) return

    setIsSaving(true)
    try {
      const updates = computeCompletedHabitUpdate(habit, new Date().toISOString(), userId)
      if (!updates) return
      await updateHabit(habit.id, updates)

      // Grant fake Shellcoin reward
      try {
        await addShellcoinReward(userId, habit.id, habit.name, 1)
      } catch (rewardErr) {
        console.warn('Shellcoin reward failed:', rewardErr)
      }

      setShowCompletion(true)
      setTimeout(() => {
        onComplete()
        setShowCompletion(false)
        setCurrentPoseIndex(0)
        onClose()
      }, 2000)
    } catch (err) {
      console.error('Error saving stretch session:', err)
      alert('Failed to save. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      style={{
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
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '15px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        {showCompletion ? (
          // Completion screen
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧘</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#333' }}>
              Flow complete!
            </h2>
            <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '1rem' }}>
              You moved through 5 stretches
            </p>
            <p style={{ color: '#22c55e', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
              🌱 Plant grew to stage {getGrowthStage((habit?.streak_count || 0) + 1) + 1}!
            </p>
          </div>
        ) : (
          // Stretch flow
          <>
            {/* Progress indicator */}
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>
                Pose {currentPoseIndex + 1} of {STRETCH_POSES.length}
              </p>
              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                {STRETCH_POSES.map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: idx <= currentPoseIndex ? '#667eea' : '#e0e0e0',
                      transition: 'background 0.2s',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Pose card */}
            <div
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '15px',
                padding: '2rem',
                marginBottom: '2rem',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{currentPose.emoji}</div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', margin: 0 }}>
                {currentPose.name}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', marginTop: '0.5rem' }}>
                {currentPose.description}
              </p>
            </div>

            {/* Instructions */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333', marginBottom: '1rem' }}>
                Instructions:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {currentPose.instructions.map((instruction, idx) => (
                  <p
                    key={idx}
                    style={{
                      fontSize: '0.95rem',
                      color: '#555',
                      margin: 0,
                      padding: '0.75rem',
                      background: '#f5f5f5',
                      borderRadius: '8px',
                      borderLeft: '4px solid #667eea',
                    }}
                  >
                    {instruction}
                  </p>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleBack}
                disabled={isFirstPose}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: isFirstPose ? '#e0e0e0' : '#f0f0f0',
                  color: isFirstPose ? '#999' : '#333',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: isFirstPose ? 'not-allowed' : 'pointer',
                  fontSize: '0.95rem',
                }}
              >
                ← Back
              </button>

              {isLastPose ? (
                <button
                  onClick={handleFinish}
                  disabled={isSaving}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#22c55e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                  }}
                >
                  {isSaving ? 'Finishing...' : '✅ Finish Flow'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                  }}
                >
                  Next Stretch →
                </button>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                width: '100%',
                marginTop: '1rem',
                padding: '0.75rem',
                background: 'none',
                color: '#999',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
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
