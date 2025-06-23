'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, User, ArrowRight, AlertTriangle } from 'lucide-react'

export default function AdminAccessPage() {
  const router = useRouter()
  const { login, user, isAuthenticated, directAdminAccess } = useAuth()

  const handleSuperAdminLogin = async () => {
    try {
      await login('admin@beatrixhub.com', 'admin123')
      router.push('/admin')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleDirectAccess = () => {
    // Use the auth store's directAdminAccess function
    directAdminAccess()
    router.push('/admin')
  }

  useEffect(() => {
    if (isAuthenticated && user?.role === 'super_admin') {
      router.push('/admin')
    }
  }, [isAuthenticated, user, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
            <CardDescription className="text-gray-300">
              Choose your method to access the Super Admin Panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 text-yellow-300">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">Quick Access</span>
              </div>
              <p className="text-xs text-yellow-200 mt-1">
                This bypasses the login system for immediate admin access
              </p>
            </div>

            <Button 
              onClick={handleDirectAccess}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              size="lg"
            >
              <User className="w-4 h-4 mr-2" />
              Direct Admin Access
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/10 px-2 text-gray-300">Or</span>
              </div>
            </div>

            <Button 
              onClick={handleSuperAdminLogin}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
              size="lg"
            >
              <Shield className="w-4 h-4 mr-2" />
              Login as Super Admin
            </Button>

            <div className="text-center">
              <Button 
                onClick={() => router.push('/')}
                variant="ghost"
                className="text-gray-400 hover:text-white"
                size="sm"
              >
                ← Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 