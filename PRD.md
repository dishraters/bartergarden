# BarterGarden PRD

## Product Summary
BarterGarden is a hyperlocal marketplace for homegrown produce. People can sell, trade, or give away extra produce they grow themselves, while nearby neighbors discover fresh local food and build stronger community ties.

The mental model should feel like Facebook Marketplace:
- location-first discovery
- simple listing cards
- lightweight chat
- obvious trust cues

But the wedge is intentionally narrow: homegrown produce and garden surplus only.

## One-Sentence Positioning
A local marketplace for homegrown produce, built to help neighbors sell, trade, and discover fresh food nearby.

## Copy-Pastable MVP Definition
MVP = a Facebook Marketplace-style local feed for homegrown produce in Somerville and Medfield, where users can create listings, browse nearby produce, message neighbors, and arrange pickup for sale, trade, or free exchange.

## Current Strategic Direction
The product should launch as a narrow MVP with:
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
2. Freshness matters
3. Fast listing creation wins
4. Supply density matters more than feature depth
5. Trust must be lightweight but visible
6. Keep the marketplace narrow early

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

## Initial Geography Strategy
### Phase 1 launch markets
- Somerville, MA
- Medfield, MA

### Why these first
- manageable scope
- easier to seed supply density
- easier to moderate
- local network effects can form faster
- easier to recruit initial growers manually

### Geo constraint for MVP
Users must choose:
- Somerville
- Medfield

Only show listings within the selected launch zone at first.

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
- mark listing complete

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

## Core Features
### A. Location-based home feed
A Facebook Marketplace-style card feed with:
- photo
- item title
- price or trade or free label
- neighborhood / approximate distance
- posted time
- quantity
- freshness indicator

Why this matters: users need instant browse value.

### B. Listing creation
Fields:
- produce type
- title
- photos
- quantity
- unit
- price or trade preference or free
- description
- harvest date / freshness
- pickup neighborhood
- availability window

### C. Listing detail page
- larger photos
- full description
- seller profile preview
- freshness / harvest date
- transaction type
- seller general location, not exact
- message seller CTA
- save listing CTA

### D. Messaging
Simple 1:1 chat.

Suggested prompts:
- Is this still available?
- Would you trade for herbs?
- When can I pick up?

Optional auto-close when listing is marked complete.

### E. Profile
Basic only:
- first name
- profile photo
- neighborhood
- number of listings
- join date

### F. Moderation
- report listing
- block user
- admin remove listing
- admin suspend account

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

## Primary Workflows
### Workflow 1: seller posts produce
Sign up → choose town → create listing → upload photo → set price/trade/free → publish

### Workflow 2: buyer finds produce
Open app → browse local feed → tap listing → message seller → coordinate pickup

### Workflow 3: listing completion
Seller confirms pickup/trade → marks listing complete → listing removed from active feed

## Key Screens
### A. Location onboarding
- choose Somerville or Medfield
- confirm local browsing intent

### B. Home feed
- nearby listings
- newly posted
- free produce
- available for trade
- seasonal picks

### C. Listing detail
- full produce details
- message CTA
- grower summary

### D. Create listing
- simple photo-first flow
- choose sell / trade / free
- add quantity and pickup info

### E. Inbox
- lightweight conversation threads

### F. Seller profile
- active listings
- neighborhood identity
- trust basics

### G. Admin moderation
- flagged listings queue
- flagged users queue
- remove / hide actions

## Filters for MVP
Keep it simple:
- town
- produce type
- free / sell / trade
- newest
- available now

Later:
- organic / pesticide-free
- distance
- price
- harvest date

## Data Model
### User
- user_id
- first_name
- profile_photo
- town
- neighborhood
- created_at
- status

### Listing
- listing_id
- seller_id
- town
- neighborhood
- produce_type
- title
- description
- photos
- quantity
- unit
- transaction_type
- price
- trade_interest
- harvest_date
- availability_text
- status
- created_at

### Message thread
- thread_id
- listing_id
- buyer_id
- seller_id
- messages
- created_at
- status

### Report
- report_id
- listing_id or user_id
- reporter_id
- reason
- status
- created_at

## Trust and Safety
This is one of the biggest risks.

### MVP trust measures
- approximate neighborhood, not exact address in feed
- pickup details shared only in chat
- report / block
- community guidelines
- produce-only category enforcement
- manual moderation at launch
- disclaimers around food handling and personal responsibility

### Risks
- food safety concerns
- bad actors / spam
- low-quality listings
- location privacy concerns
- weak supply at launch

## Go-to-Market for MVP
### Recommendation
This product will fail without seeded supply. Start supply-first.

### Launch motion
- recruit 25–50 initial growers across the two towns
- manually onboard them
- offer founding grower status
- post example listings to make the feed feel alive
- partner with garden clubs, local Facebook groups, schools, and neighborhood groups
- create simple referral loop: invite a grower neighbor

### Early demand channels
- local Facebook groups
- garden clubs
- community bulletin boards
- neighborhood email groups
- farmer / gardener word of mouth

## Feature Prioritization
### Must-have
- location selection
- feed
- listing creation
- listing detail
- messaging
- mark as complete
- admin moderation

### Nice-to-have
- favorites
- seller badges
- push notifications
- simple search

### Later
- payments
- map view
- reviews
- delivery coordination
- waitlists for in-demand produce
- recurring grower shops
- seasonal trends

## UX Direction
### Design reference
Use a UI pattern similar to Facebook Marketplace:
- card-based browse feed
- big photos
- minimal friction
- local context visible everywhere
- fast message CTA
- clear free / trade / sale labels

## Key Assumptions
- people are willing to exchange small amounts of produce locally
- local supply can be seeded in two towns
- users trust neighbor pickup enough for lightweight transactions
- most value comes from simple produce discovery, not full ecommerce
- trade is a meaningful differentiator vs Facebook Marketplace

## Main Risks
### Low supply density
Empty marketplace kills retention.
Mitigation: seed growers manually.

### Food safety concerns
Trust and reputation risk.
Mitigation: clear disclaimers, produce-only rules, moderation.

### Too much complexity
Slow build, weak launch.
Mitigation: keep scope tight.

### Spam / misuse
Marketplace quality drops fast.
Mitigation: manual moderation, report/block.

### Multi-town fragmentation
Weak density in each area.
Mitigation: limit to 2 towns initially.

## KPI Framework
### North star
Successful local produce exchanges per week

### Activation KPIs
- % of new users who create first listing within 7 days
- % of new users who send first message within first session
- time to first listing
- time to first message

### Marketplace KPIs
- active listings per town
- listings with at least 1 message
- message-to-exchange conversion rate
- % of listings completed
- average days to completion
- free vs sell vs trade mix

### Supply density KPIs
- weekly active sellers
- weekly active buyers
- listings per town
- repeat sellers within 30 days

### Quality KPIs
- report rate
- spam removal rate
- listing photo rate
- % listings with harvest date filled in

## MVP Success Criteria
After the first 8–12 weeks, success looks like:
- enough listings each week that the app feels alive in both towns
- at least 30–40% of listings get a message
- repeat seller behavior is visible
- buyers return weekly to browse
- moderation load is manageable

If those do not happen, the issue is likely supply density, not UI polish.

## Current Product State
What is live right now is still primarily a concept/demo shell.

What it does well:
- communicates the idea clearly
- shows the visual direction
- frames the marketplace correctly
- feels familiar to end users

What it still needs to become the real MVP:
- real listing data
- onboarding with town selection
- listing creation flow
- listing detail pages
- messaging
- saved listings
- moderation tools
- seller profiles
- mark-as-complete flow

## Recommendation on MVP Build Order
### Phase 1
- onboarding
- town selection
- browse feed
- listing creation
- listing details
- messaging
- moderation tools

### Phase 2
- favorites
- notifications
- search/filter improvements
- seller badges / repeat grower label

### Phase 3
- lightweight payments
- map view
- ratings
- expanded categories

## Launch Plan
### Week 1–2
- finalize MVP requirements
- design core flows
- set up admin tooling
- recruit first growers

### Week 3–6
- build and test MVP
- preload initial listings
- moderate beta usage manually

### Week 7–8
- soft launch in Somerville and Medfield
- recruit more growers
- collect feedback from first exchanges

## Final Recommendation
Build this as a tight local marketplace, not a broad community app.

The real challenge is supply density, not product imagination.

### Trade-offs
- narrow category = better chance of marketplace liquidity
- no payments at first = less friction to build and moderate
- two towns only = stronger early density, less empty-feed risk
- manual moderation = more work initially, but better trust

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
10. Add mark-as-complete flow

## Decision Questions To Review
1. Should free listings be as prominent as sell and trade at launch?
2. Should Medfield and Somerville share one feed or be segmented by default?
3. Do we want message requests first, or full chat immediately?
4. How much identity is required before someone can post?
5. Do we enforce photo requirement for every listing?
6. How long before stale listings auto-expire?
7. Should there be a hard cap on how far away a listing can appear in MVP?
