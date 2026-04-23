import Link from 'next/link'

const threads = [
  { name: 'Maya', listing: 'Cherry tomatoes', last: 'Pickup after 5pm works for me.', active: true },
  { name: 'Owen', listing: 'Backyard cucumbers', last: 'Would you trade for basil?', active: false },
]

const prompts = ['Is this still available?', 'Would you trade for herbs?', 'When can I pick up?']

export default function InboxPage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link href="/" className="text-sm font-medium text-green-700">← Back to feed</Link>
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="rounded-3xl bg-white p-4 shadow-sm">
            <h1 className="mb-4 text-2xl font-bold">Inbox</h1>
            <div className="space-y-2">
              {threads.map((thread) => (
                <div key={thread.name} className={`rounded-2xl border p-4 ${thread.active ? 'border-green-500 bg-green-50' : 'border-slate-200'}`}>
                  <div className="font-semibold">{thread.name}</div>
                  <div className="text-sm text-slate-500">{thread.listing}</div>
                  <div className="mt-2 text-sm text-slate-600">{thread.last}</div>
                </div>
              ))}
            </div>
          </aside>

          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-bold">Maya</h2>
                <div className="text-sm text-slate-500">Cherry tomatoes · Union Square</div>
              </div>
              <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Mark listing complete</button>
            </div>

            <div className="space-y-4 py-6">
              <div className="max-w-md rounded-2xl bg-slate-100 px-4 py-3 text-sm">Hi, is this still available?</div>
              <div className="ml-auto max-w-md rounded-2xl bg-green-600 px-4 py-3 text-sm text-white">Yes, I picked it this morning. Pickup after 5pm works.</div>
              <div className="max-w-md rounded-2xl bg-slate-100 px-4 py-3 text-sm">Perfect. I can come around 6.</div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {prompts.map((prompt) => (
                <button key={prompt} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">{prompt}</button>
              ))}
            </div>

            <div className="flex gap-3">
              <input className="flex-1 rounded-xl border border-slate-200 px-4 py-3" placeholder="Type a message..." />
              <button className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white">Send</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
