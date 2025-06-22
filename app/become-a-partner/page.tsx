'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Handshake, 
  Users, 
  TrendingUp, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Target,
  Zap
} from 'lucide-react'
import { SecureForm } from '@/components/ui/secure-form'

const partnershipTypes = [
  {
    icon: Users,
    title: 'Agency Partnership',
    description: 'Join our network of trusted agencies and expand your service offerings',
    benefits: ['Revenue sharing', 'White-label solutions', 'Technical support', 'Marketing materials'],
    requirements: ['Minimum 2 years in business', '5+ team members', 'Portfolio of work']
  },
  {
    icon: TrendingUp,
    title: 'Technology Partnership',
    description: 'Integrate our technology into your products and services',
    benefits: ['API access', 'Custom integrations', 'Priority support', 'Co-marketing opportunities'],
    requirements: ['Technical expertise', 'Active user base', 'Compliance standards']
  },
  {
    icon: Globe,
    title: 'Global Reseller',
    description: 'Resell our services in your region with exclusive territory rights',
    benefits: ['Exclusive territories', 'Competitive pricing', 'Training programs', 'Sales support'],
    requirements: ['Regional presence', 'Sales team', 'Market knowledge']
  },
  {
    icon: Target,
    title: 'Strategic Alliance',
    description: 'Form strategic partnerships for joint ventures and collaborative projects',
    benefits: ['Joint ventures', 'Shared resources', 'Market expansion', 'Innovation projects'],
    requirements: ['Strategic alignment', 'Complementary services', 'Growth mindset']
  }
]

const benefits = [
  {
    icon: Zap,
    title: 'Revenue Growth',
    description: 'Access new revenue streams and expand your business opportunities'
  },
  {
    icon: Users,
    title: 'Network Access',
    description: 'Connect with our global network of clients and partners'
  },
  {
    icon: Award,
    title: 'Brand Recognition',
    description: 'Leverage our established brand and market presence'
  },
  {
    icon: Star,
    title: 'Exclusive Benefits',
    description: 'Get priority access to new features and exclusive deals'
  }
]

export default function BecomeAPartnerPage() {
  const [selectedType, setSelectedType] = useState<string>('')
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    teamSize: '',
    experience: '',
    motivation: '',
    partnershipGoals: ''
  })

  const handleSubmit = async (formData: FormData, csrfToken: string) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real app, you would send this to your API
    console.log('Partnership application submitted:', Object.fromEntries(formData))
    
    // Reset form
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      website: '',
      industry: '',
      teamSize: '',
      experience: '',
      motivation: '',
      partnershipGoals: ''
    })
    setSelectedType('')
  }

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
              Partnership Opportunities
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Become Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {' '}Partner
              </span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Join our global network of partners and unlock new opportunities for growth, 
              innovation, and success. Together, we can achieve more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <a href="#partnership-types">
                  Explore Opportunities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                Download Partner Kit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Why Partner With Us?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Discover the advantages of joining our partner ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="p-4 bg-purple-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <benefit.icon className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types Section */}
      <section id="partnership-types" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Partnership Types
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Choose the partnership model that best fits your business goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {partnershipTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-purple-500/20 rounded-lg mr-4">
                        <type.icon className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">{type.title}</CardTitle>
                        <CardDescription className="text-white/70">
                          {type.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-white mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {type.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-center text-sm text-white/70">
                              <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-white mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {type.requirements.map((requirement) => (
                            <li key={requirement} className="flex items-center text-sm text-white/70">
                              <CheckCircle className="h-3 w-3 mr-2 text-blue-400" />
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      onClick={() => setSelectedType(type.title)}
                    >
                      Apply for {type.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-white">
                  Partnership Application
                </CardTitle>
                <CardDescription className="text-white/70">
                  Tell us about your company and partnership goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SecureForm
                  onSubmit={handleSubmit}
                  securityBadgeText="Secure Partnership Application"
                  allowDevelopmentBypass={true}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyName" className="text-white">Company Name *</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Enter your company name"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="contactName" className="text-white">Contact Person *</Label>
                      <Input
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="Enter contact person name"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-white">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-white">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter your phone number"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="website" className="text-white">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="Enter your website URL"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="industry" className="text-white">Industry *</Label>
                      <Input
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        placeholder="e.g., Technology, Healthcare, Finance"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="teamSize" className="text-white">Team Size</Label>
                      <select
                        id="teamSize"
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full bg-white/5 border border-white/20 text-white rounded-md px-3 py-2 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="">Select team size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="experience" className="text-white">Years in Business</Label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full bg-white/5 border border-white/20 text-white rounded-md px-3 py-2 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="">Select years</option>
                        <option value="0-1">0-1 years</option>
                        <option value="2-5">2-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="11-20">11-20 years</option>
                        <option value="20+">20+ years</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="motivation" className="text-white">Why Partner With Us? *</Label>
                    <Textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      placeholder="Tell us why you want to partner with us..."
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="partnershipGoals" className="text-white">Partnership Goals *</Label>
                    <Textarea
                      id="partnershipGoals"
                      name="partnershipGoals"
                      value={formData.partnershipGoals}
                      onChange={(e) => setFormData({ ...formData, partnershipGoals: e.target.value })}
                      placeholder="What do you hope to achieve through this partnership?"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Handshake className="mr-2 h-4 w-4" />
                    Submit Partnership Application
                  </Button>
                </SecureForm>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Join Our Partner Network?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Start your partnership journey today and unlock new opportunities for growth and success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <a href="#partnership-types">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                Contact Sales Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
