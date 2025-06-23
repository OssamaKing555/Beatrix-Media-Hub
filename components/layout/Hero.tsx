'use client'

import { Button } from '@/components/ui/button'
import siteConfig from '@/data/siteConfig.json'

export default function Hero() {
  const scrollToContent = () => {
    const element = document.getElementById('content')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          {/* Fallback background */}
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-black to-blue-900" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {siteConfig.site.name}
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 font-light">
          {siteConfig.site.tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={scrollToContent}
            size="lg"
            className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg"
          >
            Explore Our Work
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg"
          >
            <a href="/contact">Get Started</a>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={scrollToContent}
          className="text-white animate-bounce"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </button>
      </div>
    </section>
  )
} 