'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, User, ArrowRight, CheckCircle, Crown } from 'lucide-react'

export default function AdminBypassPage() {
  const router = useRouter()
  const { directAdminAccess, user, isAuthenticated } = useAuth()

  const setBypassCookie = () => {
    // Set the bypass cookie that middleware expects
    document.cookie = 'admin-bypass=true; path=/; max-age=3600; SameSite=Lax'
    
    // Also set auth token cookie for compatibility
    document.cookie = 'auth-token=bypass-token; path=/; max-age=3600; SameSite=Lax'
  }

  const handleBypass = () => {
    // Set bypass cookies
    setBypassCookie()
    
    // Immediately set admin access
    directAdminAccess()
    
    // Store in localStorage as backup
    localStorage.setItem('adminBypass', 'true')
    localStorage.setItem('adminUser', JSON.stringify({
      id: 'admin-1',
      email: 'admin@beatrixhub.com',
      name: 'Super Admin',
      role: 'super_admin',
      permissions: ['all']
    }))
    
    // Redirect to admin panel
    router.push('/admin')
  }

  const handleVisualEditor = () => {
    // Set bypass cookies
    setBypassCookie()
    
    // Immediately set admin access
    directAdminAccess()
    
    // Store in localStorage as backup
    localStorage.setItem('adminBypass', 'true')
    localStorage.setItem('adminUser', JSON.stringify({
      id: 'admin-1',
      email: 'admin@beatrixhub.com',
      name: 'Super Admin',
      role: 'super_admin',
      permissions: ['all']
    }))
    
    // Redirect directly to visual editor
    router.push('/admin/visual-editor')
  }

  useEffect(() => {
    // Auto-bypass if already authenticated as admin
    if (isAuthenticated && user?.role === 'super_admin') {
      router.push('/admin')
    }
  }, [isAuthenticated, user, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 text-orange-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Super Admin Access</CardTitle>
          <CardDescription className="text-gray-300">
            Direct access to all admin features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-orange-400">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Full Admin Access</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              This will grant you immediate access to all admin features including the visual editor.
            </p>
          </div>
          
          <Button 
            onClick={handleBypass}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            size="lg"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Access Admin Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <Button 
            onClick={handleVisualEditor}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            size="lg"
          >
            <User className="w-4 h-4 mr-2" />
            Access Visual Editor
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              This bypass is for development purposes only
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 