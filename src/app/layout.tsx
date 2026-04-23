import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://bartergarden.vercel.app'),
  title: {
    default: 'BarterGarden | Local homegrown produce marketplace',
    template: '%s | BarterGarden',
  },
  description:
    'BarterGarden is a neighborhood-first marketplace for buying, selling, and trading homegrown produce nearby.',
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'BarterGarden',
    description:
      'Buy, sell, and trade homegrown produce with neighbors nearby through a location-based marketplace.',
    url: 'https://bartergarden.vercel.app',
    siteName: 'BarterGarden',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BarterGarden',
    description:
      'A Facebook Marketplace style app for local homegrown produce and garden swaps.',
  },
  appleWebApp: {
    capable: true,
    title: 'BarterGarden',
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
