'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Shield, Loader2, AlertCircle, CheckCircle, Info, Users, Building2, Star, Rocket } from 'lucide-react'
import { useAuth, getCurrentUser } from '@/lib/auth'
import { useCSRF } from '@/lib/hooks/useCSRF'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SecureBadge } from '@/components/ui/secure-badge'
import { SecurityAlert } from '@/components/ui/security-alert'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Utility to check for a cookie by name
function hasCookie(name: string): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.split(';').some((c) => c.trim().startsWith(name + '='));
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [securityAlert, setSecurityAlert] = useState<{
    type: 'success' | 'warning' | 'error' | 'info' | 'security';
    title?: string;
    message: string;
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showDemoInfo, setShowDemoInfo] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  
  const router = useRouter()
  const { login, isLoading: authLoading, user, isAuthenticated } = useAuth()
  const { csrfToken, isLoading: csrfLoading, error: csrfError, isTokenValid } = useCSRF()

  // Handle redirect after successful login
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('Auth state changed:', { user, isAuthenticated });
      
      // Wait for Zustand to hydrate and then redirect
      const redirectTimer = setTimeout(() => {
        if (user.role === 'super_admin') {
          console.log('Redirecting super admin to /admin');
          router.push('/admin');
        } else {
          console.log('Redirecting user to /platforms');
          router.push('/platforms');
        }
      }, 1000);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [isAuthenticated, user, router]);

  // Check if form is valid (email and password filled)
  const isFormValid = email.trim() && password.trim()
  
  // Check if login button should be enabled
  const isLoginEnabled = isFormValid && !isLoading && !csrfLoading
  
  // Development mode bypass for CSRF
  const isDevelopment = process.env.NODE_ENV === 'development'

  const demoAccounts = [
    {
      role: 'Super Admin',
      email: 'admin@beatrixhub.com',
      password: 'admin123',
      description: 'Full platform access and management',
      icon: Users,
      color: 'bg-red-500'
    },
    {
      role: 'Freelancer',
      email: 'freelancer@beatrixhub.com',
      password: 'freelance',
      description: 'Job opportunities and project management',
      icon: Star,
      color: 'bg-blue-500'
    },
    {
      role: 'Client',
      email: 'client@beatrixhub.com',
      password: 'client123',
      description: 'Project tracking and service requests',
      icon: Building2,
      color: 'bg-green-500'
    },
    {
      role: 'Expert',
      email: 'expert@beatrixhub.com',
      password: 'expert123',
      description: 'Consultation management and services',
      icon: Rocket,
      color: 'bg-yellow-500'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!email || !password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    // Check CSRF token validity (with development bypass)
    if (!isDevelopment && !isTokenValid) {
      if (csrfLoading) {
        setSecurityAlert({
          type: 'warning',
          title: 'Security Check Loading',
          message: 'Security token is still loading. Please wait a moment and try again.'
        })
        setIsLoading(false)
        return
      } else {
        setSecurityAlert({
          type: 'error',
          title: 'Security Error',
          message: 'Invalid security token. Please refresh the page and try again.'
        })
        setIsLoading(false)
        return
      }
    }

    try {
      const success = await login(email, password)
      if (success) {
        setSecurityAlert({
          type: 'success',
          title: 'Login Successful',
          message: 'Welcome back! Redirecting to your dashboard...'
        })
        // Wait for the auth-token cookie to be set before redirecting
        const waitForToken = async () => {
          let attempts = 0;
          while (!hasCookie('auth-token') && attempts < 30) { // wait up to ~3 seconds
            await new Promise(res => setTimeout(res, 100));
            attempts++;
          }
        };
        await waitForToken();
        // Now redirect
        const currentUser = getCurrentUser()
        console.log('Redirecting with user:', currentUser)
        if (currentUser?.role === 'super_admin') {
          router.push('/admin')
        } else {
          router.push('/platforms')
        }
      } else {
        setError('Invalid email or password. Please try again.')
        
        if (error?.includes('locked')) {
          setSecurityAlert({
            type: 'warning',
            title: 'Account Temporarily Locked',
            message: 'Too many failed attempts. Please try again later.'
          })
        } else if (error?.includes('rate limit')) {
          setSecurityAlert({
            type: 'warning',
            title: 'Rate Limit Exceeded',
            message: 'Too many login attempts. Please wait before trying again.'
          })
        }
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.')
      setSecurityAlert({
        type: 'error',
        title: 'Connection Error',
        message: 'Unable to connect to the server. Please check your internet connection.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoAccount = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
    setError('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-purple-900/20 to-black">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-purple-400 mr-2" />
                <CardTitle className="text-2xl font-bold text-white">
                  Secure Login
                </CardTitle>
              </div>
              <CardDescription className="text-white/60">
                Sign in to access your platform
              </CardDescription>
              
              {/* Security Badge */}
              <div className="mt-4">
                <SecureBadge type="secure" size="sm">
                  Enterprise Security
                </SecureBadge>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Security Alert */}
              {securityAlert && (
                <div className="mb-6">
                  <SecurityAlert
                    type={securityAlert.type}
                    title={securityAlert.title}
                    message={securityAlert.message}
                    onClose={() => setSecurityAlert(null)}
                    autoClose={securityAlert.type === 'success'}
                    autoCloseDelay={3000}
                  />
                </div>
              )}

              {/* CSRF Error Alert */}
              {csrfError && !isDevelopment && (
                <div className="mb-6">
                  <SecurityAlert
                    type="error"
                    title="Security Token Error"
                    message={csrfError}
                    onClose={() => {}} // Don't allow closing CSRF errors
                  />
                </div>
              )}

              {/* CSRF Loading Indicator */}
              {csrfLoading && (
                <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center text-blue-400 text-sm">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <span>Security check loading...</span>
                  </div>
                </div>
              )}

              {/* Development Mode Notice */}
              {isDevelopment && (
                <div className="mb-6 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center text-yellow-400 text-sm">
                    <Shield className="h-4 w-4 mr-2" />
                    <span>Development mode: CSRF validation bypassed for testing</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* CSRF Token (hidden) */}
                <input type="hidden" name="csrfToken" value={csrfToken} />

                <Button
                  type="submit"
                  disabled={!isLoginEnabled}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : csrfLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Security Check...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>

                {/* Security Status Indicator */}
                {!isDevelopment && (
                  <div className="text-center">
                    <div className="flex items-center justify-center text-xs text-white/40">
                      <Shield className="h-3 w-3 mr-1" />
                      <span>
                        {csrfLoading ? 'Security check in progress...' : 
                         isTokenValid ? 'Security token ready' : 
                         'Security token not ready'}
                      </span>
                    </div>
                  </div>
                )}
              </form>

              {/* Demo Accounts Section */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-900">Demo Accounts</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDemoInfo(!showDemoInfo)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Info className="w-4 h-4 mr-1" />
                    {showDemoInfo ? 'Hide' : 'Show'} Info
                  </Button>
                </div>

                {showDemoInfo && (
                  <Alert className="mb-4">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Use these demo accounts to explore different user roles and features.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  {demoAccounts.map((account, index) => {
                    const Icon = account.icon
                    return (
                      <motion.div
                        key={account.role}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => fillDemoAccount(account.email, account.password)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${account.color}`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-sm">{account.role}</h4>
                              <Badge variant="outline" className="text-xs">
                                Demo
                              </Badge>
                            </div>
                            {showDemoInfo && (
                              <p className="text-xs text-gray-600 mt-1">{account.description}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">{account.email}</p>
                            <p className="text-xs text-gray-400">Click to fill</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-white/60 text-sm">
                  Don't have an account?{' '}
                  <Link href="/join" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Join our platform
                  </Link>
                </p>
              </div>

              {/* Security Info */}
              <div className="mt-6 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-center text-purple-400 text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  <span>This form is protected by CSRF tokens and rate limiting</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 