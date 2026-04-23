'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/garden', icon: '🌱', label: 'Garden' },
  { href: '/garden/gratitude', icon: '🙏', label: 'Gratitude' },
  { href: '/garden/planning', icon: '📋', label: 'Planning' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-100 pb-safe">
      <div className="flex justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href === '/garden' && pathname === '/garden')
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center py-3 px-4 transition-colors ${
                isActive ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="text-xs mt-1">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
