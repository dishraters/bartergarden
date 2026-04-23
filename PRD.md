# BarterGarden PRD

## Product Summary
BarterGarden is a hyperlocal marketplace for homegrown produce. People can sell, trade, or give away extra produce they grow themselves, while nearby neighbors discover fresh local food and build stronger community ties.

The mental model should feel like Facebook Marketplace:
- location-first discovery
- simple listing cards
- lightweight chat
- obvious trust cues

But the wedge is intentionally narrow: homegrown produce and garden surplus only.

## Current Strategic Direction
Based on the latest input, the product should launch as a narrow MVP with:
- two seed communities: Somerville and Medfield
- one main category: homegrown produce only
- three transaction types: sell, trade, free
- one simple local feed model: Facebook Marketplace style

This focus is important. It prevents category sprawl, keeps supply dense, and makes the app easier to understand and easier to ship.

## Product Vision
Create the easiest way for neighbors to move extra homegrown food to nearby people who will actually use it.

This is not a general local classifieds app.
It is a neighborhood produce network that:
- reduces food waste
- makes unusual local produce discoverable
- gives small growers a low-friction side-income or barter path
- helps people reconnect with seasonality and their community

## Core Problem
### Supply side
People with backyard gardens, herbs, fruit trees, or seasonal overflow often have more produce than they can use.

Today they usually:
- let it go bad
- give it away informally
- post in noisy community groups
- text people manually
- never list it in a produce-specific way

### Demand side
Nearby neighbors want:
- fresher food
- unusual homegrown foods
- hyperlocal access
- something more personal than a grocery store

### Current alternatives
- Facebook Marketplace
- local Facebook groups
- Nextdoor
- text threads
- ad hoc free pickup

### Why those alternatives are weak
- not built for produce
- cluttered with unrelated goods
- poor freshness signals
- weak trust and harvest context
- awkward trade flow

## Goal
Create the fastest and simplest way for a neighbor to:
- list extra produce
- discover nearby produce
- message another neighbor
- arrange pickup or trade

## Success Hypothesis
If local produce discovery feels as easy as Facebook Marketplace, growers will list surplus instead of wasting it, and nearby neighbors will engage because the inventory is fresh, close, and unique.

## Target Users
### 1. Backyard gardeners
People with tomatoes, cucumbers, peppers, greens, herbs, berries, or fruit tree overflow.

### 2. Hobby growers
People who regularly produce a little more than their household needs.

### 3. Families with extra produce
People with occasional surplus who want a simple way to move it quickly.

### 4. Local food explorers
Neighbors who want fresher or more interesting produce than they find in standard grocery shopping.

## Product Principles
1. Location first
   - Nearby listings should always be the default experience.
2. Category discipline
   - Homegrown produce only for launch.
3. Familiar UX
   - The feed should feel obvious and instantly understandable.
4. Lightweight trust
   - Use basic trust cues early, not a huge reputation system.
5. Trade is native
   - Swapping should be just as easy as selling.
6. Ship narrow
   - Geography and scope stay tight until liquidity is proven.

## Launch Recommendation
### Start with
- Somerville
- Medfield
- homegrown produce only
- sell / trade / free flows
- local card feed
- simple messaging

### Do not launch with
- delivery logistics
- in-app payments
- shipping
- dynamic maps
- advanced search ranking
- full reputation systems
- subscriptions
- gardener verification
- multi-city expansion
- broad inventory like crafts, plants, baked goods, eggs, or pantry items

## MVP Scope
### In scope
- onboarding with location selection
- location-based feed for Somerville and Medfield
- listing creation
- listing types: sell, trade, free
- item cards with photo, title, neighborhood/distance, freshness, quantity
- listing detail page
- in-app messaging
- save/favorite listings
- basic seller profile
- reporting / flagging
- admin moderation dashboard
- pickup coordination through chat

### Out of scope
- in-app payments
- delivery
- shipping
- dynamic maps
- advanced recommendation systems
- full review/reputation system
- subscriptions
- gardener verification
- escrow
- multi-city rollout beyond the two launch communities

## Core MVP Features
### 1. Onboarding with Location Gate
Users select their community and browsing radius.
For MVP, activity is limited to Somerville and Medfield so the marketplace feels dense.

### 2. Marketplace Feed
A Facebook Marketplace-style feed of produce cards.

Each listing should show:
- produce image
- title
- sell / trade / free label
- price if applicable
- distance or neighborhood
- freshness note
- quantity
- seller name

### 3. Listing Creation
Create a listing in under 2 minutes.

Required fields:
- title
- image
- type: sell, trade, free
- quantity
- pickup area
- freshness / harvest note
- short description

Optional fields:
- trade preference
- availability window
- variety details

### 4. Listing Detail Page
A fuller listing screen with:
- larger image
- product description
- harvest/freshness info
- exchange type
- pickup area
- seller profile summary
- message CTA

### 5. Messaging
Lightweight in-app messaging for:
- item availability
- trade details
- pickup timing
- porch pickup instructions

### 6. Save / Favorite Listings
Users can save listings to revisit later.

### 7. Seller Profile
Basic seller profile should include:
- display name
- neighborhood
- active listings
- joined date
- simple trust cues

### 8. Reporting + Moderation
Users can flag listings or accounts.
Admins need a simple moderation dashboard to review issues quickly.

## User Stories
### Seller
- As a grower, I want to post extra tomatoes in under 2 minutes so I can sell or trade them before they spoil.
- As a grower, I want to mark produce as free, for sale, or trade so I can choose the exchange type.
- As a grower, I want to set pickup area and availability so neighbors can coordinate easily.
- As a grower, I want to mark a listing as sold, traded, or gone so the feed stays current.

### Buyer / Trader
- As a neighbor, I want to browse produce near me so I can find fresh food locally.
- As a neighbor, I want to filter by produce type and exchange type so I can quickly find what I want.
- As a neighbor, I want to message a grower so I can arrange pickup.
- As a neighbor, I want to save listings so I can come back later.

### Admin
- As an admin, I want to review flagged listings and users so the marketplace stays safe and relevant.
- As an admin, I want to limit activity to launch geographies so supply stays dense.

## Key Screens
### A. Location Onboarding
- choose Somerville or Medfield
- confirm local browsing intent

### B. Home Feed
- listing cards
- local-first sorting
- exchange type filters
- freshness and distance cues

### C. Listing Detail
- full produce details
- message CTA
- grower summary

### D. Create Listing
- simple photo-first flow
- choose sell / trade / free
- add quantity and pickup info

### E. Inbox
- lightweight conversation threads

### F. Seller Profile
- active listings
- neighborhood identity
- trust basics

### G. Admin Moderation
- flagged listings queue
- flagged users queue
- remove / hide actions

## Data Model
### Users
- id
- display_name
- neighborhood
- city
- profile_photo
- bio
- joined_at
- launch_area

### Listings
- id
- user_id
- title
- description
- category (produce only for MVP)
- mode: sell | trade | free
- price
- quantity
- unit
- photos
- harvest_note
- availability_note
- pickup_area
- latitude
- longitude
- launch_area
- created_at
- status: active | reserved | sold | traded | gone | flagged

### Saved Listings
- id
- user_id
- listing_id
- created_at

### Message Threads
- id
- listing_id
- buyer_id
- seller_id
- created_at
- last_message_at

### Messages
- id
- thread_id
- sender_id
- body
- created_at

### Flags
- id
- user_id
- listing_id
- reason
- notes
- created_at
- status

## What Makes It Different
### Versus Facebook Marketplace
- produce-specific cues
- cleaner local food discovery
- barter is first-class
- less irrelevant inventory
- freshness matters in the interface

### Versus grocery apps
- hyperlocal
- seasonal
- neighbor-driven
- unique small-batch supply

### Versus formal farm marketplaces
- built for tiny harvests
- low-friction posting
- more casual and neighborhood-friendly

## Biggest Risks
### 1. Low liquidity
If there are not enough listings nearby, the marketplace feels dead.

Mitigation:
- launch in only two communities
- seed supply first

### 2. Trust friction
People may hesitate to meet or consume backyard produce from strangers.

Mitigation:
- neighborhood-based identity
- basic trust cues
- moderation tools
- clear pickup norms

### 3. Category sprawl
If too many categories are added too early, the core value gets diluted.

Mitigation:
- keep produce-only discipline at launch

### 4. Complexity creep
Payments, delivery, and heavy operations can slow shipping.

Mitigation:
- chat-based pickup coordination only
- no payments in MVP

## Success Metrics
### Supply
- active listings per community
- weekly active growers

### Demand
- messages per listing
- saves per listing
- feed view to message conversion

### Liquidity
- percent of listings getting a message
- average time to first message
- percent of listings marked sold / traded / gone

### Quality
- flag rate
- moderation turnaround time
- stale listing rate

## Current Product State
What is live right now is still primarily a concept/demo shell.

What it does well:
- communicates the idea clearly
- shows the visual direction
- frames the marketplace correctly
- feels familiar to end users

What it still needs to become the real MVP:
- real listing data
- onboarding with community selection
- listing creation flow
- listing detail pages
- messaging
- saved listings
- moderation tools
- seller profiles

## Recommended Immediate Next Sprint
### Sprint goal
Turn the concept shell into a functioning hyperlocal produce marketplace MVP for Somerville and Medfield.

### Sprint tasks
1. Add location onboarding locked to Somerville and Medfield
2. Set up listing schema and real seed listing data
3. Build create-listing flow
4. Build listing detail pages
5. Build lightweight messaging
6. Add saved listings
7. Add seller profile pages
8. Add reporting / flagging
9. Add simple moderation dashboard

## Decision Questions To Review
1. Should free listings be as prominent as sell and trade at launch?
2. Should Medfield and Somerville share one feed or be segmented by default?
3. Do we want message requests first, or full chat immediately?
4. How much identity is required before someone can post?
5. Do we enforce photo requirement for every listing?
6. How long before stale listings auto-expire?
7. Should there be a hard cap on how far away a listing can appear in MVP?
