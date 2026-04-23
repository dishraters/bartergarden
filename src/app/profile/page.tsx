import Link from 'next/link'
import { getListingsByTown } from '@/lib/market-data'

const listings = getListingsByTown('Somerville')

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-5xl space-y-6">
        <Link href="/" className="text-sm font-medium text-green-700">← Back to feed</Link>
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">🧑‍🌾</div>
            <div>
              <h1 className="text-3xl font-bold">Maya</h1>
              <div className="text-slate-500">Union Square, Somerville</div>
              <div className="text-sm text-slate-500">Joined April 2026 · 3 listings</div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Active listings</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {listings.map((listing) => (
              <div key={listing.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="text-4xl">{listing.photos[0]}</div>
                <div className="mt-2 font-semibold">{listing.title}</div>
                <div className="text-sm text-slate-500">{listing.freshness}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
