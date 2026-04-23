import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  Timestamp,
} from 'firebase/firestore'
import { getDb } from '@/lib/firebase'

export type Habit = {
  id: string
  userId: string
  name: string
  icon: string
  color: string
  growth_stage: number
  streak_count: number
  shellcoin_earned_total?: number
  status: 'active' | 'wilted' | 'dormant'
  last_watered_at?: string | null
  created_at?: string | null
}

export type GratitudeEntry = {
  id: string
  userId: string
  entry_date: string
  grateful_1: string
  grateful_2: string
  grateful_3: string
  affirmation: string
  created_at?: string | null
  updated_at?: string | null
}

export type DailyPlan = {
  id: string
  userId: string
  plan_date: string
  big_win_1: string
  big_win_2: string
  big_win_3: string
  other_task_1: string
  other_task_2: string
  morning_saved_at?: string | null
  created_at?: string | null
  updated_at?: string | null
}

export type JournalEntry = {
  id: string
  habit_id: string
  date: string
  grateful_1: string
  grateful_2: string
  grateful_3: string
  affirmation?: string
  created_at?: string | null
}

export type BirdingEntry = {
  id: string
  userId: string
  entry_date: string
  bird_1: string
  bird_2: string
  bird_3: string
  bird_4: string
  bird_5: string
  created_at?: string | null
  updated_at?: string | null
}

const toIso = (value: unknown) => {
  if (!value) return null
  if (value instanceof Timestamp) return value.toDate().toISOString()
  if (typeof value === 'object' && value !== null && 'toDate' in value && typeof (value as { toDate: () => Date }).toDate === 'function') {
    return (value as { toDate: () => Date }).toDate().toISOString()
  }
  return String(value)
}

const mapDoc = <T extends { id: string }>(id: string, data: Record<string, unknown>) => ({
  id,
  ...data,
  created_at: toIso(data.created_at),
  updated_at: toIso(data.updated_at),
  last_watered_at: toIso(data.last_watered_at),
  morning_saved_at: toIso(data.morning_saved_at),
}) as unknown as T

export async function getHabits(userId: string): Promise<Habit[]> {
  const q = query(collection(getDb(), 'habits'), where('userId', '==', userId), orderBy('created_at', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((docSnap) => mapDoc<Habit>(docSnap.id, docSnap.data()))
}

export async function addHabit(userId: string, habit: Omit<Habit, 'id' | 'userId' | 'created_at'>) {
  await addDoc(collection(getDb(), 'habits'), {
    ...habit,
    userId,
    created_at: serverTimestamp(),
  })
}

export async function updateHabit(habitId: string, updates: Partial<Habit>) {
  await updateDoc(doc(getDb(), 'habits', habitId), updates)
}

export async function getGratitudeEntry(userId: string, entryDate: string): Promise<GratitudeEntry | null> {
  const q = query(collection(getDb(), 'gratitudeEntries'), where('userId', '==', userId), where('entry_date', '==', entryDate), limit(1))
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const docSnap = snapshot.docs[0]
  return mapDoc<GratitudeEntry>(docSnap.id, docSnap.data())
}

export async function getGratitudeHistory(userId: string): Promise<GratitudeEntry[]> {
  const q = query(collection(getDb(), 'gratitudeEntries'), where('userId', '==', userId), orderBy('entry_date', 'desc'), limit(30))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((docSnap) => mapDoc<GratitudeEntry>(docSnap.id, docSnap.data()))
}

export async function saveGratitudeEntry(userId: string, entryDate: string, entry: Omit<GratitudeEntry, 'id' | 'userId' | 'entry_date'>) {
  const ref = doc(getDb(), 'gratitudeEntries', `${userId}_${entryDate}`)
  await setDoc(ref, {
    ...entry,
    userId,
    entry_date: entryDate,
    updated_at: serverTimestamp(),
    created_at: serverTimestamp(),
  }, { merge: true })
}

export async function getDailyPlan(userId: string, planDate: string): Promise<DailyPlan | null> {
  const q = query(collection(getDb(), 'dailyPlans'), where('userId', '==', userId), where('plan_date', '==', planDate), limit(1))
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const docSnap = snapshot.docs[0]
  return mapDoc<DailyPlan>(docSnap.id, docSnap.data())
}

export async function getDailyPlanHistory(userId: string): Promise<DailyPlan[]> {
  const q = query(collection(getDb(), 'dailyPlans'), where('userId', '==', userId), orderBy('plan_date', 'desc'), limit(30))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((docSnap) => mapDoc<DailyPlan>(docSnap.id, docSnap.data()))
}

export async function saveDailyPlan(userId: string, planDate: string, plan: Omit<DailyPlan, 'id' | 'userId' | 'plan_date'>) {
  const ref = doc(getDb(), 'dailyPlans', `${userId}_${planDate}`)
  await setDoc(ref, {
    ...plan,
    userId,
    plan_date: planDate,
    updated_at: serverTimestamp(),
    created_at: serverTimestamp(),
  }, { merge: true })
}

export async function getHabitJournalEntries(habitId: string, limit_count: number = 10): Promise<JournalEntry[]> {
  const q = query(collection(getDb(), 'journalEntries'), where('habit_id', '==', habitId), orderBy('date', 'desc'), limit(limit_count))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((docSnap) => mapDoc<JournalEntry>(docSnap.id, docSnap.data()))
}

export async function saveJournalEntry(habitId: string, entry: JournalEntry) {
  const ref = doc(getDb(), 'journalEntries', `${habitId}_${entry.date}`)
  await setDoc(ref, {
    ...entry,
    created_at: serverTimestamp(),
  }, { merge: true })
}

export async function saveBirdingEntry(userId: string, entryDate: string, entry: Omit<BirdingEntry, 'id' | 'userId' | 'entry_date'>) {
  const ref = doc(getDb(), 'birdingEntries', `${userId}_${entryDate}`)
  await setDoc(ref, {
    ...entry,
    userId,
    entry_date: entryDate,
    updated_at: serverTimestamp(),
    created_at: serverTimestamp(),
  }, { merge: true })
}

// Shellcoin / DDC - Internal reward system (Shellcoin is the new name)
// Keeping ddc_rewards collection for backward compatibility with existing data
export type DDCReward = {
  id: string
  userId: string
  habitId: string
  habitName: string
  amount: number
  date: string
  created_at?: string | null
}

// Shellcoin functions (new naming) - uses same ddc_rewards collection for data persistence
export type ShellcoinReward = DDCReward

export async function getUserShellcoinBalance(userId: string): Promise<number> {
  return getUserDDCBalance(userId)
}

export async function addShellcoinReward(userId: string, habitId: string, habitName: string, amount: number = 1) {
  return addDDCReward(userId, habitId, habitName, amount)
}

export async function getShellcoinRewardHistory(userId: string, limit_count: number = 30): Promise<ShellcoinReward[]> {
  return getDDCRewardHistory(userId, limit_count)
}

// Get today's shellcoins earned
const getLocalDateString = (date: Date = new Date()) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export async function getTodayShellcoins(userId: string): Promise<number> {
  const today = getLocalDateString()
  const q = query(
    collection(getDb(), 'ddc_rewards'),
    where('userId', '==', userId),
    where('date', '==', today)
  )
  const snapshot = await getDocs(q)
  let total = 0
  snapshot.docs.forEach(doc => {
    const reward = doc.data() as DDCReward
    total += reward.amount
  })
  return total
}

export async function getUserDDCBalance(userId: string): Promise<number> {
  const q = query(
    collection(getDb(), 'ddc_rewards'),
    where('userId', '==', userId)
  )
  const snapshot = await getDocs(q)
  let balance = 0
  snapshot.docs.forEach(doc => {
    const reward = doc.data() as DDCReward
    balance += reward.amount
  })
  return balance
}

export async function addDDCReward(userId: string, habitId: string, habitName: string, amount: number = 1) {
  const today = getLocalDateString()
  const rewardId = `${userId}_${habitId}_${today}`
  const rewardRef = doc(getDb(), 'ddc_rewards', rewardId)
  const existingReward = await getDoc(rewardRef)

  if (existingReward.exists()) {
    console.warn('DDC reward already exists', { rewardId, userId, habitId, habitName, today })
    return false
  }

  const reward: DDCReward = {
    id: rewardId,
    userId,
    habitId,
    habitName,
    amount,
    date: today,
  }

  console.info('Creating DDC reward', reward)
  await setDoc(rewardRef, {
    ...reward,
    created_at: serverTimestamp(),
  }, { merge: false })

  return true
}

export async function getDDCRewardHistory(userId: string, limit_count: number = 30): Promise<DDCReward[]> {
  const q = query(
    collection(getDb(), 'ddc_rewards'),
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(limit_count)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(docSnap => mapDoc<DDCReward>(docSnap.id, docSnap.data()))
}
