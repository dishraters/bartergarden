'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { updateHabit, Habit, addShellcoinReward } from '@/lib/firestore'
import { computeCompletedHabitUpdate } from '@/lib/habit-logic'
import { getGrowthStage } from '@/lib/growth'

interface MealAnalysisResult {
  dishName: string
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
  healthScore: number
  costScore: number
  tasteScoreSuggestion: number
  confidence: number
  reasoning: string
  source?: 'vision' | 'heuristic'
}

interface MealModalProps {
  isOpen: boolean
  onClose: () => void
  habit: Habit | null
  mealType: 'breakfast' | 'lunch' | 'dinner'
  userId: string
  onComplete: () => void
  onPersisted?: (updatedHabit: Habit, updates: ReturnType<typeof computeCompletedHabitUpdate>) => void
}

const MEAL_CONFIG = {
  breakfast: { emoji: '🍳', name: 'Breakfast', color: '#FF9500', time: 10, cost: 8 },
  lunch: { emoji: '🥪', name: 'Lunch', color: '#34C759', time: 20, cost: 14 },
  dinner: { emoji: '🍽️', name: 'Dinner', color: '#007AFF', time: 30, cost: 20 },
}

export function MealModal({ isOpen, onClose, habit, mealType, userId, onComplete, onPersisted }: MealModalProps) {
  const config = MEAL_CONFIG[mealType]
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [scoreError, setScoreError] = useState('')
  const [analysis, setAnalysis] = useState<MealAnalysisResult | null>(null)
  const [dishratedScore, setDishratedScore] = useState<number | null>(null)
  const [timeMinutes, setTimeMinutes] = useState(config.time)
  const [costDollars, setCostDollars] = useState(config.cost)
  const [showCompletion, setShowCompletion] = useState(false)

  const testImageUrl = '/images/shellcoin-shell.jpg'

  useEffect(() => {
    if (!isOpen) return
    setImageFile(null)
    setPreviewUrl(null)
    setAnalyzing(false)
    setScoreError('')
    setAnalysis(null)
    setDishratedScore(null)
    setTimeMinutes(config.time)
    setCostDollars(config.cost)
    setShowCompletion(false)
  }, [isOpen, config.time, config.cost, mealType, habit?.id])

  const calculatePersonalizedTimeScore = (minutes: number) => {
    const percentage = (minutes / config.time) * 100
    if (percentage <= 100) return 100
    if (percentage <= 120) return 90
    if (percentage <= 140) return 75
    if (percentage <= 160) return 60
    if (percentage <= 200) return 40
    return 20
  }

  const calculatePersonalizedCostScore = (dollars: number) => {
    const percentage = (dollars / config.cost) * 100
    if (percentage <= 100) return 100
    if (percentage <= 120) return 90
    if (percentage <= 140) return 75
    if (percentage <= 160) return 60
    if (percentage <= 200) return 40
    return 20
  }

  const calculateDishratedScore = (health100: number, taste100: number, minutes: number, dollars: number) => {
    const timeScore = calculatePersonalizedTimeScore(minutes)
    const costScore = calculatePersonalizedCostScore(dollars)
    return Math.round((health100 * 0.35) + (taste100 * 0.4) + (timeScore * 0.15) + (costScore * 0.1))
  }

  const fileToBase64 = async (file: File) => {
    const buffer = await file.arrayBuffer()
    let binary = ''
    const bytes = new Uint8Array(buffer)
    for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i])
    return btoa(binary)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setScoreError('')
    const reader = new FileReader()
    reader.onload = (event) => setPreviewUrl(event.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleAnalyze = async (override?: { imageBase64?: string; mimeType?: string; description?: string }) => {
    if (!imageFile && !override?.description) return
    setAnalyzing(true)
    setScoreError('')
    try {
      const imageBase64 = override?.imageBase64 ?? (imageFile ? await fileToBase64(imageFile) : undefined)
      const mimeType = override?.mimeType ?? imageFile?.type
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, mimeType, description: override?.description ?? config.name }),
      })
      const data = await response.json()
      if (!response.ok || !data?.result) throw new Error(data?.error || 'Could not analyze meal')
      const result = data.result as MealAnalysisResult
      setAnalysis(result)
      setDishratedScore(calculateDishratedScore(result.healthScore * 10, result.tasteScoreSuggestion * 10, timeMinutes, costDollars))
    } catch (err) {
      setScoreError(err instanceof Error ? err.message : 'Could not analyze meal')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleSave = async () => {
    if (!habit || dishratedScore === null) return
    try {
      const updates = computeCompletedHabitUpdate(habit, new Date().toISOString(), userId)
      if (!updates) return
      await updateHabit(habit.id, updates)
      onPersisted?.({ ...habit, ...updates, userId: userId || habit.userId }, updates)
      try {
        await addShellcoinReward(userId, habit.id, habit.name, 1)
      } catch (rewardErr) {
        console.warn('Shellcoin reward failed:', rewardErr)
      }
      setShowCompletion(true)
      setTimeout(() => {
        onComplete()
        setShowCompletion(false)
        setImageFile(null)
        setPreviewUrl(null)
        setAnalysis(null)
        setDishratedScore(null)
        setScoreError('')
        onClose()
      }, 1800)
    } catch (err) {
      console.error('Error saving meal:', err)
      alert('Failed to save meal. Please try again.')
    }
  }

  if (!isOpen) return null

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div style={{ background: 'white', borderRadius: '15px', padding: '2rem', maxWidth: '500px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '80vh', overflowY: 'auto' }}>
        {showCompletion ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{config.emoji}</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#333' }}>{config.name} logged!</h2>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Dishrated score: <strong>{dishratedScore}</strong>/100</p>
            <p style={{ color: '#22c55e', fontWeight: 'bold' }}>🌱 Plant grew to stage {getGrowthStage((habit?.streak_count || 0) + 1) + 1}!</p>
          </div>
        ) : analyzing ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{config.emoji}</div>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#333' }}>Analyzing your meal...</h2>
          </div>
        ) : dishratedScore !== null && analysis ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h1 style={{ fontSize: '1.5rem', margin: 0, color: config.color }}>{config.emoji} {config.name} Score</h1>
              <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999' }}>✕</button>
            </div>
            {previewUrl && <img src={previewUrl} alt={config.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1rem' }} />}
            <div style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '10px', marginBottom: '1rem', textAlign: 'center' }}>
              <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Dishrated score</p>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: config.color, marginBottom: '0.5rem' }}>{dishratedScore}/100</div>
              <p style={{ color: '#666', margin: 0 }}>{analysis.source === 'vision' ? 'Scored from the meal photo using Dishrated AI.' : 'Scored using Dishrated fallback rules.'}</p>
            </div>
            <div style={{ background: '#fff7ed', padding: '1rem', borderRadius: '10px', marginBottom: '1rem', fontSize: '0.95rem', color: '#7c2d12' }}>
              <div><strong>{analysis.dishName}</strong></div>
              <div>Health: {analysis.healthScore}/10, Taste: {analysis.tasteScoreSuggestion}/10, Cost: {analysis.costScore}/10</div>
              <div>Confidence: {analysis.confidence}%</div>
              <div style={{ marginTop: '0.35rem' }}>{analysis.reasoning}</div>
            </div>
            <button onClick={handleSave} style={{ width: '100%', padding: '1rem', background: config.color, color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>✅ Save and Complete</button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h1 style={{ fontSize: '1.5rem', margin: 0, color: config.color }}>{config.emoji} Log {config.name}</h1>
              <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999' }}>✕</button>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} style={{ display: 'none' }} />
            {previewUrl ? (
              <div>
                <img src={previewUrl} alt="Meal" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1rem' }} />
                {scoreError && <div style={{ color: '#b91c1c', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{scoreError}</div>}
                <label style={{ display: 'block', marginBottom: '0.75rem', color: '#444' }}>
                  Time to get or make
                  <input type="number" min="1" value={timeMinutes} onChange={(e) => setTimeMinutes(Number(e.target.value) || 0)} style={{ width: '100%', marginTop: '0.35rem', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                </label>
                <label style={{ display: 'block', marginBottom: '1rem', color: '#444' }}>
                  Cost in dollars
                  <input type="number" min="0" step="0.01" value={costDollars} onChange={(e) => setCostDollars(Number(e.target.value) || 0)} style={{ width: '100%', marginTop: '0.35rem', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                </label>
                <button onClick={() => { void handleAnalyze() }} style={{ width: '100%', padding: '1rem', background: config.color, color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', marginBottom: '1rem' }}>📊 Analyze Meal with Dishrated</button>
                <button onClick={() => { setPreviewUrl(null); setImageFile(null); setScoreError('') }} style={{ width: '100%', padding: '1rem', background: 'white', color: config.color, border: `2px solid ${config.color}`, borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>📷 Change photo</button>
              </div>
            ) : (
              <div>
                <button onClick={() => fileInputRef.current?.click()} style={{ width: '100%', padding: '3rem 1rem', background: `${config.color}20`, color: config.color, border: `2px dashed ${config.color}`, borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', marginBottom: '1rem' }}>📷 Upload meal photo</button>
                <button onClick={() => {
                  setPreviewUrl(testImageUrl)
                  setImageFile(null)
                  setScoreError('')
                  void handleAnalyze({ description: `${config.name} test meal` })
                }} style={{ width: '100%', padding: '1rem', background: 'white', color: config.color, border: `2px solid ${config.color}`, borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>🧪 Use built-in test meal</button>
                <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '56.25%', marginTop: '0.75rem', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                  <Image src={testImageUrl} alt="Built-in meal test asset" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 500px" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
