# BarterGarden Product Specs

## Product constraints
These constraints apply to every screen and backlog item in this document.

- Launch towns are **Somerville** and **Medfield** only
- Category is **homegrown produce only**
- Transaction types are **sell**, **trade**, and **free** only
- No Atlanta references
- No eggs
- No seeds / starts unless explicitly re-added later

---

# 1. Core Screen Specs

## Screen 1: Home / Browse Feed
### Purpose
Give users immediate browse value with a Facebook Marketplace-style feed of nearby homegrown produce in their selected town.

### Primary users
- buyers
- traders
- casual browsers
- sellers checking market activity

### Required UI elements
- top nav with BarterGarden brand
- current town indicator: Somerville or Medfield
- create listing CTA
- inbox CTA
- search input placeholder
- filter chips:
  - All
  - Sell
  - Trade
  - Free
  - Newest
  - Available now
- listing card grid

### Listing card fields
- photo
- title
- transaction label: Sell / Trade / Free
- price if Sell
- quantity + unit
- neighborhood
- freshness note
- posted time

### Feed behavior
- only show listings in the selected town
- only show homegrown produce listings
- hide completed / inactive listings from main feed
- clicking a card opens Listing Detail

### Empty state
- if no listings exist for current town, show:
  - empty state illustration / placeholder
  - message explaining the town feed is still growing
  - CTA to create first listing

### Acceptance criteria
- user sees only Somerville or Medfield listings based on chosen town
- no non-produce categories appear
- no eggs or seeds/starts appear
- only sell/trade/free labels are valid
- listing cards always show title, transaction type, neighborhood, freshness, and quantity
- selecting a card opens the correct detail page
- inactive listings are excluded from feed results

---

## Screen 2: Listing Detail
### Purpose
Convert browse intent into contact by giving full produce context and a clear message CTA.

### Required UI elements
- back to feed link
- image gallery or primary image
- title
- transaction type
- price if applicable
- quantity + unit
- produce type
- harvest date
- freshness note
- description
- availability text
- approximate neighborhood only
- seller preview card
- message seller CTA
- save listing CTA
- report listing CTA

### Seller preview fields
- first name
- profile photo
- town
- neighborhood
- join date

### Privacy rules
- never show exact address publicly
- pickup details shared only after messaging

### Acceptance criteria
- page renders all required listing fields from data model
- transaction type is limited to sell, trade, or free
- seller preview does not expose private location details
- message CTA opens or creates thread in Inbox
- save CTA persists saved state
- report CTA creates moderation record
- listing detail cannot render invalid categories outside produce

---

## Screen 3: Create Listing
### Purpose
Allow growers to publish extra produce in under 2 minutes.

### Required fields
- produce type
- title
- photo upload
- quantity
- unit
- transaction type: sell / trade / free
- price (required only for sell)
- trade interest (required only for trade)
- description
- harvest date or freshness input
- pickup neighborhood
- availability window
- selected town (derived from onboarding/user state)

### Validation rules
- produce type required
- title required
- at least one photo required
- quantity required
- unit required
- transaction type required
- sell requires price
- trade requires trade interest
- free requires no price
- freshness or harvest date required
- pickup neighborhood required
- listing town must be Somerville or Medfield only

### Publish behavior
- new listing appears in active feed immediately after publish
- listing defaults to active status
- listing is associated with seller profile and selected town

### Acceptance criteria
- user cannot publish without all required fields
- free listings never require price
- trade listings require trade interest
- listing town cannot be outside Somerville or Medfield
- published listing appears in matching town feed
- published listing detail page is accessible immediately
- unsupported categories are blocked at validation layer

---

## Screen 4: Inbox / Messages
### Purpose
Support lightweight buyer-seller coordination for pickup or trade.

### Required UI elements
- thread list
- active message thread
- listing reference in thread header
- participant name
- message composer
- quick prompts:
  - Is this still available?
  - Would you trade for herbs?
  - When can I pick up?
- seller-only action: mark listing complete

### Thread rules
- one thread per buyer + seller + listing combination
- thread linked to a single listing
- only participants can view the thread
- completed listings should close or archive related thread state visually

### Acceptance criteria
- buyer can open thread from listing detail
- seller and buyer can exchange messages in same thread
- seller can mark listing complete from thread
- marking listing complete removes listing from active feed
- completed thread becomes archived or read-only state
- no messaging exists outside a listing context in MVP

---

## Screen 5: Profile / My Listings
### Purpose
Let users manage identity basics and active listings.

### Required UI elements
- first name
- profile photo
- town
- neighborhood
- join date
- active listings count
- list of active listings
- status indicator for each listing
- manage listing actions:
  - open detail
  - mark complete
  - edit placeholder if not yet implemented

### Profile constraints
- town must be Somerville or Medfield only
- listings shown here must belong to current user only

### Acceptance criteria
- profile renders first name, town, neighborhood, join date, and listing count
- active listings list only contains current user listings
- marking listing complete updates feed visibility
- user cannot view private admin actions from profile screen
- no unsupported category types appear in profile listings

---

# 2. Acceptance Criteria Summary by Screen

## Home / Browse Feed
- town-limited feed only
- produce-only inventory only
- transaction type limited to sell / trade / free
- no eggs
- no seeds/starts
- inactive listings hidden

## Listing Detail
- full produce metadata visible
- exact address hidden
- message/save/report actions present
- seller preview limited to lightweight trust fields

## Create Listing
- strict validation on required fields
- town locked to Somerville or Medfield
- category constrained to produce
- transaction rules enforced by type

## Inbox / Messages
- listing-based messaging only
- thread uniqueness enforced
- seller can mark complete
- completed listings archived from active flow

## Profile / My Listings
- only current user listings
- listing management actions visible
- private or admin-only actions excluded

---

# 3. Implementation Backlog

## Frontend
### P0
- build town-aware home feed UI
- build transaction filter chips
- render listing cards from structured listing data
- build listing detail screen
- build create listing form with validation states
- build inbox thread list and message panel
- build profile / my listings screen
- support mark listing complete action in UI
- add empty states for no listings
- add unsupported category guard text in create flow

### P1
- save listing interaction
- optimistic UI updates for publishing and completing listings
- archived thread state after listing completion
- client-side form error messaging polish

### P2
- search input behavior
- favorites screen if needed later
- notification badges

## Backend
### P0
- define user model
- define listing model
- define message thread model
- define messages model
- define reports model
- enforce allowed towns: Somerville, Medfield
- enforce allowed transaction types: sell, trade, free
- enforce produce-only category constraint
- reject eggs and seeds/starts at API/model layer
- create publish listing endpoint/action
- create fetch feed by town endpoint/action
- create fetch listing detail endpoint/action
- create create/open thread endpoint/action
- create send message endpoint/action
- create mark listing complete endpoint/action
- create save listing endpoint/action

### P1
- saved listings retrieval
- stale listing cleanup rule
- availability-now filtering logic

### P2
- notification events
- search indexing improvements

## Admin / Moderation
### P0
- create report listing action
- create block user action
- create moderation queue data model
- create admin view for flagged listings/users
- create remove listing action
- create suspend account action
- log moderation actions
- enforce produce-only policy in moderation workflows

### P1
- moderation filters by town
- moderation status updates
- simple audit trail UI

### P2
- moderation analytics
- repeated offender heuristics

---

# 4. Engineering Notes
- Use seeded Somerville and Medfield produce listings first so the app feels alive in dev/demo environments.
- Keep all example inventory produce-only.
- Do not add eggs, seeds/starts, Atlanta, or extra towns anywhere in the UI copy, data model, or seed data.
- Keep exact addresses out of public surfaces.
- Treat supply density as the primary product risk while building.

---

# 5. Definition of Build-Ready Spec
This document is build-ready when engineering can implement:
- the 5 core screens above
- the listed acceptance criteria
- the grouped frontend/backend/admin backlog
without needing further clarification on scope boundaries.
