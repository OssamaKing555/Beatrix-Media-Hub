'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowRight, Star, Users, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSiteConfig, getFeaturedClients, getFeaturedTestimonials, getServices } from '@/lib/data';

const siteConfig = getSiteConfig();

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const featuredClients = getFeaturedClients();
  const featuredTestimonials = getFeaturedTestimonials();
  const services = getServices().slice(0, 3); // Show first 3 services

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Fullscreen Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/40 via-pink-900/20 to-black" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-500" />
        </div>
      </div>

      {/* Hero Section */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                We Create
              </span>
              <br />
              <span className="text-white">Impactful Stories</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              {siteConfig.site.tagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/portfolio">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold">
                See Our Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/consulting">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
                Book Consultation
                <Play className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 py-20 bg-black/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-white/60">Projects Completed</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-white/60">Happy Clients</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">5+</div>
              <div className="text-white/60">Years Experience</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-white/60">Client Satisfaction</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Preview */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 py-20 bg-gradient-to-b from-black/50 to-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Services
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              From brand identity to digital campaigns, we deliver exceptional results that drive growth and engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-white/70 mb-6">{service.description}</p>
                  
                  <Link href={`/services#${service.category}`}>
                    <Button variant="ghost" className="text-white hover:bg-white/10 p-0">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Clients */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 py-20 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Leading Brands
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We've helped companies across industries achieve their goals through creative excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {featuredClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center justify-center"
              >
                <div className="w-24 h-24 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <span className="text-white font-bold text-lg">{client.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Don't just take our word for it - hear from the brands we've helped transform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-white/80 mb-6 italic">"{testimonial.text}"</p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.author}</div>
                    <div className="text-white/60 text-sm">{testimonial.position}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 py-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Let's discuss your project and bring your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/client-order">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/consulting">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
                  Book a Consultation
                  <Play className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
