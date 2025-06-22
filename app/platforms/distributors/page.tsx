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

export default function DistributorsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const distributorServices = [
    {
      id: 1,
      title: 'Content Distribution',
      description: 'Multi-platform content distribution and syndication services',
      price: '$1,000 - $10,000',
      duration: '1-4 weeks',
      features: ['Platform Optimization', 'Metadata Management', 'Quality Control', 'Analytics']
    },
    {
      id: 2,
      title: 'Channel Management',
      description: 'Professional management of distribution channels and partnerships',
      price: '$2,000 - $15,000',
      duration: 'Ongoing',
      features: ['Channel Strategy', 'Partnership Development', 'Performance Monitoring', 'Revenue Optimization']
    },
    {
      id: 3,
      title: 'Global Reach',
      description: 'International distribution and localization services',
      price: '$5,000 - $25,000',
      duration: '2-8 weeks',
      features: ['Localization', 'Regional Optimization', 'Cultural Adaptation', 'Market Analysis']
    },
    {
      id: 4,
      title: 'Analytics & Insights',
      description: 'Comprehensive analytics and performance reporting',
      price: '$500 - $3,000/month',
      duration: 'Ongoing',
      features: ['Performance Tracking', 'Audience Insights', 'Revenue Analytics', 'Competitive Analysis']
    }
  ];

  const successStories = [
    {
      id: 1,
      distributor: 'Global Media Network',
      specialty: 'International Distribution',
      result: '500% increase in global reach',
      description: 'Expanded content distribution to 50+ countries with localized strategies'
    },
    {
      id: 2,
      distributor: 'Digital Content Hub',
      specialty: 'Multi-Platform Distribution',
      result: '2M+ new viewers',
      description: 'Optimized distribution across 20+ platforms with targeted audience engagement'
    },
    {
      id: 3,
      distributor: 'Streaming Partners',
      specialty: 'OTT Distribution',
      result: '300% revenue growth',
      description: 'Strategic partnerships with major streaming platforms and content aggregators'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Distributor Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Global content distribution and channel management solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                Join Platform
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
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
                  Why Distributors Choose Beatrix Media Hub
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Global Network</h3>
                      <p className="text-gray-600">Access to worldwide distribution channels and partnerships.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-indigo-600 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Advanced Analytics</h3>
                      <p className="text-gray-600">Comprehensive insights and performance tracking across all channels.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Revenue Optimization</h3>
                      <p className="text-gray-600">Maximize earnings through strategic distribution and monetization.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-center">Platform Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
                    <div className="text-gray-600">Distribution Partners</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600 mb-2">50+</div>
                    <div className="text-gray-600">Countries Reached</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">$10M+</div>
                    <div className="text-gray-600">Revenue Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-600 mb-2">4.9/5</div>
                    <div className="text-gray-600">Partner Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Distributor Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive distribution solutions for global content reach
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {distributorServices.map((service, index) => (
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
                              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full">Learn More</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Success Stories Tab */}
          <TabsContent value="success" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Distributor Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real results from distributors who have expanded their global reach
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
                        <CardTitle className="text-xl">{story.distributor}</CardTitle>
                        <Badge variant="outline">{story.specialty}</Badge>
                      </div>
                      <CardDescription className="text-lg font-semibold text-purple-600">
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
              <h2 className="text-3xl font-bold mb-4">Join the Distributor Platform</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Expand your content distribution network globally
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
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" placeholder="Your distribution company name" />
                </div>
                <div>
                  <Label htmlFor="contact-name">Contact Name</Label>
                  <Input id="contact-name" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="specialty">Distribution Specialty</Label>
                  <select id="specialty" className="w-full p-3 border border-gray-300 rounded-md">
                    <option>International Distribution</option>
                    <option>Multi-Platform Distribution</option>
                    <option>OTT Distribution</option>
                    <option>Channel Management</option>
                    <option>Content Syndication</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="experience">Years in Distribution</Label>
                  <select id="experience" className="w-full p-3 border border-gray-300 rounded-md">
                    <option>0-2 years</option>
                    <option>3-5 years</option>
                    <option>6-10 years</option>
                    <option>10+ years</option>
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
                  <Label htmlFor="services">Services Offered</Label>
                  <div className="space-y-2 mt-2">
                    {['Content Distribution', 'Channel Management', 'Global Reach', 'Analytics & Insights'].map((service) => (
                      <label key={service} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="regions">Target Regions</Label>
                  <Input id="regions" placeholder="e.g., North America, Europe, Asia-Pacific" />
                </div>
                <div>
                  <Label htmlFor="platforms">Distribution Platforms</Label>
                  <Input id="platforms" placeholder="e.g., Netflix, Amazon, YouTube, etc." />
                </div>
                <div>
                  <Label htmlFor="message">About Your Distribution</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your distribution experience and goals..."
                    rows={4}
                  />
                </div>
                <Button size="lg" className="w-full">
                  Submit Application
                </Button>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
