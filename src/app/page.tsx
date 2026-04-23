import Link from 'next/link'
import type { Metadata } from 'next'
import { getListingsByTown, towns } from '@/lib/market-data'

export const metadata: Metadata = {
  title: 'BarterGarden | Hyperlocal produce marketplace',
  description:
    'A Facebook Marketplace-style app for buying, selling, and trading homegrown produce in Somerville and Medfield.',
}

const selectedTown = 'Somerville' as const
const feed = getListingsByTown(selectedTown)
const filters = ['All', 'Sell', 'Trade', 'Free', 'Newest', 'Available now']

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
              Search tomatoes, basil, cucumbers...
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-3 text-sm text-slate-600">📍 {selectedTown}</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/create" className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">+ Create listing</Link>
            <Link href="/inbox" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Inbox</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <section className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-lg font-bold">Choose your launch town</h2>
              <div className="space-y-3">
                {towns.map((town) => (
                  <div key={town} className={`rounded-2xl border p-4 ${town === selectedTown ? 'border-green-500 bg-green-50' : 'border-slate-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{town}</div>
                      {town === selectedTown ? <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">Selected</span> : null}
                    </div>
                    <p className="mt-2 text-sm text-slate-600">Only show listings from this launch zone.</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-lg font-bold">MVP screens</h3>
              <div className="grid gap-2 text-sm">
                <Link href="/" className="rounded-xl bg-slate-50 px-4 py-3 font-medium">Home feed</Link>
                <Link href="/listings/1" className="rounded-xl bg-slate-50 px-4 py-3 font-medium">Listing detail</Link>
                <Link href="/create" className="rounded-xl bg-slate-50 px-4 py-3 font-medium">Create listing</Link>
                <Link href="/inbox" className="rounded-xl bg-slate-50 px-4 py-3 font-medium">Inbox</Link>
                <Link href="/profile" className="rounded-xl bg-slate-50 px-4 py-3 font-medium">Profile</Link>
                <Link href="/admin" className="rounded-xl bg-slate-50 px-4 py-3 font-medium">Moderation</Link>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <section className="rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-lime-500 p-6 text-white shadow-sm md:p-8">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  Built from the final MVP PRD
                </div>
                <h1 className="text-3xl font-bold leading-tight md:text-5xl">
                  Browse homegrown produce nearby, message a neighbor, and arrange pickup fast.
                </h1>
                <p className="mt-4 max-w-2xl text-sm text-green-50 md:text-lg">
                  The MVP is intentionally narrow: Somerville and Medfield only, produce only, and simple sell, trade, or free exchange.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/create" className="rounded-full bg-white px-5 py-3 font-semibold text-green-700">List your harvest</Link>
                  <Link href="/inbox" className="rounded-full border border-white/40 px-5 py-3 font-semibold text-white">Open inbox</Link>
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
                {feed.map((listing) => (
                  <Link key={listing.id} href={`/listings/${listing.id}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex h-44 items-center justify-center bg-gradient-to-br from-green-100 to-lime-50 text-7xl">
                      {listing.photos[0]}
                    </div>
                    <div className="space-y-3 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-lg font-bold leading-tight">{listing.title}</div>
                          <div className="mt-1 text-base font-semibold text-slate-900">{listing.transactionType === 'sell' ? listing.price : listing.transactionType === 'trade' ? 'Trade' : 'Free'} <span className="text-sm font-medium text-slate-500">· {listing.quantity} {listing.unit}</span></div>
                        </div>
                        <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase text-green-700">
                          {listing.transactionType}
                        </div>
                      </div>
                      <div className="space-y-1 text-sm text-slate-500">
                        <div>{listing.neighborhood}, {listing.town}</div>
                        <div>{listing.freshness}</div>
                        <div>{listing.postedTime}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}
