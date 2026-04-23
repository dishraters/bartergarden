import { estimateMealFromDescription, type MealScoreResult } from '@/lib/mealScoring'

type VisionPayload = {
  imageBase64?: string
  mimeType?: string
  description?: string
}

type VisionResult = MealScoreResult & {
  source: 'vision' | 'heuristic'
}

function extractJson(text: string) {
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) return null
  try {
    return JSON.parse(match[0])
  } catch {
    return null
  }
}

function normalizeScore(value: unknown, fallback: number) {
  const num = typeof value === 'number' ? value : Number(value)
  if (Number.isNaN(num)) return fallback
  return Math.min(10, Math.max(1, Math.round(num)))
}

async function scoreMealWithExternalScorer(payload: VisionPayload): Promise<VisionResult | null> {
  const scorerUrl = process.env.DISHRATED_SCORER_URL
  const scorerKey = process.env.DISHRATED_SCORER_KEY
  if (!scorerUrl || !payload.imageBase64) return null

  try {
    const response = await fetch(scorerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(scorerKey ? { Authorization: `Bearer ${scorerKey}` } : {}),
      },
      body: JSON.stringify({ imageBase64: payload.imageBase64, description: payload.description || '' }),
    })
    if (!response.ok) throw new Error(`External scorer failed with ${response.status}`)
    const data = await response.json()
    if (!data?.result) throw new Error('External scorer returned no result')
    return data.result as VisionResult
  } catch {
    return null
  }
}

async function scoreMealWithOpenAI(payload: VisionPayload, fallback: MealScoreResult): Promise<VisionResult | null> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey || !payload.imageBase64 || !payload.mimeType) return null

  try {
    const prompt = [
      'Analyze this food image for a meal-rating app.',
      'Return ONLY valid JSON with keys dishName, mealType, healthScore, costScore, tasteScoreSuggestion, confidence, reasoning.',
      'mealType must be one of Breakfast, Lunch, Dinner, Snack.',
      'Scores must be integers from 1 to 10.',
      `Optional user description: ${payload.description || 'none'}`,
    ].join(' ')

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: `data:${payload.mimeType};base64,${payload.imageBase64}` } },
          ],
        }],
        temperature: 0.2,
      }),
    })

    if (!response.ok) throw new Error(`Vision API failed with ${response.status}`)
    const data = await response.json()
    const text = data?.choices?.[0]?.message?.content || ''
    const parsed = typeof text === 'string' ? extractJson(text) : null
    if (!parsed) throw new Error('Vision response did not contain valid JSON')

    return {
      dishName: typeof parsed.dishName === 'string' && parsed.dishName.trim() ? parsed.dishName.trim() : fallback.dishName,
      mealType: ['Breakfast', 'Lunch', 'Dinner', 'Snack'].includes(parsed.mealType) ? parsed.mealType : fallback.mealType,
      healthScore: normalizeScore(parsed.healthScore, fallback.healthScore),
      costScore: normalizeScore(parsed.costScore, fallback.costScore),
      tasteScoreSuggestion: normalizeScore(parsed.tasteScoreSuggestion, fallback.tasteScoreSuggestion),
      confidence: Math.min(95, Math.max(35, Number(parsed.confidence) || fallback.confidence)),
      reasoning: typeof parsed.reasoning === 'string' && parsed.reasoning.trim() ? parsed.reasoning.trim() : fallback.reasoning,
      source: 'vision',
    }
  } catch {
    return null
  }
}

export async function scoreMealWithVision(payload: VisionPayload): Promise<VisionResult> {
  const fallback = estimateMealFromDescription(payload.description || 'Meal photo uploaded')
  const externalResult = await scoreMealWithExternalScorer(payload)
  if (externalResult) return externalResult
  const openAiResult = await scoreMealWithOpenAI(payload, fallback)
  if (openAiResult) return openAiResult
  return { ...fallback, source: 'heuristic' }
}
