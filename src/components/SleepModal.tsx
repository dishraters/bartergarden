'use client'

import { useState, useRef, useEffect } from 'react'
import { updateHabit, Habit, addShellcoinReward } from '@/lib/firestore'
import { computeCompletedHabitUpdate } from '@/lib/habit-logic'
import { getGrowthStage } from '@/lib/growth'

interface SleepModalProps {
  isOpen: boolean
  onClose: () => void
  habit: Habit | null
  userId: string
  onComplete: () => void
}

const MINIMUM_LISTEN_TIME = 5 * 60 // 5 minutes in seconds

export function SleepModal({ isOpen, onClose, habit, userId, onComplete }: SleepModalProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeListened, setTimeListened] = useState(0)
  const [showCompletion, setShowCompletion] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const canComplete = timeListened >= MINIMUM_LISTEN_TIME
  const percentComplete = Math.min((timeListened / MINIMUM_LISTEN_TIME) * 100, 100)
  const minutesRemaining = Math.ceil((MINIMUM_LISTEN_TIME - timeListened) / 60)

  // Track time when audio is playing
  useEffect(() => {
    if (!isOpen) return

    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setTimeListened(audio.currentTime)
      
      // Auto-complete when 5 minutes reached
      if (audio.currentTime >= MINIMUM_LISTEN_TIME && !showCompletion) {
        audio.pause()
        setIsPlaying(false)
        handleComplete()
      }
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [isOpen, showCompletion])

  const handlePlay = () => {
    audioRef.current?.play()
  }

  const handlePause = () => {
    audioRef.current?.pause()
  }

  const handleComplete = async () => {
    if (!habit || !canComplete) return

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
        setIsPlaying(false)
        setTimeListened(0)
        if (audioRef.current) {
          audioRef.current.currentTime = 0
        }
        onClose()
      }, 2000)
    } catch (err) {
      console.error('Error saving sleep session:', err)
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
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '15px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          color: 'white',
        }}
      >
        {/* Hidden audio element - calming rain/sleep audio */}
        <audio
          ref={audioRef}
          src="https://www.soundjay.com/nature/sounds/rain-02.mp3"
          onEnded={() => {
            setIsPlaying(false)
            if (canComplete) {
              handleComplete()
            }
          }}
        />

        {showCompletion ? (
          // Completion screen
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😴</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>
              Sleep session complete!
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem', fontSize: '1rem' }}>
              {Math.floor(timeListened / 60)} minutes listened
            </p>
            <p style={{ color: '#4CAF50', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
              🌱 Plant grew to stage {getGrowthStage((habit?.streak_count || 0) + 1) + 1}!
            </p>
          </div>
        ) : (
          // Sleep interface
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '1.8rem', margin: 0 }}>😴 Sleeptime Stories</h1>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'white',
                  borderRadius: '8px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.5' }}>
              Wind down with calming music before sleep. Listen for at least 5 minutes to complete your habit.
            </p>

            {/* Timer display */}
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '2rem',
                marginBottom: '2rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {Math.floor(timeListened / 60)}:{String(Math.floor(timeListened % 60)).padStart(2, '0')}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                {canComplete
                  ? '✅ Ready to complete!'
                  : `${minutesRemaining} minute${minutesRemaining !== 1 ? 's' : ''} to go`}
              </p>
            </div>

            {/* Progress bar */}
            <div
              style={{
                background: 'rgba(255,255,255,0.2)',
                height: '8px',
                borderRadius: '4px',
                marginBottom: '2rem',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: '#4CAF50',
                  width: `${percentComplete}%`,
                  transition: 'width 0.1s linear',
                }}
              />
            </div>

            {/* Play/Pause buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <button
                onClick={handlePlay}
                disabled={isPlaying}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: isPlaying ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.4)',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: isPlaying ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                }}
              >
                ▶️ Play
              </button>
              <button
                onClick={handlePause}
                disabled={!isPlaying}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: !isPlaying ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.4)',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: !isPlaying ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                }}
              >
                ⏸️ Pause
              </button>
            </div>

            {/* Complete button */}
            <button
              onClick={handleComplete}
              disabled={!canComplete || isSaving}
              style={{
                width: '100%',
                padding: '1rem',
                background: canComplete ? '#4CAF50' : 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: canComplete ? 'pointer' : 'not-allowed',
                fontSize: '1rem',
              }}
            >
              {isSaving ? 'Saving...' : canComplete ? '✅ Complete Sleep Session' : 'Keep listening...'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
