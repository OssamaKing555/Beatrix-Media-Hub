'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Target, 
  TrendingUp, 
  Lightbulb, 
  Shield, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react'
import Link from 'next/link'

const consultingServices = [
  {
    icon: Target,
    title: 'Strategic Planning',
    description: 'Comprehensive business strategy development and roadmap creation',
    features: ['Market Analysis', 'Competitive Research', 'Growth Strategy', 'Risk Assessment'],
    price: 'From $2,500',
    duration: '2-4 weeks'
  },
  {
    icon: TrendingUp,
    title: 'Digital Transformation',
    description: 'Modernize your business with cutting-edge technology solutions',
    features: ['Technology Audit', 'Implementation Plan', 'Change Management', 'Performance Metrics'],
    price: 'From $5,000',
    duration: '4-8 weeks'
  },
  {
    icon: Users,
    title: 'Team Optimization',
    description: 'Build high-performing teams and optimize organizational structure',
    features: ['Team Assessment', 'Process Optimization', 'Leadership Training', 'Performance Systems'],
    price: 'From $3,500',
    duration: '3-6 weeks'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Consulting',
    description: 'Drive innovation and creative problem-solving across your organization',
    features: ['Innovation Workshops', 'Idea Generation', 'Prototype Development', 'Implementation Support'],
    price: 'From $4,000',
    duration: '4-6 weeks'
  }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    content: 'The strategic planning session completely transformed our approach to market entry. Highly recommended!',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'CTO, Digital Solutions',
    content: 'Their digital transformation expertise helped us modernize our entire tech stack in record time.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'HR Director, Global Corp',
    content: 'The team optimization program improved our productivity by 40% within the first quarter.',
    rating: 5
  }
]

export default function ConsultingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              Professional Consulting Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transform Your Business
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {' '}With Expert Guidance
              </span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Our experienced consultants help businesses of all sizes achieve their goals through 
              strategic planning, digital transformation, and organizational optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                View Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Consulting Services
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Comprehensive solutions tailored to your specific business needs and objectives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {consultingServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-500/20 rounded-lg">
                        <service.icon className="h-6 w-6 text-purple-400" />
                      </div>
                      <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                        {service.price}
                      </Badge>
                    </div>
                    <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-white/70">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Duration:</span>
                        <span className="text-white">{service.duration}</span>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-white">Key Features:</span>
                        <ul className="space-y-1">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center text-sm text-white/70">
                              <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our Consulting
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              We bring decades of combined experience and proven methodologies to every engagement
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Proven Track Record',
                description: 'Successfully delivered over 500+ consulting projects across various industries'
              },
              {
                icon: Users,
                title: 'Expert Team',
                description: 'Certified consultants with deep expertise in strategy, technology, and operations'
              },
              {
                icon: Globe,
                title: 'Global Perspective',
                description: 'International experience helping businesses scale and expand globally'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="p-4 bg-purple-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Don't just take our word for it - hear from the businesses we've helped transform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-white/80 mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Let's discuss how our consulting services can help you achieve your business goals 
              and drive sustainable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Link href="/contact">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                Download Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
