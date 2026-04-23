'use client'

import { useState, useEffect } from 'react'
import { updateHabit, Habit, getHabitJournalEntries, saveJournalEntry, JournalEntry } from '@/lib/firestore'

interface JournalModalProps {
  isOpen: boolean
  onClose: () => void
  habit: Habit | null
  userId: string
  onComplete: () => void
}

export function JournalModal({ isOpen, onClose, habit, userId, onComplete }: JournalModalProps) {
  const [grateful1, setGrateful1] = useState('')
  const [grateful2, setGrateful2] = useState('')
  const [grateful3, setGrateful3] = useState('')
  const [affirmation, setAffirmation] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [historyEntries, setHistoryEntries] = useState<JournalEntry[]>([])
  const [loadingHistory, setLoadingHistory] = useState(false)

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const loadHistory = async () => {
    if (!habit) return
    setLoadingHistory(true)
    try {
      const entries = await getHabitJournalEntries(habit.id, 10)
      setHistoryEntries(entries)
      setShowHistory(true)
    } catch (err) {
      console.error('Error loading history:', err)
    }
    setLoadingHistory(false)
  }

  const handleSave = async () => {
    if (!grateful1.trim() || !grateful2.trim() || !grateful3.trim()) {
      alert('Please enter 3 things you\'re grateful for')
      return
    }

    if (!habit) return

    try {
      const todayDate = new Date().toISOString().split('T')[0]
      
      const journalEntry: JournalEntry = {
        id: `${habit.id}_${todayDate}`,
        habit_id: habit.id,
        date: todayDate,
        grateful_1: grateful1.trim(),
        grateful_2: grateful2.trim(),
        grateful_3: grateful3.trim(),
        affirmation: affirmation.trim(),
      }

      // Save to Firestore
      await saveJournalEntry(habit.id, journalEntry)

      const nextStage = Math.min((habit.growth_stage || 1) + 1, 7)
      
      await updateHabit(habit.id, {
        growth_stage: nextStage,
        streak_count: (habit.streak_count || 0) + 1,
      })

      setSubmitted(true)
      onComplete()
      
      // Reset
      setTimeout(() => {
        setGrateful1('')
        setGrateful2('')
        setGrateful3('')
        setAffirmation('')
        setSubmitted(false)
        onClose()
      }, 2000)
    } catch (err) {
      console.error('Error saving journal:', err)
      alert('Failed to save journal entry')
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
      overflowY: 'auto',
      padding: '1rem',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '2rem',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {submitted ? (
          // Completion screen
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#333' }}>
              Gratitude Logged!
            </h2>
            <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '1rem' }}>
              Your reflection has been saved.
            </p>
            <p style={{ color: '#22c55e', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
              🌱 Plant grew to stage {Math.min((habit?.growth_stage || 1) + 1, 7)}!
            </p>
          </div>
        ) : showHistory ? (
          // History view
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <button
                onClick={() => setShowHistory(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                ← Back
              </button>
              <h2 style={{ fontSize: '1.3rem', margin: 0, color: '#333', flex: 1 }}>
                📖 Gratitude History ({historyEntries.length})
              </h2>
            </div>

            <div style={{ maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {historyEntries.length === 0 ? (
                <p style={{ color: '#999', textAlign: 'center', padding: '2rem 0' }}>
                  No gratitude entries yet. Start by filling out today's entry!
                </p>
              ) : (
                historyEntries.map((entry, idx) => (
                  <div key={idx} style={{
                    background: '#f9f9f9',
                    padding: '1rem',
                    borderRadius: '10px',
                    border: '1px solid #eee',
                  }}>
                    <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.5rem' }}>
                      {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '0.3rem' }}>
                      <strong>1.</strong> {entry.grateful_1}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '0.3rem' }}>
                      <strong>2.</strong> {entry.grateful_2}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '0.5rem' }}>
                      <strong>3.</strong> {entry.grateful_3}
                    </p>
                    {entry.affirmation && (
                      <p style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic', marginTop: '0.5rem' }}>
                        💭 {entry.affirmation}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setShowHistory(false)}
              style={{
                width: '100%',
                marginTop: '1rem',
                padding: '1rem',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Close
            </button>
          </div>
        ) : (
          // Journal form
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <h1 style={{ fontSize: '1.5rem', margin: 0, color: '#667eea', flex: 1 }}>
                🙏 Gratitude
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
            <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {today}
            </p>

            <p style={{ fontWeight: 'bold', color: '#333', marginBottom: '1rem', fontSize: '1rem' }}>
              I am grateful for...
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>
                1.
              </label>
              <textarea
                value={grateful1}
                onChange={(e) => setGrateful1(e.target.value)}
                placeholder="Something small is fine..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  minHeight: '60px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>
                2.
              </label>
              <textarea
                value={grateful2}
                onChange={(e) => setGrateful2(e.target.value)}
                placeholder="Something small is fine..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  minHeight: '60px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>
                3.
              </label>
              <textarea
                value={grateful3}
                onChange={(e) => setGrateful3(e.target.value)}
                placeholder="Something small is fine..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  minHeight: '60px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>
                My affirmation today...
              </label>
              <textarea
                value={affirmation}
                onChange={(e) => setAffirmation(e.target.value)}
                placeholder="I am..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  minHeight: '60px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              onClick={handleSave}
              style={{
                width: '100%',
                padding: '1rem',
                background: grateful1.trim() && grateful2.trim() && grateful3.trim() ? '#667eea' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: grateful1.trim() && grateful2.trim() && grateful3.trim() ? 'pointer' : 'not-allowed',
                fontSize: '1rem',
                marginBottom: '1rem',
              }}
            >
              Save
            </button>

            <button
              onClick={loadHistory}
              disabled={loadingHistory}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'white',
                color: '#667eea',
                border: '2px solid #667eea',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              📖 View History ({historyEntries.length})
            </button>
          </>
        )}
      </div>
    </div>
  )
}
