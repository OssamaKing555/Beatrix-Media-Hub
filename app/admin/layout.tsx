'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import Sidebar from '@/components/layout/Sidebar'
import AdminHeader from '@/components/layout/AdminHeader'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated()) {
        setAuthenticated(true)
      } else {
        router.push('/login')
      }
      setLoading(false)
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <AdminHeader />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
} 