'use client'

import { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, User, LogOut, Settings, Briefcase, Bell, Globe } from 'lucide-react'
import { useAuth, getRoleDisplayName, hasPermission, UserRole } from '@/lib/auth'
import siteConfig from '@/data/siteConfig.json'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import Logo from './Logo'

interface NavItem {
  title: string
  href: string
  description?: string
  auth?: boolean
  children?: NavItem[]
  roles?: UserRole[]
  icon?: React.ElementType
}

const NavDropdown = ({
  item,
  isScrolled,
  isActive,
  onClick,
  onClose,
}: {
  item: NavItem
  isScrolled: boolean
  isActive: boolean
  onClick: () => void
  onClose: () => void
}) => (
  <div className="relative">
    <button
      onClick={onClick}
      className={`flex items-center space-x-1 transition-colors text-sm font-medium ${
        isActive ? 'text-purple-400' : 'text-white/70 hover:text-white'
      }`}
    >
      <span>{item.title}</span>
      <ChevronDown className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
    </button>

    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full left-0 mt-2 w-56 bg-black/80 backdrop-blur-lg border border-white/10 rounded-lg shadow-lg"
        >
          <div className="p-2">
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className="group flex flex-col px-3 py-2 text-white/80 hover:bg-white/10 rounded-md transition-colors"
              >
                <span className="font-semibold text-white">{child.title}</span>
                <span className="text-xs text-white/60">{child.description}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

// Language and RTL state management
const useLanguageToggle = () => {
  const [locale, setLocale] = useState<'en' | 'ar'>('en')
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    // Apply RTL styles to document
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
  }, [isRTL, locale])

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en'
    setLocale(newLocale)
    setIsRTL(newLocale === 'ar')
  }

  return { locale, isRTL, toggleLanguage }
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { user, isAuthenticated, logout } = useAuth()
  const pathname = usePathname()
  const { locale, toggleLanguage } = useLanguageToggle()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title)
  }

  // Only show the main nav items in the correct order
  const mainNav = [
    ...siteConfig.navigation.main.filter(
      (item: any) =>
        ['About', 'Services', 'Portfolio', 'Consulting', 'Platforms'].includes(item.title)
    ).sort((a: any, b: any) => {
      const order = ['About', 'Services', 'Portfolio', 'Consulting', 'Platforms']
      return order.indexOf(a.title) - order.indexOf(b.title)
    })
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled || isOpen ? 'bg-black/90 backdrop-blur-lg border-b border-white/10' : 'bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a]'
      }`}
      style={{ boxShadow: isScrolled ? '0 2px 24px 0 rgba(0,0,0,0.12)' : undefined }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {mainNav.map((item) => (
              item.children ? (
                <NavDropdown
                  key={item.title}
                  item={item}
                  isScrolled={isScrolled}
                  isActive={openDropdown === item.title}
                  onClick={() => handleDropdown(item.title)}
                  onClose={() => setOpenDropdown(null)}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-base font-medium transition-colors px-2 py-1 rounded-lg ${
                    pathname === item.href ? 'text-purple-400 bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.title}
                </Link>
              )
            ))}
          </div>

          {/* User/CTA */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleLanguage}
              className="text-white/70 hover:text-white hidden lg:flex"
            >
              <Globe className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'English' : 'العربية'}
            </Button>

            {isAuthenticated ? (
              <Fragment>
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
                  <Bell className="h-5 w-5" />
                </Button>
                <div className="relative">
                  <button
                    onClick={() => handleDropdown('userMenu')}
                    className="flex items-center space-x-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-sm font-medium text-white/80">{user?.name}</span>
                    <ChevronDown className="h-4 w-4 text-white/70" />
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'userMenu' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-black/90 backdrop-blur-lg border border-white/10 rounded-lg shadow-lg"
                      >
                        <div className="p-2 text-white">
                          <div className="px-3 py-2 border-b border-white/10">
                            <p className="font-semibold">{user?.name}</p>
                            <p className="text-xs text-white/60">{user?.email}</p>
                            {user && <Badge className="mt-2" variant="secondary">{getRoleDisplayName(user.role)}</Badge>}
                          </div>
                          <Link href="/platforms" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 w-full px-3 py-2 mt-1 text-left hover:bg-white/10 rounded-md">
                            <Briefcase className="w-4 h-4" />
                            My Platform
                          </Link>
                          {user?.role === 'super_admin' && (
                            <Link href="/admin" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-white/10 rounded-md">
                              <Settings className="w-4 h-4" />
                              Admin
                            </Link>
                          )}
                          <Button onClick={logout} className="w-full mt-2 justify-start bg-transparent hover:bg-red-500/20 text-red-400 px-3">
                            <LogOut className="w-4 h-4 mr-2"/>
                            Logout
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Fragment>
            ) : (
              <Button asChild size="sm" className="hidden lg:flex bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600">
                <Link href="/login">Login</Link>
              </Button>
            )}
            <div className="lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/90 backdrop-blur-lg border-b border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white/80 hover:bg-white/10"
                >
                  {item.title}
                </Link>
              ))}
              {isAuthenticated ? (
                <Button onClick={() => { logout(); setIsOpen(false); }} className="w-full mt-4">
                  Logout
                </Button>
              ) : (
                <Button asChild className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
} 