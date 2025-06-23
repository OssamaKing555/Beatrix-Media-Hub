import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import CustomCursor from '@/components/ui/custom-cursor'
import FlyingBird from '@/components/ui/flying-bird'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://beatrixhub.com'),
  title: {
    default: 'BEATRIX MEDIA HUB - We Don\'t Follow Trends – We Create Them.',
    template: '%s | BEATRIX MEDIA HUB',
  },
  description: 'A leading media and advertising company specializing in creative content production, digital marketing, and brand activation campaigns.',
  keywords: ["media", "advertising", "content production", "digital marketing", "brand activation", "creative agency"],
  authors: [{ name: 'BEATRIX MEDIA HUB' }],
  creator: 'BEATRIX MEDIA HUB',
  publisher: 'BEATRIX MEDIA HUB',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://beatrixhub.com',
    title: 'BEATRIX MEDIA HUB - We Don\'t Follow Trends – We Create Them.',
    description: 'A leading media and advertising company specializing in creative content production, digital marketing, and brand activation campaigns.',
    siteName: 'BEATRIX MEDIA HUB',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BEATRIX MEDIA HUB',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BEATRIX MEDIA HUB - We Don\'t Follow Trends – We Create Them.',
    description: 'A leading media and advertising company specializing in creative content production, digital marketing, and brand activation campaigns.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-black text-white overflow-x-hidden`}>
        <SmoothScrollProvider>
          <CustomCursor />
          <FlyingBird enabled={true} speed={1} size={40} />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          {/* Footer component removed temporarily to fix import issues */}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
