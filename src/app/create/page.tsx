import Link from 'next/link'

const modeNotes = [
  { label: 'Sell', body: 'Set a simple price for your extra produce.' },
  { label: 'Trade', body: 'Say what you would trade for, like herbs or tomatoes.' },
  { label: 'Free', body: 'Offer produce for porch pickup or neighbor pickup.' },
]

export default function CreateListingPage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-6">
        <Link href="/" className="text-sm font-medium text-green-700">← Back to welcome</Link>
        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Create listing</h1>
            <p className="mt-2 text-slate-600">Post extra produce quickly so neighbors can claim it while it is still fresh.</p>
          </div>

          <div className="grid gap-6">
            <div className="rounded-2xl bg-slate-50 p-5">
              <h2 className="text-lg font-bold">1. What are you listing?</h2>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Produce type
                  <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="Tomatoes" />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Listing title
                  <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="Cherry tomatoes" />
                </label>
                <label className="grid gap-2 text-sm font-medium md:col-span-2">
                  Photos
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
                    Upload clear produce photos
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
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <h2 className="text-lg font-bold">2. How do you want to share it?</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {modeNotes.map((mode, index) => (
                  <div key={mode.label} className={`rounded-2xl border p-4 ${index === 0 ? 'border-green-500 bg-white' : 'border-slate-200 bg-white'}`}>
                    <div className="font-semibold">{mode.label}</div>
                    <div className="mt-2 text-sm text-slate-600">{mode.body}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Transaction type
                  <select className="rounded-xl border border-slate-200 px-4 py-3">
                    <option>Sell</option>
                    <option>Trade</option>
                    <option>Free</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Price or trade preference
                  <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="If selling: $4 · If trading: basil or cucumbers · If free: leave blank" />
                </label>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <h2 className="text-lg font-bold">3. Pickup and freshness</h2>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
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
                  <textarea className="min-h-32 rounded-xl border border-slate-200 px-4 py-3" placeholder="Sweet cherry tomatoes from raised beds, best for salads or snacking..." />
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white">Publish produce listing</button>
            <button className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700">Save draft</button>
          </div>
        </section>
      </div>
    </div>
  )
}
