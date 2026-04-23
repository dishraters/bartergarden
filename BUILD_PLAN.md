# BarterGarden Build Plan

## Goal
Turn the finalized PRD into a build-ready MVP spec with the first 5 screens, acceptance criteria, and implementation backlog.

## First 5 Screens

### 1. Town Selection / Onboarding
**Purpose:** Lock the user into Somerville or Medfield at the start.

**UI elements:**
- BarterGarden logo and short value prop
- Two town cards: Somerville, Medfield
- Continue button
- Small note: only these launch communities are supported in MVP

**Acceptance criteria:**
- user must select exactly one town before continuing
- selected town persists in session/user profile
- feed only shows listings from selected town after onboarding
- unsupported town users are not routed into the main feed

### 2. Home Feed
**Purpose:** Give immediate browse value with a Facebook Marketplace-style local produce feed.

**UI elements:**
- search / browse header
- town chip
- filter chips: All, Sell, Trade, Free, Newest, Available now
- listing card grid
- create listing CTA
- inbox shortcut

**Listing card requirements:**
- photo
- title
- price or trade/free label
- neighborhood or approximate distance
- freshness note
- quantity
- posted time

**Acceptance criteria:**
- feed renders seeded listings for chosen town
- changing filters updates visible cards correctly
- clicking a card opens listing detail page
- completed listings do not appear in active feed

### 3. Listing Detail Page
**Purpose:** Convert browsing into messaging.

**UI elements:**
- photo gallery
- title
- transaction type
- quantity / unit
- freshness / harvest date
- description
- approximate location
- seller preview
- message seller CTA
- save listing CTA
- report CTA

**Acceptance criteria:**
- all listing metadata renders from data model
- seller exact address is never shown publicly
- message CTA opens or creates message thread
- save action persists listing to saved state
- report action creates moderation event

### 4. Create Listing
**Purpose:** Let growers post produce in under 2 minutes.

**Fields:**
- produce type
- title
- photos
- quantity
- unit
- sell / trade / free
- price or trade interest
- description
- harvest date / freshness
- pickup neighborhood
- availability window

**Acceptance criteria:**
- listing cannot publish without title, mode, quantity, neighborhood, and freshness/harvest input
- trade listings must support trade interest text
- free listings do not require price
- published listing appears in matching town feed immediately
- seller can mark listing complete later

### 5. Messaging / Inbox
**Purpose:** Coordinate pickup and exchange with minimal friction.

**UI elements:**
- thread list
- active 1:1 chat thread
- quick prompts:
  - Is this still available?
  - Would you trade for herbs?
  - When can I pick up?
- mark listing complete action for seller

**Acceptance criteria:**
- buyer can start a thread from listing detail
- seller and buyer can exchange messages in one thread per listing pair
- seller can mark listing complete from thread or listing
- completed listings auto-close or visually archive the thread

## Supporting Screens

### Seller Profile
**Acceptance criteria:**
- shows first name, profile photo, neighborhood, join date, listing count
- shows active listings
- does not expose sensitive personal information

### Moderation Dashboard
**Acceptance criteria:**
- admin can see flagged listings/users
- admin can remove listing
- admin can suspend account
- moderation actions are logged

## Data / Backend Requirements

### Core tables / collections
- users
- listings
- saved_listings
- message_threads
- messages
- reports

### Seed data requirement
- preload example listings for both Somerville and Medfield
- ensure feed feels alive immediately in development/demo mode

## Implementation Backlog

### P0
1. Town onboarding flow
2. Listing schema + seed data
3. Home feed from real data
4. Listing detail page
5. Create listing flow
6. Messaging threads
7. Mark listing complete
8. Report listing / block user
9. Admin moderation screen

### P1
1. Saved listings
2. Seller profile page
3. Better filters
4. Availability now filter
5. Founding grower badge

### P2
1. Push notifications
2. Search improvements
3. Repeat grower label
4. Seasonal picks logic

## Suggested Build Order
### Sprint 1
- onboarding
- seed data
- feed
- listing detail

### Sprint 2
- create listing
- messaging
- mark complete

### Sprint 3
- saved listings
- profile
- moderation tools

## Definition of MVP Complete
BarterGarden MVP is complete when:
- users can choose Somerville or Medfield
- users can browse active produce listings in their town
- growers can publish a listing
- buyers can message growers
- sellers can mark listings complete
- admins can moderate reports
- the app remains simple, local, and produce-only
