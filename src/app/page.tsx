'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useAuth } from '@/lib/auth-context'

const heroImages = [
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1600&q=80',
]

const choices = [
  {
    title: 'Share what you grew',
    body: 'Post extra produce from your garden so other Medfield Garden Club members can claim it.',
    href: '/create',
    cta: 'Post produce',
  },
  {
    title: 'Find produce nearby',
    body: 'Browse what other club members have harvested and message them directly.',
    href: '/listings/1',
    cta: 'Browse produce',
  },
  {
    title: 'Browse first',
    body: 'Look around the club market, see what is active, and get familiar before posting.',
    href: '/profile',
    cta: 'Preview the market',
  },
]

const trustItems = [
  'Medfield Garden Club only',
  'Approximate neighborhood only',
  'Exact pickup shared in chat',
]

export default function Home() {
  const { signInWithGoogle, user, loading } = useAuth()
  const [authMessage, setAuthMessage] = useState<string>('')

  const firebaseConfigured = useMemo(() => {
    return Boolean(
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    )
  }, [])

  const handleGoogleSignIn = async () => {
    if (!firebaseConfigured) {
      setAuthMessage('Google sign-in is not configured in production yet. Firebase keys still need to be added in Vercel.')
      return
    }

    const result = await signInWithGoogle()
    if (result.error) {
      setAuthMessage(result.error.message)
      return
    }
    setAuthMessage('Signed in successfully.')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 bg-cover bg-center opacity-0 animate-[fadeHero_24s_infinite]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.58), rgba(0,0,0,0.72)), url(${image})`,
              animationDelay: `${index * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <div className="text-2xl font-bold tracking-tight text-white">🌿 Medfield Garden Club Market</div>
            <div className="text-sm text-white/80">A simple produce-sharing market for club members</div>
          </div>
          <div className="flex gap-3">
            {user ? (
              <div className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                {user.displayName || user.email}
              </div>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-70"
              >
                {loading ? 'Loading...' : 'Sign in with Google'}
              </button>
            )}
          </div>
        </header>

        <main className="flex flex-1 items-center py-10">
          <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <section className="max-w-2xl space-y-6">
              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                Built for the Medfield Garden Club
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                  Share extra homegrown produce with fellow Medfield Garden Club members.
                </h1>
                <p className="max-w-xl text-lg text-white/85 md:text-xl">
                  Start with a simple, trusted flow for the club: post your harvest, browse what others have, and coordinate pickup through chat.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-white/90 backdrop-blur-sm">
                {trustItems.map((item) => (
                  <div key={item} className="rounded-full bg-white/10 px-4 py-2">
                    {item}
                  </div>
                ))}
              </div>
              {!firebaseConfigured ? (
                <div className="rounded-2xl border border-amber-300/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                  Google sign-in still needs Firebase production keys in Vercel before members can log in.
                </div>
              ) : null}
              {authMessage ? <div className="text-sm text-white/85">{authMessage}</div> : null}
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
