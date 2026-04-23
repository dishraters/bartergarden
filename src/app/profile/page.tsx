import Link from 'next/link'
import { listings, towns } from '@/lib/market-data'

const selectedTown = 'Somerville'
const visibleListings = listings.filter((listing) => listing.town === selectedTown)

const mapPins = [
  { emoji: '🍅', area: 'Union Square', top: '24%', left: '36%' },
  { emoji: '🥒', area: 'Davis Square', top: '40%', left: '58%' },
  { emoji: '🥬', area: 'Powder House', top: '18%', left: '68%' },
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
              <h1 className="mt-2 text-3xl font-bold">See what is growing nearby before you jump in.</h1>
              <p className="mt-2 max-w-2xl text-slate-600">
                This view is for people who want to get a feel for the market first. Browse produce, see rough local supply, and understand what is active in Somerville and Medfield.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {towns.map((town) => (
                <div key={town} className={`rounded-full px-4 py-2 text-sm font-semibold ${town === selectedTown ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  {town}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Map view</h2>
                <p className="text-sm text-slate-500">Approximate neighborhood view only, not exact addresses.</p>
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Emoji markers by produce type</div>
            </div>

            <div className="relative h-[440px] overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-green-50 via-lime-50 to-emerald-100">
              <div className="absolute inset-0 opacity-60">
                <div className="absolute left-[10%] top-[18%] h-24 w-40 rounded-full border border-white/60 bg-white/30" />
                <div className="absolute left-[48%] top-[14%] h-28 w-44 rounded-full border border-white/60 bg-white/30" />
                <div className="absolute left-[26%] top-[48%] h-32 w-52 rounded-full border border-white/60 bg-white/30" />
                <div className="absolute left-[58%] top-[54%] h-24 w-40 rounded-full border border-white/60 bg-white/30" />
              </div>

              <div className="absolute left-[12%] top-[10%] rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                Somerville
              </div>
              <div className="absolute right-[10%] bottom-[12%] rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                Medfield preview
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
              <h2 className="text-2xl font-bold">Nearby produce</h2>
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
              <h3 className="text-xl font-bold">Why this view works</h3>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p>It helps newcomers understand where activity is without needing exact addresses.</p>
                <p>It makes the market feel alive before people commit to buying or listing.</p>
                <p>It visually reinforces that this is local, lightweight, and neighborhood-based.</p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  )
}
