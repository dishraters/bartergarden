import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BarterGarden',
    short_name: 'BarterGarden',
    description: 'A neighborhood-first marketplace for selling and trading homegrown produce.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0fdf4',
    theme_color: '#2f855a',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
