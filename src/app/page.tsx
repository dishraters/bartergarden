import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BarterGarden | Hyperlocal produce marketplace',
  description:
    'A Facebook Marketplace-style app for buying, selling, and trading homegrown produce in Somerville and Medfield.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BarterGarden',
    description:
      'Hyperlocal homegrown produce marketplace for Somerville and Medfield.',
    url: '/',
    type: 'website',
  },
}

const launchAreas = [
  {
    name: 'Somerville',
    status: 'Launch market',
    blurb: 'Dense neighborhood supply, easy pickups, fast feedback loop.',
  },
  {
    name: 'Medfield',
    status: 'Launch market',
    blurb: 'Strong family gardening culture and surplus sharing potential.',
  },
]

const filters = ['All', 'Sell', 'Trade', 'Free', 'Picked today', 'Under 2 miles']

const listings = [
  {
    id: 1,
    emoji: '🍅',
    title: 'Heirloom tomatoes',
    mode: 'Sell',
    price: '$5',
    unit: 'basket',
    area: '0.7 mi · Somerville',
    freshness: 'Picked this morning',
    grower: 'Maya R.',
    note: 'Mixed colors, very ripe, salad-ready.',
  },
  {
    id: 2,
    emoji: '🥒',
    title: 'Cucumber overflow',
    mode: 'Trade',
    price: 'Trade',
    unit: 'for herbs',
    area: '1.1 mi · Somerville',
    freshness: 'Harvested today',
    grower: 'Owen T.',
    note: 'Would swap for basil, mint, or hot peppers.',
  },
  {
    id: 3,
    emoji: '🌿',
    title: 'Fresh basil bunches',
    mode: 'Sell',
    price: '$3',
    unit: 'bundle',
    area: '1.8 mi · Medfield',
    freshness: 'No spray',
    grower: 'Priya S.',
    note: 'Great for pesto, pasta, or freezing.',
  },
  {
    id: 4,
    emoji: '🥬',
    title: 'Rainbow chard',
    mode: 'Free',
    price: 'Free',
    unit: 'porch pickup',
    area: '2.2 mi · Medfield',
    freshness: 'Best tonight',
    grower: 'Lena K.',
    note: 'Extra bunch from tonight’s harvest, first come first served.',
  },
]

const userStories = {
  sellers: [
    'Post extra produce in under 2 minutes',
    'Choose sell, trade, or free',
    'Set pickup area and availability',
    'Mark listings gone so the feed stays current',
  ],
  buyers: [
    'Browse produce near me first',
    'Filter by produce type and exchange type',
    'Message a grower to coordinate pickup',
    'Save listings to revisit later',
  ],
  admins: [
    'Review flagged listings and users',
    'Keep activity constrained to launch geographies',
  ],
}

const roadmap = [
  {
    title: 'Must ship in MVP',
    items: [
      'Onboarding with location selection',
      'Somerville + Medfield local feed',
      'Listing creation flow',
      'Sell / Trade / Free listing types',
      'Listing detail page',
      'In-app messaging',
      'Saved listings',
      'Basic seller profiles',
      'Reporting and moderation queue',
    ],
  },
  {
    title: 'Explicitly out of scope',
    items: [
      'In-app payments',
      'Delivery logistics',
      'Shipping',
      'Dynamic maps',
      'Advanced ranking',
      'Full reputation system',
      'Multi-city expansion at launch',
    ],
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-2xl text-white">🥕</div>
            <div>
              <div className="text-xl font-bold tracking-tight text-green-700">BarterGarden</div>
              <div className="text-xs text-slate-500">Hyperlocal produce marketplace</div>
            </div>
          </div>
          <div className="hidden flex-1 items-center gap-3 md:flex">
            <div className="flex-1 rounded-full bg-slate-100 px-4 py-3 text-sm text-slate-500">
              Search tomatoes, cucumbers, basil...
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-3 text-sm text-slate-600">📍 Somerville + Medfield only</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">+ Create listing</button>
            <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Inbox</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <section className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-lg font-bold">Launch communities</h2>
              <div className="space-y-3">
                {launchAreas.map((area) => (
                  <div key={area.name} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold">{area.name}</div>
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">{area.status}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{area.blurb}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-lg font-bold">Product thesis</h3>
              <div className="space-y-3 text-sm text-slate-600">
                <p>We are not building a broad local marketplace.</p>
                <p>We are building a narrow produce marketplace wedge with strong local density.</p>
                <p>That means homegrown produce first, two geographies first, simple chat first.</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-lg font-bold">What stays out</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div>No delivery</div>
                <div>No payments complexity</div>
                <div>No maps on day one</div>
                <div>No broad category sprawl</div>
                <div>No heavy reputation layer</div>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <section className="rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-lime-500 p-6 text-white shadow-sm md:p-8">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  Product direction updated
                </div>
                <h1 className="text-3xl font-bold leading-tight md:text-5xl">
                  A Facebook Marketplace-style feed for homegrown produce in Somerville and Medfield.
                </h1>
                <p className="mt-4 max-w-2xl text-sm text-green-50 md:text-lg">
                  The wedge is tight on purpose: neighbors can buy, trade, or claim extra produce nearby before it goes to waste. We keep the mental model familiar, the geography narrow, and the product simple enough to actually ship.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="rounded-full bg-white px-5 py-3 font-semibold text-green-700">Browse nearby produce</button>
                  <button className="rounded-full border border-white/40 px-5 py-3 font-semibold text-white">List your harvest</button>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="mb-4 flex flex-wrap gap-2">
                {filters.map((chip, index) => (
                  <button
                    key={chip}
                    className={`rounded-full px-4 py-2 text-sm font-medium ${index === 0 ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                {listings.map((listing) => (
                  <article key={listing.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex h-44 items-center justify-center bg-gradient-to-br from-green-100 to-lime-50 text-7xl">
                      {listing.emoji}
                    </div>
                    <div className="space-y-3 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-lg font-bold leading-tight">{listing.title}</div>
                          <div className="mt-1 text-base font-semibold text-slate-900">{listing.price} <span className="text-sm font-medium text-slate-500">{listing.unit}</span></div>
                        </div>
                        <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          {listing.mode}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">{listing.note}</p>
                      <div className="space-y-1 text-sm text-slate-500">
                        <div>{listing.area}</div>
                        <div>{listing.freshness}</div>
                        <div>Grower: {listing.grower}</div>
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button className="flex-1 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white">Message</button>
                        <button className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700">Save</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold">Refined MVP scope</h3>
                <div className="mt-4 space-y-6">
                  {roadmap.map((section) => (
                    <div key={section.title}>
                      <div className="mb-3 text-lg font-semibold">{section.title}</div>
                      <div className="grid gap-2 text-sm text-slate-700">
                        {section.items.map((item) => (
                          <div key={item} className="rounded-xl bg-slate-50 px-4 py-3">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold">User stories that matter first</h3>
                <div className="mt-4 space-y-5 text-sm text-slate-700">
                  <div>
                    <div className="mb-2 font-semibold text-slate-900">Seller</div>
                    <div className="grid gap-2">
                      {userStories.sellers.map((story) => (
                        <div key={story} className="rounded-xl bg-slate-50 px-4 py-3">{story}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 font-semibold text-slate-900">Buyer / Trader</div>
                    <div className="grid gap-2">
                      {userStories.buyers.map((story) => (
                        <div key={story} className="rounded-xl bg-slate-50 px-4 py-3">{story}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 font-semibold text-slate-900">Admin</div>
                    <div className="grid gap-2">
                      {userStories.admins.map((story) => (
                        <div key={story} className="rounded-xl bg-slate-50 px-4 py-3">{story}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="max-w-3xl">
                  <h3 className="text-3xl font-bold">What changed from the original concept</h3>
                  <div className="mt-4 space-y-3 text-slate-600">
                    <p>We narrowed the launch to two communities instead of a broad citywide concept.</p>
                    <p>We tightened the category to homegrown produce only instead of letting the marketplace sprawl.</p>
                    <p>We kept sell, trade, and free, but removed operational complexity like payments and delivery.</p>
                    <p>We added moderation and flagging because hyperlocal trust matters even in an early MVP.</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-green-50 p-5 text-sm text-green-900 md:max-w-sm">
                  <div className="font-bold">Recommended next build step</div>
                  <div className="mt-2">Turn this live concept page into a real data-backed feed with location onboarding, listing creation, detail pages, and messaging. Keep the geography locked to Somerville and Medfield until supply is dense.</div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}
