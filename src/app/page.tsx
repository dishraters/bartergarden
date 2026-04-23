import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'BarterGarden | Local homegrown produce marketplace',
  description:
    'BarterGarden is a neighborhood-first marketplace for buying, selling, and trading homegrown produce nearby.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BarterGarden',
    description:
      'A location-based marketplace for homegrown produce, swaps, and neighbor-to-neighbor food discovery.',
    url: '/',
    type: 'website',
  },
}

const categories = [
  'Vegetables',
  'Fruit',
  'Herbs',
  'Eggs',
  'Seeds + Starts',
  'Trades Only',
]

const listings = [
  {
    id: 1,
    title: 'Backyard heirloom tomatoes',
    price: '$6',
    unit: 'per basket',
    location: '0.8 mi away · East Atlanta',
    seller: 'Maya',
    badge: 'Organic practices',
    image: '🍅',
    description: 'Sweet mixed-color tomatoes picked this morning. Great for salads or sauce.',
  },
  {
    id: 2,
    title: 'Meyer lemons trade',
    price: 'Trade',
    unit: 'for herbs or eggs',
    location: '1.2 mi away · Grant Park',
    seller: 'Jordan',
    badge: 'Trade-friendly',
    image: '🍋',
    description: 'Looking to swap extra lemons for fresh basil, mint, or farm eggs.',
  },
  {
    id: 3,
    title: 'Fresh cut basil bundles',
    price: '$3',
    unit: 'per bunch',
    location: '2.1 mi away · Cabbagetown',
    seller: 'Nina',
    badge: 'No spray',
    image: '🌿',
    description: 'Fragrant basil grown in raised beds. Perfect for pesto night.',
  },
  {
    id: 4,
    title: 'Rainbow Swiss chard',
    price: '$4',
    unit: 'per bunch',
    location: '2.4 mi away · Reynoldstown',
    seller: 'Luis',
    badge: 'Picked today',
    image: '🥬',
    description: 'Colorful bunches with tender leaves and stems. Limited harvest this week.',
  },
  {
    id: 5,
    title: 'Blueberries from home patch',
    price: '$8',
    unit: 'per pint',
    location: '3.0 mi away · Decatur',
    seller: 'Ava',
    badge: 'Kid-picked',
    image: '🫐',
    description: 'Fresh berries, super sweet, harvested with the family this afternoon.',
  },
  {
    id: 6,
    title: 'Cucumber + squash bundle',
    price: '$7',
    unit: 'mixed bag',
    location: '3.5 mi away · Kirkwood',
    seller: 'Ben',
    badge: 'Bundle deal',
    image: '🥒',
    description: 'Overflow from the garden this week. Best for grilling, pickling, or gifting.',
  },
]

const benefits = [
  {
    title: 'Reduce food waste',
    body: 'Extra backyard produce gets eaten instead of forgotten on the counter or composted too early.',
    icon: '♻️',
  },
  {
    title: 'Discover new foods',
    body: 'Try hyperlocal herbs, fruits, greens, and varieties you would never see in a grocery store.',
    icon: '🥕',
  },
  {
    title: 'Know your neighbors',
    body: 'Every listing is tied to a nearby community, making the app feel more like a local network than a faceless store.',
    icon: '🤝',
  },
  {
    title: 'Reconnect with nature',
    body: 'People learn what is growing around them, what is in season, and how food changes across neighborhoods.',
    icon: '🌎',
  },
]

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'BarterGarden',
    applicationCategory: 'ShoppingApplication',
    operatingSystem: 'Web',
    description:
      'BarterGarden is a location-based marketplace where neighbors buy, sell, and trade homegrown produce.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-2xl text-white">🥕</div>
            <div>
              <div className="text-xl font-bold tracking-tight text-green-700">BarterGarden</div>
              <div className="text-xs text-slate-500">Homegrown produce marketplace</div>
            </div>
          </div>

          <div className="hidden flex-1 items-center gap-3 md:flex">
            <div className="flex-1 rounded-full bg-slate-100 px-4 py-3 text-sm text-slate-500">
              Search tomatoes, herbs, eggs, seedlings...
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-3 text-sm text-slate-600">📍 Near Atlanta, GA</div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">+ Sell or Trade</button>
            <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Profile</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <section className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-lg font-bold">Browse nearby</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-green-50 hover:text-green-700"
                  >
                    <span>{category}</span>
                    <span>›</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-lg font-bold">Your area</h3>
              <div className="rounded-2xl bg-gradient-to-br from-green-100 to-lime-100 p-4">
                <p className="text-sm font-semibold text-green-800">East Atlanta radius</p>
                <p className="mt-1 text-sm text-green-900">Showing produce and swaps within 5 miles of your location.</p>
                <button className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm">Adjust radius</button>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-lg font-bold">Why it works</h3>
              <div className="space-y-3 text-sm text-slate-600">
                <p>People can sell surplus harvest.</p>
                <p>Neighbors can trade instead of waste.</p>
                <p>The whole experience is built around real local growing seasons.</p>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <section className="rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-lime-500 p-6 text-white shadow-sm md:p-8">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  Facebook Marketplace style, but for gardens
                </div>
                <h1 className="text-3xl font-bold leading-tight md:text-5xl">
                  Buy, sell, or trade homegrown produce with people near you.
                </h1>
                <p className="mt-4 max-w-2xl text-sm text-green-50 md:text-lg">
                  BarterGarden helps neighbors share the food they actually grow, from tomatoes and herbs to eggs, lemons, peppers, and seedlings. It reduces waste, creates local connection, and makes seasonal food feel personal again.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="rounded-full bg-white px-5 py-3 font-semibold text-green-700">Start browsing</button>
                  <button className="rounded-full border border-white/40 px-5 py-3 font-semibold text-white">List your harvest</button>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="mb-4 flex flex-wrap gap-2">
                {['All', 'Under 1 mile', 'Trade only', 'Picked today', 'Organic practices', 'Family gardens'].map((chip) => (
                  <button
                    key={chip}
                    className={`rounded-full px-4 py-2 text-sm font-medium ${chip === 'All' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {listings.map((listing) => (
                  <article key={listing.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex h-44 items-center justify-center bg-gradient-to-br from-green-100 to-lime-50 text-7xl">
                      {listing.image}
                    </div>
                    <div className="space-y-3 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-lg font-bold leading-tight">{listing.title}</div>
                          <div className="mt-1 text-base font-semibold text-slate-900">{listing.price} <span className="text-sm font-medium text-slate-500">{listing.unit}</span></div>
                        </div>
                        <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          {listing.badge}
                        </div>
                      </div>

                      <p className="text-sm text-slate-600">{listing.description}</p>

                      <div className="space-y-1 text-sm text-slate-500">
                        <div>{listing.location}</div>
                        <div>Seller: {listing.seller}</div>
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

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="mb-3 text-3xl">{benefit.icon}</div>
                  <h3 className="mb-2 text-lg font-bold">{benefit.title}</h3>
                  <p className="text-sm text-slate-600">{benefit.body}</p>
                </div>
              ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold">How the product works</h3>
                <div className="mt-4 space-y-4 text-sm text-slate-600">
                  <div>
                    <div className="font-semibold text-slate-900">1. Location-first feed</div>
                    <p>Users land on listings closest to them, making pickups easy and keeping the marketplace neighborhood-shaped.</p>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">2. Sell or trade flows</div>
                    <p>Every listing can be priced in dollars or marked as trade-only for swaps like lemons for basil or eggs for cucumbers.</p>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">3. Trust through grower profiles</div>
                    <p>Profiles show what people grow, their gardening style, pickup area, and seasonal history.</p>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">4. Nature education built in</div>
                    <p>Listings can surface harvest notes, growing methods, and in-season tips so the app teaches while it transacts.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold">Core MVP screens</h3>
                <div className="mt-4 grid gap-3 text-sm text-slate-700">
                  {[
                    'Marketplace feed with cards and distance labels',
                    'Create listing flow for sell or trade',
                    'Map and radius picker for local browsing',
                    'Grower profile with badges and pickup preferences',
                    'Messaging for pickup coordination',
                    'Saved listings and seasonal alerts',
                  ].map((item) => (
                    <div key={item} className="rounded-xl bg-slate-50 px-4 py-3">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <h3 className="text-3xl font-bold">This feels like Facebook Marketplace, but more local, more human, and built for food.</h3>
                  <p className="mt-3 text-slate-600">
                    The interface uses a familiar card-based browsing experience, but the product loop is centered on neighborhood harvests, trades, seasonality, and community trust.
                  </p>
                </div>
                <div className="rounded-2xl bg-green-50 p-5 text-sm text-green-900">
                  <div className="font-bold">Best launch wedge</div>
                  <div className="mt-2">Start with one city, tight pickup radiuses, and a simple seller onboarding flow focused on gardeners with surplus produce.</div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}
