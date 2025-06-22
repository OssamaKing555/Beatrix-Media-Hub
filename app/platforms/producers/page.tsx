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

export default function ProducersPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const producerServices = [
    {
      id: 1,
      title: 'Content Production',
      description: 'High-quality video, audio, and multimedia content creation',
      price: '$5,000 - $25,000',
      duration: '2-8 weeks',
      features: ['Video Production', 'Audio Recording', 'Post-Production', 'Quality Control']
    },
    {
      id: 2,
      title: 'Studio Services',
      description: 'Professional studio facilities and equipment rental',
      price: '$500 - $2,000/day',
      duration: 'Flexible',
      features: ['Recording Studio', 'Video Studio', 'Equipment Rental', 'Technical Support']
    },
    {
      id: 3,
      title: 'Distribution Support',
      description: 'Content distribution and platform optimization',
      price: '$2,000 - $10,000',
      duration: '1-4 weeks',
      features: ['Platform Optimization', 'Metadata Management', 'Quality Assurance', 'Analytics']
    },
    {
      id: 4,
      title: 'Collaboration Tools',
      description: 'Project management and collaboration platforms',
      price: '$100 - $500/month',
      duration: 'Ongoing',
      features: ['Project Management', 'File Sharing', 'Communication Tools', 'Workflow Automation']
    }
  ];

  const successStories = [
    {
      id: 1,
      producer: 'MediaFlow Studios',
      specialty: 'Video Production',
      result: '50% increase in production capacity',
      description: 'Streamlined workflow and collaboration tools that doubled their output'
    },
    {
      id: 2,
      producer: 'AudioCraft Pro',
      specialty: 'Audio Production',
      result: '200+ projects completed',
      description: 'Professional studio services that attracted major clients'
    },
    {
      id: 3,
      producer: 'Digital Content Hub',
      specialty: 'Multimedia',
      result: '300% revenue growth',
      description: 'Comprehensive production and distribution services'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 via-blue-600 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Producer Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Professional content production tools and services for media creators
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                Join Platform
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
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
                  Why Producers Choose Beatrix Media Hub
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Professional Tools</h3>
                      <p className="text-gray-600">Access to industry-standard production equipment and software.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Global Network</h3>
                      <p className="text-gray-600">Connect with clients and collaborators worldwide through our platform.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-teal-600 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Revenue Growth</h3>
                      <p className="text-gray-600">Increase your income with our distribution and monetization tools.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-center">Platform Stats</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                    <div className="text-gray-600">Active Producers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                    <div className="text-gray-600">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-600 mb-2">$5M+</div>
                    <div className="text-gray-600">Revenue Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">4.8/5</div>
                    <div className="text-gray-600">Client Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Producer Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive tools and services designed for professional content producers
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {producerServices.map((service, index) => (
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
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
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
              <h2 className="text-3xl font-bold mb-4">Producer Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real results from producers who have transformed their businesses
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
                        <CardTitle className="text-xl">{story.producer}</CardTitle>
                        <Badge variant="outline">{story.specialty}</Badge>
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
              <h2 className="text-3xl font-bold mb-4">Join the Producer Platform</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Start your journey as a professional content producer
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
                  <Label htmlFor="producer-name">Producer Name</Label>
                  <Input id="producer-name" placeholder="Your production company name" />
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
                  <Label htmlFor="specialty">Production Specialty</Label>
                  <select id="specialty" className="w-full p-3 border border-gray-300 rounded-md">
                    <option>Video Production</option>
                    <option>Audio Production</option>
                    <option>Photography</option>
                    <option>Animation</option>
                    <option>Post-Production</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
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
                    {['Content Production', 'Studio Services', 'Distribution Support', 'Collaboration Tools'].map((service) => (
                      <label key={service} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="portfolio">Portfolio URL</Label>
                  <Input id="portfolio" placeholder="https://your-portfolio.com" />
                </div>
                <div>
                  <Label htmlFor="message">About Your Production</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your production experience and what you're looking to achieve..."
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
