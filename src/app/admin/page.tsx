import Link from 'next/link'

const reports = [
  { target: 'Cherry tomatoes listing', reason: 'Wrong category', status: 'Open' },
  { target: 'User: demo_seller_12', reason: 'Spam behavior', status: 'Reviewing' },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-5xl space-y-6">
        <Link href="/" className="text-sm font-medium text-green-700">← Back to feed</Link>
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold">Moderation dashboard</h1>
          <p className="mt-2 text-slate-600">Manual moderation keeps the launch community clean and produce-focused.</p>
          <div className="mt-6 grid gap-4">
            {reports.map((report) => (
              <div key={report.target} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold">{report.target}</div>
                    <div className="text-sm text-slate-500">Reason: {report.reason}</div>
                    <div className="text-sm text-slate-500">Status: {report.status}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Remove listing</button>
                    <button className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white">Suspend account</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
