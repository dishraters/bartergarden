'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { updateHabit, Habit, addShellcoinReward } from '@/lib/firestore'
import { computeCompletedHabitUpdate } from '@/lib/habit-logic'
import { getGrowthStage } from '@/lib/growth'

const MEDITATION_DURATION = 1 * 60 // 1 minute in seconds

// Generate calming ambient sound using Web Audio API (no external dependencies)
function createAmbientSound() {
  let audioContext: AudioContext | null = null
  let noiseNode: AudioBufferSourceNode | null = null
  let filterNode: BiquadFilterNode | null = null
  let gainNode: GainNode | null = null
  let isPlaying = false

  const createBrownNoise = (ctx: AudioContext): AudioBuffer => {
    const bufferSize = ctx.sampleRate * 2
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = buffer.getChannelData(0)
    let lastOut = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      output[i] = (lastOut + (0.02 * white)) / 1.02
      lastOut = output[i]
      output[i] *= 3.5
    }
    return buffer
  }

  return {
    start: () => {
      if (isPlaying) return
      try {
        audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
        const noiseBuffer = createBrownNoise(audioContext)
        noiseNode = audioContext.createBufferSource()
        noiseNode.buffer = noiseBuffer
        noiseNode.loop = true
        
        // Low-pass filter for softer sound
        filterNode = audioContext.createBiquadFilter()
        filterNode.type = 'lowpass'
        filterNode.frequency.value = 400
        
        // Volume control
        gainNode = audioContext.createGain()
        gainNode.gain.value = 0.15
        
        noiseNode.connect(filterNode)
        filterNode.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        noiseNode.start()
        isPlaying = true
      } catch (e) {
        console.log('Audio not available:', e)
      }
    },
    stop: () => {
      if (!isPlaying) return
      try {
        if (noiseNode) {
          noiseNode.stop()
          noiseNode.disconnect()
        }
        if (filterNode) filterNode.disconnect()
        if (gainNode) gainNode.disconnect()
        if (audioContext) audioContext.close()
      } catch (e) {
        // Ignore cleanup errors
      }
      audioContext = null
      noiseNode = null
      filterNode = null
      gainNode = null
      isPlaying = false
    },
    isActive: () => isPlaying
  }
}

interface MeditationModalProps {
  isOpen: boolean
  onClose: () => void
  habit: Habit | null
  userId: string
  onComplete: () => void
}

export function MeditationModal({ isOpen, onClose, habit, userId, onComplete }: MeditationModalProps) {
  const [timeRemaining, setTimeRemaining] = useState(MEDITATION_DURATION)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  
  // Use ref to persist audio generator across renders
  const audioRef = useRef<ReturnType<typeof createAmbientSound> | null>(null)
  const hasStartedRef = useRef(false)

  // Initialize audio generator on first open
  useEffect(() => {
    if (isOpen && !audioRef.current) {
      audioRef.current = createAmbientSound()
    }
    return () => {
      // Cleanup on unmount
      if (audioRef.current) {
        audioRef.current.stop()
      }
    }
  }, [isOpen])

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeRemaining(MEDITATION_DURATION)
      setIsRunning(false)
      setIsComplete(false)
      hasStartedRef.current = false
      // Stop any lingering audio
      if (audioRef.current) {
        audioRef.current.stop()
      }
    }
  }, [isOpen])

  // Timer countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(t => {
          const newTime = t - 1
          if (newTime <= 0) {
            setIsRunning(false)
            setIsComplete(true)
            // Stop audio on completion
            if (audioRef.current) {
              audioRef.current.stop()
            }
            return 0
          }
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeRemaining])

  // Handle play/pause audio - runs whenever isRunning changes
  useEffect(() => {
    if (!audioRef.current) return
    
    if (isRunning && !hasStartedRef.current) {
      audioRef.current.start()
      hasStartedRef.current = true
    } else if (!isRunning && audioRef.current.isActive()) {
      audioRef.current.stop()
      hasStartedRef.current = false
    }
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = useCallback(() => {
    setTimeRemaining(MEDITATION_DURATION)
    setIsRunning(false)
    setIsComplete(false)
    hasStartedRef.current = false
    if (audioRef.current) {
      audioRef.current.stop()
    }
  }, [])

  const handleClose = useCallback(() => {
    handleReset()
    onClose()
  }, [handleReset, onClose])

  const handleSave = async () => {
    if (!habit) return

    try {
      const updates = computeCompletedHabitUpdate(habit, new Date().toISOString(), userId)
      if (!updates) return

      await updateHabit(habit.id, updates)
      try {
        await addShellcoinReward(userId, habit.id, habit.name, 1)
      } catch (rewardErr) {
        console.warn('Shellcoin reward failed for meditation:', rewardErr)
      }

      onComplete()
      handleClose()
    } catch (err) {
      console.error('Error saving meditation:', err)
      alert('Failed to save meditation')
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
      background: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '2.5rem',
        maxWidth: '420px',
        width: '90%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        color: 'white',
      }}>
        {isComplete ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧘✨</div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'white' }}>
              Beautiful Session
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              You&apos;ve completed a 1-minute meditation!
            </p>
            <p style={{ color: '#4ade80', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
              🌱 Plant grew to stage {getGrowthStage((habit?.streak_count || 0) + 1) + 1}!
            </p>
            <button
              onClick={handleSave}
              style={{
                width: '100%',
                padding: '1rem',
                background: '#4ade80',
                color: '#064e3b',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1.1rem',
              }}
            >
              ✅ Save & Complete
            </button>
          </div>
        ) : (
          <>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '2rem', textAlign: 'center', color: 'white' }}>
              🧘 1 Minute Meditation
            </h1>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                fontSize: '4.5rem',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                color: 'white',
                marginBottom: '0.5rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              }}>
                {formatTime(timeRemaining)}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>
                {timeRemaining === MEDITATION_DURATION 
                  ? 'Press start to begin your session' 
                  : timeRemaining > 0 
                    ? 'remaining' 
                    : 'Complete!'}
              </p>
            </div>

            <div style={{ 
              textAlign: 'center', 
              marginBottom: '1.5rem',
              padding: '0.75rem',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '10px',
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.8)'
            }}>
              {isRunning ? '🔊 Playing calming ambient sounds...' : '⏸ Audio paused'}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {!isRunning && timeRemaining === MEDITATION_DURATION ? (
                <button
                  onClick={handleStart}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    background: '#4ade80',
                    color: '#064e3b',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                  }}
                >
                  ▶ Start
                </button>
              ) : isRunning ? (
                <button
                  onClick={handlePause}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    background: '#fbbf24',
                    color: '#78350f',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                  }}
                >
                  ⏸ Pause
                </button>
              ) : (
                <button
                  onClick={handleStart}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    background: '#4ade80',
                    color: '#064e3b',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                  }}
                >
                  ▶ Resume
                </button>
              )}
              <button
                onClick={handleReset}
                style={{
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  minWidth: '80px',
                }}
              >
                🔄
              </button>
              <button
                onClick={handleClose}
                style={{
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  minWidth: '60px',
                }}
              >
                ✕
              </button>
            </div>

            {timeRemaining === 0 && !isComplete && (
              <button
                onClick={handleSave}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: '#4ade80',
                  color: '#064e3b',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                }}
              >
                ✅ Save Meditation
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}