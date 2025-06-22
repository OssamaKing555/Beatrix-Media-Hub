'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function StartupsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const startupServices = [
    {
      id: 1,
      title: 'Brand Development',
      description: 'Complete brand identity creation including logo, guidelines, and visual assets',
      price: '$2,500 - $8,000',
      duration: '2-4 weeks',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy']
    },
    {
      id: 2,
      title: 'Marketing Strategy',
      description: 'Comprehensive marketing plan tailored for startup growth',
      price: '$3,000 - $12,000',
      duration: '3-6 weeks',
      features: ['Market Research', 'Competitor Analysis', 'Growth Strategy', 'Content Plan']
    },
    {
      id: 3,
      title: 'Digital Presence',
      description: 'Website development and social media setup',
      price: '$4,000 - $15,000',
      duration: '4-8 weeks',
      features: ['Website Design', 'Social Media Setup', 'SEO Optimization', 'Analytics']
    },
    {
      id: 4,
      title: 'Video Production',
      description: 'Professional video content for marketing and fundraising',
      price: '$5,000 - $25,000',
      duration: '2-6 weeks',
      features: ['Pitch Videos', 'Product Demos', 'Brand Videos', 'Social Content']
    }
  ];

  const successStories = [
    {
      id: 1,
      startup: 'TechFlow',
      industry: 'SaaS',
      result: '300% increase in user acquisition',
      description: 'Complete rebrand and marketing strategy that transformed their market presence'
    },
    {
      id: 2,
      startup: 'EcoSmart',
      industry: 'Sustainability',
      result: '$2M in funding secured',
      description: 'Professional pitch video and brand development that impressed investors'
    },
    {
      id: 3,
      startup: 'HealthSync',
      industry: 'Healthcare',
      result: '500% growth in 6 months',
      description: 'Digital presence overhaul that established market leadership'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Startup Success Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Transform your startup vision into market reality with our comprehensive media and marketing solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                View Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="success">Success Stories</TabsTrigger>
            <TabsTrigger value="contact">Get Started</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Why Startups Choose Beatrix Media Hub
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Proven Track Record</h3>
                      <p className="text-gray-600">We've helped 200+ startups achieve their growth goals with measurable results.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Startup-Focused Approach</h3>
                      <p className="text-gray-600">We understand startup challenges and provide scalable, cost-effective solutions.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">End-to-End Support</h3>
                      <p className="text-gray-600">From concept to market launch, we provide comprehensive support at every stage.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-center">Our Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                    <div className="text-gray-600">Startups Helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">$50M+</div>
                    <div className="text-gray-600">Funding Raised</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                    <div className="text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">4.9/5</div>
                    <div className="text-gray-600">Client Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Startup Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive media and marketing solutions designed specifically for startup growth and success
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {startupServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary">{service.duration}</Badge>
                        <span className="font-semibold text-lg">{service.price}</span>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-gray-700">Includes:</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full">Get Quote</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Success Stories Tab */}
          <TabsContent value="success" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real results from startups we've helped transform and grow
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl">{story.startup}</CardTitle>
                        <Badge variant="outline">{story.industry}</Badge>
                      </div>
                      <CardDescription className="text-lg font-semibold text-green-600">
                        {story.result}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{story.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Startup?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Let's discuss how we can help you achieve your startup goals
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="startup-name">Startup Name</Label>
                  <Input id="startup-name" placeholder="Enter your startup name" />
                </div>
                <div>
                  <Label htmlFor="founder-name">Founder Name</Label>
                  <Input id="founder-name" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" placeholder="e.g., SaaS, FinTech, HealthTech" />
                </div>
                <div>
                  <Label htmlFor="stage">Funding Stage</Label>
                  <select id="stage" className="w-full p-3 border border-gray-300 rounded-md">
                    <option>Pre-seed</option>
                    <option>Seed</option>
                    <option>Series A</option>
                    <option>Series B+</option>
                    <option>Bootstrapped</option>
                  </select>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="services">Services Needed</Label>
                  <div className="space-y-2 mt-2">
                    {['Brand Development', 'Marketing Strategy', 'Digital Presence', 'Video Production'].map((service) => (
                      <label key={service} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <select id="budget" className="w-full p-3 border border-gray-300 rounded-md">
                    <option>$1,000 - $5,000</option>
                    <option>$5,000 - $15,000</option>
                    <option>$15,000 - $50,000</option>
                    <option>$50,000+</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="message">Project Details</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your startup and what you're looking to achieve..."
                    rows={4}
                  />
                </div>
                <Button size="lg" className="w-full">
                  Submit Request
                </Button>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
