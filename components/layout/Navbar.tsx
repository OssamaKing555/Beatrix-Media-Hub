'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, User, LogOut, Settings, Briefcase, MessageSquare, Bell, FileText, Users, Award, TrendingUp } from 'lucide-react'
import { useAuth, getRoleDisplayName, getRoleColor, hasPermission, UserRole } from '@/lib/auth'
import { getSiteConfig } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

const siteConfig = getSiteConfig()

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Consulting', href: '/consulting' },
    { name: 'Exclusive Store', href: '/exclusive' },
    { name: 'Join Us', href: '/join' },
    { name: 'Request Collaboration', href: '/request' },
    { name: 'Become a Partner', href: '/become-a-partner' },
    { name: 'Careers', href: '/careers' },
    { name: 'Order Project', href: '/client-order' }
  ]

  const platformRoutes = [
    { name: 'Freelancers', href: '/platforms/freelancers', roles: ['super_admin', 'supervisor', 'freelancer'] as UserRole[] },
    { name: 'Clients', href: '/platforms/clients', roles: ['super_admin', 'supervisor', 'client'] as UserRole[] },
    { name: 'Supervisors', href: '/platforms/supervisors', roles: ['super_admin', 'supervisor'] as UserRole[] },
    { name: 'Distributors', href: '/platforms/distributors', roles: ['super_admin', 'distributor'] as UserRole[] },
    { name: 'Producers', href: '/platforms/producers', roles: ['super_admin', 'producer'] as UserRole[] },
    { name: 'Startups', href: '/platforms/startups', roles: ['super_admin', 'startup'] as UserRole[] },
    { name: 'Experts', href: '/platforms/experts', roles: ['super_admin', 'expert'] as UserRole[] }
  ]

  const adminRoutes = [
    { name: 'Dashboard', href: '/admin', icon: Briefcase },
    { name: 'Visual Editor', href: '/admin/visual-editor', icon: FileText },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Projects', href: '/admin/projects', icon: Award },
    { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
    { name: 'Settings', href: '/admin/settings', icon: Settings }
  ]

  const accessiblePlatformRoutes = platformRoutes.filter(route => 
    user?.role && hasPermission(user.role, route.roles)
  )

  const accessibleAdminRoutes = adminRoutes.filter(route => 
    user?.role && hasPermission(user.role, ['super_admin'])
  )

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {siteConfig.site.name}
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.slice(0, 5).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-purple-400'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Platform Dropdown */}
            {isAuthenticated && accessiblePlatformRoutes.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-1 text-white/70 hover:text-white transition-colors"
                >
                  <span className="text-sm font-medium">Platforms</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg"
                    >
                      <div className="py-2">
                        {accessiblePlatformRoutes.map((route) => (
                          <Link
                            key={route.name}
                            href={route.href}
                            className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            {route.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Admin Dropdown */}
            {isAuthenticated && accessibleAdminRoutes.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-1 text-white/70 hover:text-white transition-colors"
                >
                  <span className="text-sm font-medium">Admin</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg"
                    >
                      <div className="py-2">
                        {accessibleAdminRoutes.map((route) => (
                          <Link
                            key={route.name}
                            href={route.href}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <route.icon className="h-4 w-4" />
                            <span>{route.name}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            {isAuthenticated && (
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                <Bell className="h-5 w-5" />
              </Button>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{user?.name?.charAt(0)}</span>
                  </div>
                  <span className="hidden md:block text-sm font-medium">{user?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg"
                    >
                      <div className="py-2">
                        <div className="px-4 py-2 border-b border-white/10">
                          <p className="text-sm font-medium text-white">{user?.name}</p>
                          <p className="text-xs text-white/60">{user?.email}</p>
                          <Badge className="mt-1 bg-purple-500/20 text-purple-400 border-purple-500/30">
                            {user?.role}
                          </Badge>
                        </div>
                        
                        <Link
                          href="/platforms"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Briefcase className="h-4 w-4" />
                          <span>My Platform</span>
                        </Link>
                        
                        <Link
                          href="/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                        
                        <Link
                          href="/settings"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                        
                        <div className="border-t border-white/10 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    Login
                  </Button>
                </Link>
                <Link href="/join">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    Join Us
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:bg-white/10"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/90 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block text-base font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-purple-400'
                      : 'text-white/70 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {isAuthenticated && accessiblePlatformRoutes.length > 0 && (
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/40 text-sm font-medium mb-2">Platforms</p>
                  {accessiblePlatformRoutes.map((route) => (
                    <Link
                      key={route.name}
                      href={route.href}
                      className="block text-base text-white/70 hover:text-white transition-colors py-1"
                      onClick={() => setIsOpen(false)}
                    >
                      {route.name}
                    </Link>
                  ))}
                </div>
              )}
              
              {isAuthenticated && accessibleAdminRoutes.length > 0 && (
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/40 text-sm font-medium mb-2">Admin</p>
                  {accessibleAdminRoutes.map((route) => (
                    <Link
                      key={route.name}
                      href={route.href}
                      className="flex items-center space-x-2 text-base text-white/70 hover:text-white transition-colors py-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <route.icon className="h-4 w-4" />
                      <span>{route.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
} 