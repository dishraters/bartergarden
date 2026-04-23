import Link from 'next/link'

export default function CreateListingPage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-6">
        <Link href="/" className="text-sm font-medium text-green-700">← Back to feed</Link>
        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h1 className="text-3xl font-bold">Create listing</h1>
          <p className="mt-2 text-slate-600">Designed to let a grower post extra produce in under 2 minutes.</p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium">
              Produce type
              <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="Tomatoes" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Title
              <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="Cherry tomatoes" />
            </label>
            <label className="grid gap-2 text-sm font-medium md:col-span-2">
              Photos
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                Upload produce photos
              </div>
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Quantity
              <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="2" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Unit
              <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="pints" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Transaction type
              <select className="rounded-xl border border-slate-200 px-4 py-3">
                <option>Sell</option>
                <option>Trade</option>
                <option>Free</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Price or trade interest
              <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="$4 or basil" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Harvest date / freshness
              <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="Harvested today" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Pickup neighborhood
              <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="Union Square" />
            </label>
            <label className="grid gap-2 text-sm font-medium md:col-span-2">
              Availability window
              <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="Tonight after 5pm" />
            </label>
            <label className="grid gap-2 text-sm font-medium md:col-span-2">
              Description
              <textarea className="min-h-32 rounded-xl border border-slate-200 px-4 py-3" placeholder="Sweet cherry tomatoes from raised beds..." />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white">Publish listing</button>
            <button className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">Save draft</button>
          </div>
        </section>
      </div>
    </div>
  )
}
