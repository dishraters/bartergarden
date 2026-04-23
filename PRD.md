# Habit Garden - Product Requirements Document

## Overview
A simple, focused habit tracking app where users check off habits daily and watch them grow through stages.

## Current UI State (March 2026)

### Layout
- Single screen, no navigation
- Header: "Habit Garden" title + Sign Out button
- 3x3 grid of habit slots
- Growth stage legend at bottom

### Each Habit Slot (Row)
- **Left**: Checkbox (tap to complete)
- **Center**: Habit name
- **Right**: Growth stage emoji

### Visual States
- **Uncompleted**: White background, empty checkbox
- **Completed**: Green tint background, filled checkbox with ✓
- **Empty slot**: Shows 🟫 (brown square)

### Growth Stages
| Stage | Emoji | Streak Required |
|-------|-------|-----------------|
| Seed | 🌰 | 0 |
| Sprout | 🌱 | 1-3 |
| Small Plant | 🌿 | 4-7 |
| Mature Plant | 🌳 | 8+ |

### Default Habits (9 slots)
1. Meditation
2. Journal
3. Train
4. Breakfast
5. Lunch
6. Dinner
7. Stop Eating
8. Plan
9. Mindful Movements

### Behavior
- New habits start at **Sprout** stage (not Seed)
- Tap checkbox → increments streak, updates growth stage
- Completed habits for the day are disabled (can't double-click)
- All 9 habits auto-created on first sign-in
- Legacy habit names auto-migrated on sign-in

### Data Model
```
habits table:
- id: uuid
- user_id: uuid
- name: string
- icon: string
- color: string
- growth_stage: 0-3
- streak_count: integer
- status: active|wilted|dormant
- last_watered_at: timestamp
- created_at: timestamp
```

## Features Implemented
- ✅ Simple checkbox interface
- ✅ Visual growth progression
- ✅ 9 fixed habit slots
- ✅ Auto-create habits on sign-in
- ✅ Streak tracking
- ✅ Completed state (disabled checkbox)

## Potential Improvements (Future)
- [ ] Allow editing/deleting habits
- [ ] Add more than 9 habits
- [ ] Reminder notifications
- [ ] Progress history/stats
- [ ] Community/sharing features
