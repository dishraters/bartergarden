# BarterGarden Final MVP PRD

## 1. Product Summary
**Working name:** BarterGarden  
**One-line concept:** A location-based marketplace where neighbors can sell, trade, or give away extra homegrown produce.  
**Core value:** Reduce food waste, help people discover fresh local food, and create stronger neighborhood connection.

## 2. Final Recommendation
Build a **hyperlocal produce marketplace MVP** focused on **buy, sell, and trade homegrown produce** within **two seed communities: Somerville and Medfield**.

The MVP should copy the mental model of **Facebook Marketplace**:
- location-first discovery
- simple listing cards
- lightweight chat
- trust cues

The wedge is **not** “all local goods.”  
It is specifically **homegrown produce and garden surplus**.

### Start with
- 2 launch areas: **Somerville** and **Medfield**
- 1 narrow category: **homegrown produce only**
- 3 core transaction types: **sell, trade, free**
- 1 core UX pattern: **Facebook Marketplace-style local feed with cards and chat**

### Do not launch with
- delivery logistics
- payments complexity
- broad farmers market inventory
- reviews/reputation systems beyond basic trust signals
- many categories like eggs, baked goods, plants, crafts, etc.

That is how this stays simple and actually ships.

## 3. Problem
### Users
- backyard gardeners
- hobby growers
- families with extra produce
- neighbors who want fresh local produce
- people interested in trying unusual homegrown foods

### Problem
Growers often have surplus produce they do not use. Neighbors nearby would take it, buy it, or trade for it, but discovery is fragmented and inconsistent.

### Current alternatives
- Facebook Marketplace
- local Facebook groups
- text groups
- Nextdoor
- giving it away informally

### Why those are weak
- not designed for produce
- poor trust and freshness signals
- cluttered with unrelated items
- weak local food discovery
- no simple trade flow

## 4. Goal
Create the fastest, simplest way for a neighbor to:
- list extra produce
- discover nearby produce
- message another neighbor
- arrange pickup or trade

## 5. Success Hypothesis
If we make local produce discovery feel as easy as Facebook Marketplace, growers will list surplus instead of wasting it, and neighbors will engage because the supply is fresh, nearby, and unique.

## 6. MVP Scope
### In scope
- onboarding with location selection
- location-based feed for **Somerville** and **Medfield**
- listing creation
- listing types: **sell, trade, free**
- item cards with photo, title, distance/neighborhood, freshness, quantity
- product detail page
- in-app messaging
- save/favorite listings
- basic seller profile
- reporting / flagging
- admin moderation dashboard
- pickup coordination by chat
- seller marks listing complete

### Out of scope
- in-app payments
- delivery
- shipping
- dynamic maps
- advanced search ranking
- full reputation system
- subscriptions
- gardener verification
- escrow
- multi-city launch beyond first two markets

## 7. MVP User Stories
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

## 8. Core Features
### A. Location-based home feed
Facebook Marketplace-style card feed:
- photo
- item title
- price or “trade” or “free”
- neighborhood / approximate distance
- posted time
- quantity
- freshness indicator

**Why this matters:** users need instant browse value.

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
- “Is this still available?”
- “Would you trade for herbs?”
- “When can I pick up?”

Optional auto-close when listing marked complete.

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

## 9. Product Principles
- Location first
- Freshness matters
- Fast listing creation wins
- Supply density matters more than feature depth
- Trust must be lightweight but visible
- Keep the marketplace narrow early

## 10. Initial Geography Strategy
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

Only show listings within selected launch zone at first.

## 11. Primary Workflows
### Workflow 1: seller posts produce
Sign up → choose town → create listing → upload photo → set price/trade/free → publish

### Workflow 2: buyer finds produce
Open app → browse local feed → tap listing → message seller → coordinate pickup

### Workflow 3: listing completion
Seller confirms pickup/trade → marks listing complete → listing removed from active feed

## 12. Data Model
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

## 13. Filters for MVP
Keep it simple:
- town
- produce type
- free / sell / trade
- newest
- available now

### Later
- organic / pesticide-free
- distance
- price
- harvest date

## 14. Trust and Safety
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

## 15. KPI Framework
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

## 16. MVP Success Criteria
After first 8–12 weeks, success looks like:
- enough listings each week that the app feels alive in both towns
- at least 30–40% of listings get a message
- repeat seller behavior is visible
- buyers return weekly to browse
- moderation load is manageable

If those do not happen, the issue is likely supply density, not UI polish.

## 17. Go-to-Market for MVP
### Recommendation
This product will fail without seeded supply. Start supply-first.

### Launch motion
- recruit 25–50 initial growers across the two towns
- manually onboard them
- offer “founding grower” status
- post example listings to make the feed feel alive
- partner with garden clubs, local Facebook groups, schools, and neighborhood groups
- create simple referral loop: invite a grower neighbor

### Early demand channels
- local Facebook groups
- garden clubs
- community bulletin boards
- neighborhood email groups
- farmer/gardener word of mouth

## 18. Feature Prioritization
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

## 19. UX Direction
### Design reference
Use a UI pattern similar to Facebook Marketplace:
- card-based browse feed
- big photos
- minimal friction
- local context visible everywhere
- fast message CTA
- clear free/trade/sale labels

### Home screen sections
- nearby listings
- newly posted
- free produce
- available for trade
- seasonal picks

### Listing card example
- photo
- “Cherry Tomatoes”
- “Trade” or “$4”
- “Medfield”
- “Harvested today”
- neighborhood approximation or simple local context

## 20. Key Assumptions
- people are willing to exchange small amounts of produce locally
- local supply can be seeded in two towns
- users trust neighbor pickup enough for lightweight transactions
- most value comes from simple produce discovery, not full ecommerce
- trade is a meaningful differentiator vs Facebook Marketplace

## 21. Main Risks
### Low supply density
**Why it matters:** empty marketplace kills retention  
**Mitigation:** seed growers manually

### Food safety concerns
**Why it matters:** trust / reputation risk  
**Mitigation:** clear disclaimers, produce-only rules, moderation

### Too much complexity
**Why it matters:** slow build, weak launch  
**Mitigation:** keep scope tight

### Spam / misuse
**Why it matters:** marketplace quality drops fast  
**Mitigation:** manual moderation, report/block

### Multi-town fragmentation
**Why it matters:** weak density in each area  
**Mitigation:** limit to 2 towns initially

## 22. Recommendation on MVP Build Order
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

## 23. Launch Plan
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

## 24. Final Positioning
A local marketplace for homegrown produce, built to help neighbors sell, trade, and discover fresh food nearby.

## 25. Final MVP Definition
A Facebook Marketplace-style local feed for homegrown produce in Somerville and Medfield, where users can create listings, browse nearby produce, message neighbors, and arrange pickup for sale, trade, or free exchange.

## 26. Final Recommendation
Build this as a tight local marketplace, not a broad community app.

Your real challenge is **supply density**, not product imagination.

### Trade-offs
- narrow category = better chance of marketplace liquidity
- no payments at first = less friction to build and moderate
- two towns only = stronger early density, less empty-feed risk
- manual moderation = more work initially, but better trust

## 27. Immediate Next Steps
- lock the MVP scope above
- define the first 5 screens
- create wireframes based on Facebook Marketplace patterns
- recruit first 25–50 growers before launch
- measure listing density and message rate weekly
