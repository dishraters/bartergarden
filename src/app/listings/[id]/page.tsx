import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getListing } from '@/lib/market-data'

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = getListing(params.id)

  if (!listing) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link href="/" className="text-sm font-medium text-green-700">← Back to feed</Link>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex h-80 items-center justify-center rounded-3xl bg-gradient-to-br from-green-100 to-lime-50 text-8xl">
              {listing.photos[0]}
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{listing.title}</h1>
                  <div className="mt-2 text-lg font-semibold text-slate-900">
                    {listing.transactionType === 'sell' ? listing.price : listing.transactionType === 'trade' ? 'Trade' : 'Free'}
                    <span className="ml-2 text-base font-medium text-slate-500">· {listing.quantity} {listing.unit}</span>
                  </div>
                </div>
                <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold uppercase text-green-700">
                  {listing.transactionType}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4 text-sm"><strong>Produce:</strong> {listing.produceType}</div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm"><strong>Harvest:</strong> {listing.harvestDate}</div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm"><strong>Freshness:</strong> {listing.freshness}</div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm"><strong>Pickup:</strong> {listing.availabilityText}</div>
              </div>
              <div>
                <h2 className="text-lg font-bold">Description</h2>
                <p className="mt-2 text-slate-600">{listing.description}</p>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Seller</h2>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">{listing.sellerPhoto}</div>
                <div>
                  <div className="font-semibold">{listing.sellerName}</div>
                  <div className="text-sm text-slate-500">{listing.neighborhood}, {listing.town}</div>
                  <div className="text-sm text-slate-500">Joined {listing.sellerJoinDate}</div>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                <Link href="/inbox" className="rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white">Message seller</Link>
                <button className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">Save listing</button>
                <button className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">Report listing</button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold">Trust + privacy</h3>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p>Only approximate neighborhood is visible in the feed.</p>
                <p>Exact pickup details are shared in chat only.</p>
                <p>Manual moderation is enabled for launch.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
