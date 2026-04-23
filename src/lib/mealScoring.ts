export type MealScoreResult = {
  dishName: string
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
  healthScore: number
  costScore: number
  tasteScoreSuggestion: number
  confidence: number
  reasoning: string
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function normalizeText(input: string) {
  return input.toLowerCase()
}

export function estimateMealFromDescription(description: string): MealScoreResult {
  const text = normalizeText(description)

  const dishName = description.trim() || 'Meal'
  let mealType: MealScoreResult['mealType'] = 'Lunch'
  let healthScore = 5
  let costScore = 5
  let tasteScoreSuggestion = 7
  let confidence = 62

  const healthyKeywords = ['salad', 'grilled', 'chicken', 'salmon', 'vegetable', 'veggies', 'greens', 'avocado', 'brown rice', 'quinoa', 'fruit', 'berries', 'egg', 'eggs', 'yogurt', 'oatmeal', 'smoothie', 'protein']
  const indulgentKeywords = ['fries', 'burger', 'pizza', 'fried', 'milkshake', 'cake', 'ice cream', 'pasta', 'alfredo', 'nachos', 'wings', 'soda', 'donut']
  const expensiveKeywords = ['steak', 'salmon', 'sushi', 'lobster', 'shrimp', 'takeout', 'delivery', 'restaurant']
  const cheapKeywords = ['eggs', 'toast', 'oatmeal', 'rice', 'beans', 'sandwich', 'leftovers', 'home made', 'homemade']
  const breakfastKeywords = ['breakfast', 'eggs', 'toast', 'coffee', 'pancake', 'waffle', 'oatmeal', 'bacon', 'bagel']
  const dinnerKeywords = ['dinner', 'steak', 'pasta', 'salmon', 'pizza', 'curry', 'tacos']
  const snackKeywords = ['snack', 'bar', 'chips', 'cookie', 'smoothie']

  const healthyHits = healthyKeywords.filter((keyword) => text.includes(keyword)).length
  const indulgentHits = indulgentKeywords.filter((keyword) => text.includes(keyword)).length
  const expensiveHits = expensiveKeywords.filter((keyword) => text.includes(keyword)).length
  const cheapHits = cheapKeywords.filter((keyword) => text.includes(keyword)).length

  healthScore += healthyHits * 1.2
  healthScore -= indulgentHits * 1.1
  costScore += expensiveHits * 1.1
  costScore -= cheapHits * 0.9

  if (breakfastKeywords.some((keyword) => text.includes(keyword))) mealType = 'Breakfast'
  else if (dinnerKeywords.some((keyword) => text.includes(keyword))) mealType = 'Dinner'
  else if (snackKeywords.some((keyword) => text.includes(keyword))) mealType = 'Snack'

  if (text.includes('homemade') || text.includes('home made')) confidence += 4
  if (text.includes('takeout') || text.includes('delivery')) costScore += 1
  if (text.includes('healthy') || text.includes('protein')) confidence += 3

  healthScore = clamp(Math.round(healthScore), 1, 10)
  costScore = clamp(Math.round(costScore), 1, 10)
  tasteScoreSuggestion = clamp(Math.round(6.5 + healthyHits * 0.2 + indulgentHits * 0.4), 1, 10)
  confidence = clamp(Math.round(confidence + healthyHits * 3 + indulgentHits * 2 + expensiveHits * 2), 35, 95)

  const reasoningParts = [
    healthyHits > 0 ? 'healthy ingredients detected' : null,
    indulgentHits > 0 ? 'richer or fried elements detected' : null,
    expensiveHits > 0 ? 'restaurant or premium ingredients suggest higher cost' : null,
    cheapHits > 0 ? 'budget-friendly ingredients suggest lower cost' : null,
  ].filter(Boolean)

  return {
    dishName,
    mealType,
    healthScore,
    costScore,
    tasteScoreSuggestion,
    confidence,
    reasoning: reasoningParts.length > 0
      ? `Estimated from description, ${reasoningParts.join(', ')}.`
      : 'Estimated from your description using simple Dishrated scoring rules.',
  }
}
