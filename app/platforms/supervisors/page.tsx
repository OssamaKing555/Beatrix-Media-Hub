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

export default function SupervisorsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const supervisorServices = [
    {
      id: 1,
      title: 'Project Management',
      description: 'Comprehensive project oversight and quality control',
      price: '$100 - $300/hour',
      duration: 'Project-based',
      features: ['Project Planning', 'Team Coordination', 'Quality Assurance', 'Progress Monitoring']
    },
    {
      id: 2,
      title: 'Creative Direction',
      description: 'Artistic and creative guidance for media projects',
      price: '$150 - $400/hour',
      duration: 'Project-based',
      features: ['Creative Strategy', 'Art Direction', 'Brand Consistency', 'Content Review']
    },
    {
      id: 3,
      title: 'Technical Supervision',
      description: 'Technical oversight and production management',
      price: '$120 - $350/hour',
      duration: 'Project-based',
      features: ['Technical Planning', 'Equipment Management', 'Workflow Optimization', 'Quality Control']
    },
    {
      id: 4,
      title: 'Team Leadership',
      description: 'Leadership and team management services',
      price: '$200 - $500/hour',
      duration: 'Ongoing',
      features: ['Team Building', 'Performance Management', 'Mentoring', 'Conflict Resolution']
    }
  ];

  const successStories = [
    {
      id: 1,
      supervisor: 'Sarah Johnson',
      specialty: 'Creative Direction',
      result: 'Award-winning campaign',
      description: 'Led creative direction for a campaign that won industry recognition and increased client revenue by 200%'
    },
    {
      id: 2,
      supervisor: 'Michael Chen',
      specialty: 'Technical Supervision',
      result: 'Streamlined production process',
      description: 'Optimized technical workflows that reduced production time by 40% while maintaining quality standards'
    },
    {
      id: 3,
      supervisor: 'Emily Rodriguez',
      specialty: 'Project Management',
      result: '100% on-time delivery',
      description: 'Managed 50+ projects with perfect on-time delivery and 98% client satisfaction rate'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Supervisor Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-teal-100">
              Professional supervision and leadership services for media projects
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
                Join Platform
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600">
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
                  Why Supervisors Choose Beatrix Media Hub
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-teal-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Expert Leadership</h3>
                      <p className="text-gray-600">Access to experienced supervisors with proven track records.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-cyan-600 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Quality Assurance</h3>
                      <p className="text-gray-600">Ensuring high standards and consistent quality across all projects.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Project Success</h3>
                      <p className="text-gray-600">Proven methodologies that guarantee project completion on time and budget.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-center">Supervisor Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-600 mb-2">100+</div>
                    <div className="text-gray-600">Expert Supervisors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-600 mb-2">500+</div>
                    <div className="text-gray-600">Projects Supervised</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                    <div className="text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600 mb-2">4.9/5</div>
                    <div className="text-gray-600">Client Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Supervisor Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional supervision and leadership services for media projects
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {supervisorServices.map((service, index) => (
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
                              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
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
              <h2 className="text-3xl font-bold mb-4">Supervisor Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real results from supervisors who have led successful projects
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
                        <CardTitle className="text-xl">{story.supervisor}</CardTitle>
                        <Badge variant="outline">{story.specialty}</Badge>
                      </div>
                      <CardDescription className="text-lg font-semibold text-teal-600">
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
              <h2 className="text-3xl font-bold mb-4">Join the Supervisor Platform</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Share your expertise and lead successful media projects
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
                  <Label htmlFor="supervisor-name">Full Name</Label>
                  <Input id="supervisor-name" placeholder="Your full name" />
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
                  <Label htmlFor="specialty">Supervision Specialty</Label>
                  <select id="specialty" className="w-full p-3 border border-gray-300 rounded-md">
                    <option>Project Management</option>
                    <option>Creative Direction</option>
                    <option>Technical Supervision</option>
                    <option>Team Leadership</option>
                    <option>Quality Assurance</option>
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
                    {['Project Management', 'Creative Direction', 'Technical Supervision', 'Team Leadership'].map((service) => (
                      <label key={service} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="industries">Industries</Label>
                  <Input id="industries" placeholder="e.g., Film, TV, Digital Media, Advertising" />
                </div>
                <div>
                  <Label htmlFor="portfolio">Portfolio/Resume URL</Label>
                  <Input id="portfolio" placeholder="https://your-portfolio.com" />
                </div>
                <div>
                  <Label htmlFor="message">About Your Experience</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your supervision experience and achievements..."
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
