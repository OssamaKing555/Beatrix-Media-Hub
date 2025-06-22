'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { logout } from '@/lib/auth'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { name: 'Projects', href: '/admin/projects', icon: '📁' },
  { name: 'Services', href: '/admin/services', icon: '⚙️' },
  { name: 'Clients', href: '/admin/clients', icon: '👥' },
  { name: 'Settings', href: '/admin/settings', icon: '🔧' },
]

export default function Sidebar() {
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">BEATRIX ADMIN</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-800 p-4">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
        >
          <span className="mr-3 text-lg">🚪</span>
          Logout
        </button>
      </div>
    </div>
  )
} 