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

export default function ClientsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const clientServices = [
    {
      id: 1,
      title: 'Content Creation',
      description: 'Professional video, audio, and multimedia content production',
      price: '$3,000 - $50,000',
      duration: '2-12 weeks',
      features: ['Video Production', 'Audio Recording', 'Post-Production', 'Quality Assurance']
    },
    {
      id: 2,
      title: 'Brand Development',
      description: 'Complete brand identity and marketing strategy',
      price: '$5,000 - $25,000',
      duration: '4-8 weeks',
      features: ['Logo Design', 'Brand Guidelines', 'Marketing Strategy', 'Visual Identity']
    },
    {
      id: 3,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing and advertising campaigns',
      price: '$2,000 - $20,000',
      duration: '1-6 months',
      features: ['Social Media Marketing', 'Content Marketing', 'SEO Optimization', 'Analytics']
    },
    {
      id: 4,
      title: 'Consulting Services',
      description: 'Strategic consulting for media and marketing decisions',
      price: '$150 - $500/hour',
      duration: 'Flexible',
      features: ['Strategy Development', 'Market Analysis', 'Performance Review', 'Implementation Support']
    }
  ];

  const successStories = [
    {
      id: 1,
      client: 'TechCorp Solutions',
      industry: 'Technology',
      result: '400% increase in brand awareness',
      description: 'Complete rebrand and marketing campaign that transformed their market presence'
    },
    {
      id: 2,
      client: 'EcoLife Products',
      industry: 'Sustainability',
      result: '250% growth in online sales',
      description: 'Digital marketing strategy that connected with environmentally conscious consumers'
    },
    {
      id: 3,
      client: 'HealthSync Medical',
      industry: 'Healthcare',
      result: '300% increase in patient engagement',
      description: 'Professional video content and digital marketing that built trust and credibility'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-pink-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Client Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Professional media and marketing services for businesses of all sizes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
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
                  Why Clients Choose Beatrix Media Hub
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-orange-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Professional Quality</h3>
                      <p className="text-gray-600">Industry-standard production quality with proven results.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-600 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Custom Solutions</h3>
                      <p className="text-gray-600">Tailored services designed specifically for your business needs.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-pink-600 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Measurable Results</h3>
                      <p className="text-gray-600">Clear metrics and ROI tracking for all our services.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-center">Client Success</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
                    <div className="text-gray-600">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">1000+</div>
                    <div className="text-gray-600">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600 mb-2">95%</div>
                    <div className="text-gray-600">Satisfaction Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
                    <div className="text-gray-600">Client Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Client Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive media and marketing solutions for businesses
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {clientServices.map((service, index) => (
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
                              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
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
              <h2 className="text-3xl font-bold mb-4">Client Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real results from businesses we've helped transform
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
                        <CardTitle className="text-xl">{story.client}</CardTitle>
                        <Badge variant="outline">{story.industry}</Badge>
                      </div>
                      <CardDescription className="text-lg font-semibold text-orange-600">
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
              <h2 className="text-3xl font-bold mb-4">Start Your Project</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Let's discuss how we can help your business grow
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
                  <Input id="company-name" placeholder="Your company name" />
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
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Your phone number" />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <select id="industry" className="w-full p-3 border border-gray-300 rounded-md">
                    <option>Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Education</option>
                    <option>Retail</option>
                    <option>Manufacturing</option>
                    <option>Other</option>
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
                    {['Content Creation', 'Brand Development', 'Digital Marketing', 'Consulting Services'].map((service) => (
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
                  <Label htmlFor="timeline">Project Timeline</Label>
                  <select id="timeline" className="w-full p-3 border border-gray-300 rounded-md">
                    <option>ASAP</option>
                    <option>1-2 months</option>
                    <option>3-6 months</option>
                    <option>6+ months</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="message">Project Details</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your project and goals..."
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
