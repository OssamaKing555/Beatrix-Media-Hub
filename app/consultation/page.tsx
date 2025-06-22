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
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  Phone, 
  MessageSquare,
  Star,
  CheckCircle,
  ArrowRight,
  MapPin,
  DollarSign,
  Clock3
} from 'lucide-react';

export default function ConsultationPlatform() {
  const [activeTab, setActiveTab] = useState('book');
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const experts = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Business Strategy',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 150,
      availability: 'Mon-Fri, 9AM-6PM',
      image: '/api/placeholder/100/100',
      description: 'Expert in business strategy and digital transformation with 15+ years of experience.',
      services: ['Strategic Planning', 'Digital Transformation', 'Market Analysis'],
      languages: ['English', 'Spanish'],
      experience: '15+ years'
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Technology Consulting',
      rating: 4.8,
      reviews: 89,
      hourlyRate: 180,
      availability: 'Mon-Sat, 10AM-8PM',
      image: '/api/placeholder/100/100',
      description: 'Technology consultant specializing in software architecture and system optimization.',
      services: ['Software Architecture', 'System Optimization', 'Tech Strategy'],
      languages: ['English', 'Mandarin'],
      experience: '12+ years'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      specialty: 'Marketing & Growth',
      rating: 4.9,
      reviews: 156,
      hourlyRate: 120,
      availability: 'Mon-Fri, 8AM-5PM',
      image: '/api/placeholder/100/100',
      description: 'Marketing strategist helping businesses scale through digital marketing and growth hacking.',
      services: ['Digital Marketing', 'Growth Strategy', 'Brand Development'],
      languages: ['English', 'Portuguese'],
      experience: '10+ years'
    }
  ];

  const consultationTypes = [
    {
      id: 'video',
      title: 'Video Consultation',
      description: 'Face-to-face video meeting with screen sharing capabilities',
      duration: '30-60 minutes',
      price: 'From $120',
      icon: Video,
      features: ['HD Video Quality', 'Screen Sharing', 'Recording Available', 'Chat Support']
    },
    {
      id: 'phone',
      title: 'Phone Consultation',
      description: 'Audio-only consultation for quick discussions',
      duration: '15-30 minutes',
      price: 'From $80',
      icon: Phone,
      features: ['Crystal Clear Audio', 'Call Recording', 'Follow-up Notes', 'Quick Setup']
    },
    {
      id: 'chat',
      title: 'Chat Consultation',
      description: 'Text-based consultation with file sharing',
      duration: 'Flexible',
      price: 'From $60',
      icon: MessageSquare,
      features: ['Real-time Chat', 'File Sharing', 'Chat History', '24/7 Available']
    }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Consultation Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with expert consultants for personalized guidance and solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Book Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                View Experts
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="book">Book Consultation</TabsTrigger>
            <TabsTrigger value="experts">Our Experts</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          {/* Book Consultation Tab */}
          <TabsContent value="book" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Book Your Consultation</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose your expert, consultation type, and schedule your session
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Expert Selection */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <Label className="text-lg font-semibold">Select Expert</Label>
                  <div className="space-y-4 mt-4">
                    {experts.map((expert) => (
                      <Card 
                        key={expert.id} 
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          selectedExpert?.id === expert.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedExpert(expert)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {expert.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{expert.name}</h3>
                              <p className="text-sm text-gray-600">{expert.specialty}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="text-sm ml-1">{expert.rating}</span>
                                </div>
                                <span className="text-sm text-gray-500">({expert.reviews} reviews)</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-blue-600">${expert.hourlyRate}/hr</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Consultation Type */}
                <div>
                  <Label className="text-lg font-semibold">Consultation Type</Label>
                  <div className="grid gap-4 mt-4">
                    {consultationTypes.map((type) => (
                      <Card 
                        key={type.id}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          selectedService?.id === type.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedService(type)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <type.icon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{type.title}</h3>
                              <p className="text-sm text-gray-600">{type.description}</p>
                              <p className="text-sm text-gray-500 mt-1">{type.duration}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-blue-600">{type.price}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Booking Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle>Schedule Your Consultation</CardTitle>
                    <CardDescription>
                      Fill in your details to book your consultation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Your full name" />
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
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="time">Preferred Time</Label>
                      <select id="time" className="w-full p-3 border border-gray-300 rounded-md">
                        <option>Select a time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="topic">Consultation Topic</Label>
                      <Textarea 
                        id="topic" 
                        placeholder="Briefly describe what you'd like to discuss..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="goals">Goals & Objectives</Label>
                      <Textarea 
                        id="goals" 
                        placeholder="What are your main goals for this consultation?"
                        rows={3}
                      />
                    </div>
                    <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Book Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Experts Tab */}
          <TabsContent value="experts" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Expert Consultants</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Meet our certified professionals with years of industry experience
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {experts.map((expert, index) => (
                <motion.div
                  key={expert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {expert.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{expert.name}</CardTitle>
                          <CardDescription>{expert.specialty}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-semibold">{expert.rating}</span>
                          <span className="text-gray-500">({expert.reviews})</span>
                        </div>
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          ${expert.hourlyRate}/hr
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">{expert.description}</p>
                      <div>
                        <h4 className="font-semibold mb-2">Services:</h4>
                        <div className="flex flex-wrap gap-2">
                          {expert.services.map((service) => (
                            <Badge key={service} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Experience: {expert.experience}</span>
                        <span>Languages: {expert.languages.join(', ')}</span>
                      </div>
                      <Button className="w-full" onClick={() => {
                        setActiveTab('book');
                        setSelectedExpert(expert);
                      }}>
                        Book with {expert.name.split(' ')[0]}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Consultation Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose the consultation format that works best for you
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {consultationTypes.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <service.icon className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{service.title}</CardTitle>
                          <CardDescription>{service.duration}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                        <Badge variant="outline">Popular</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">{service.description}</p>
                      <div>
                        <h4 className="font-semibold mb-2">Features:</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full" onClick={() => {
                        setActiveTab('book');
                        setSelectedService(service);
                      }}>
                        Choose {service.title}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 