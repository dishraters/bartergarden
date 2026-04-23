import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'

export const metadata: Metadata = {
  metadataBase: new URL('https://bartergarden.vercel.app'),
  title: {
    default: 'Medfield Garden Club Market',
    template: '%s | Medfield Garden Club Market',
  },
  description:
    'A simple private-first marketplace for Medfield Garden Club members to share extra homegrown produce.',
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Medfield Garden Club Market',
    description:
      'Share extra homegrown produce with fellow Medfield Garden Club members.',
    url: 'https://bartergarden.vercel.app',
    siteName: 'Medfield Garden Club Market',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medfield Garden Club Market',
    description:
      'A simple produce-sharing marketplace for the Medfield Garden Club.',
  },
  appleWebApp: {
    capable: true,
    title: 'Garden Club Market',
    statusBarStyle: 'default',
  },
}

export const viewport: Viewport = {
  themeColor: '#2f855a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
