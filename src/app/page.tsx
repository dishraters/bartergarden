import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BarterGarden | Welcome',
  description:
    'A community-first marketplace for sharing extra homegrown produce in Somerville and Medfield.',
}

const heroImages = [
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1600&q=80',
]

const choices = [
  {
    title: 'Sell your produce',
    body: 'Post extra harvest from your garden and connect with nearby neighbors who will use it.',
    href: '/create',
    cta: 'Start selling',
  },
  {
    title: 'Buy produce',
    body: 'Browse homegrown produce from local growers in Somerville and Medfield.',
    href: '/listings/1',
    cta: 'Start browsing',
  },
  {
    title: 'Browse first',
    body: 'Take a look around the market and see what is growing nearby before you jump in.',
    href: '/profile',
    cta: 'Explore the market',
  },
]

const trustItems = [
  'Approximate neighborhood only',
  'Exact pickup shared in chat',
  'Manual moderation at launch',
]

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 bg-cover bg-center opacity-0 animate-[fadeHero_24s_infinite]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.56), rgba(0,0,0,0.70)), url(${image})`,
              animationDelay: `${index * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <div className="text-2xl font-bold tracking-tight text-white">🥕 BarterGarden</div>
            <div className="text-sm text-white/80">Homegrown produce marketplace</div>
          </div>
          <div className="flex gap-3">
            <button className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white">Log in</button>
            <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">Create account</button>
          </div>
        </header>

        <main className="flex flex-1 items-center py-10">
          <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <section className="max-w-2xl space-y-6">
              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                Somerville + Medfield only
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                  Share extra homegrown produce with neighbors in Somerville and Medfield.
                </h1>
                <p className="max-w-xl text-lg text-white/85 md:text-xl">
                  A simple local market for fresh backyard harvests, neighbor-to-neighbor pickup, and less food going to waste.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-white/90 backdrop-blur-sm">
                {trustItems.map((item) => (
                  <div key={item} className="rounded-full bg-white/10 px-4 py-2">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-4">
              {choices.map((choice) => (
                <Link
                  key={choice.title}
                  href={choice.href}
                  className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md transition hover:border-white/30 hover:bg-white/15"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">{choice.title}</h2>
                      <p className="mt-2 max-w-md text-sm leading-6 text-white/80">{choice.body}</p>
                    </div>
                    <div className="text-2xl text-white/80">→</div>
                  </div>
                  <div className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                    {choice.cta}
                  </div>
                </Link>
              ))}
            </section>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes fadeHero {
          0% { opacity: 0; }
          8% { opacity: 1; }
          25% { opacity: 1; }
          33% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
