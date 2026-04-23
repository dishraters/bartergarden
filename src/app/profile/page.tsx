import Link from 'next/link'
import { listings } from '@/lib/market-data'

const visibleListings = listings

const mapPins = [
  { emoji: '🍅', area: 'Green Street area', top: '24%', left: '36%' },
  { emoji: '🌿', area: 'North Meadows', top: '42%', left: '60%' },
  { emoji: '🥒', area: 'Causeway Street area', top: '62%', left: '48%' },
  { emoji: '🥬', area: 'Main Street side', top: '34%', left: '72%' },
]

export default function BrowseFirstPage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link href="/" className="text-sm font-medium text-green-700">← Back to welcome</Link>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-green-700">Browse first</div>
              <h1 className="mt-2 text-3xl font-bold">See what Medfield Garden Club members are sharing right now.</h1>
              <p className="mt-2 max-w-2xl text-slate-600">
                This preview is designed for club members who want to get comfortable first. You can see what is available, where activity is clustered, and how simple the pickup flow feels.
              </p>
            </div>
            <div className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">Medfield only</div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Map view</h2>
                <p className="text-sm text-slate-500">Approximate neighborhood view only, never exact addresses.</p>
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Produce markers by emoji</div>
            </div>

            <div className="relative h-[440px] overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-green-50 via-lime-50 to-emerald-100">
              <div className="absolute inset-0 opacity-60">
                <div className="absolute left-[14%] top-[16%] h-24 w-40 rounded-full border border-white/60 bg-white/30" />
                <div className="absolute left-[48%] top-[20%] h-28 w-44 rounded-full border border-white/60 bg-white/30" />
                <div className="absolute left-[22%] top-[52%] h-32 w-52 rounded-full border border-white/60 bg-white/30" />
                <div className="absolute left-[58%] top-[56%] h-24 w-40 rounded-full border border-white/60 bg-white/30" />
              </div>

              <div className="absolute left-[10%] top-[10%] rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                Medfield Garden Club area
              </div>

              {mapPins.map((pin) => (
                <div
                  key={pin.area}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  style={{ top: pin.top, left: pin.left }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-green-600 text-2xl shadow-lg">
                    {pin.emoji}
                  </div>
                  <div className="mt-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                    {pin.area}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Active club listings</h2>
              <div className="mt-4 grid gap-3">
                {visibleListings.map((listing) => (
                  <Link key={listing.id} href={`/listings/${listing.id}`} className="rounded-2xl border border-slate-200 p-4 transition hover:border-green-300 hover:bg-green-50/40">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{listing.photos[0]}</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="font-semibold">{listing.title}</div>
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium uppercase text-slate-600">
                            {listing.transactionType}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-slate-500">{listing.neighborhood} · {listing.postedTime}</div>
                        <div className="mt-2 text-sm text-slate-600">{listing.freshness}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">Why this works for the club</h3>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p>It gives members a friendly first look without needing to post right away.</p>
                <p>It keeps the community feeling local, lightweight, and easy to trust.</p>
                <p>It helps make the market feel active before the club builds repeat listing habits.</p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  )
}
