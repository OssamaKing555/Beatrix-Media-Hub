'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Rocket, 
  Users, 
  Home, 
  Check, 
  ArrowRight,
  Star,
  Zap,
  Crown
} from 'lucide-react'

type UserType = 'startup' | 'company' | 'marketing_agency' | 'internal_office' | 'freelancer' | 'expert'

interface Package {
  id: string
  name: string
  price: number
  features: string[]
  popular?: boolean
  icon: any
}

const packages: Record<string, Package[]> = {
  startup: [
    {
      id: 'basic',
      name: 'Basic',
      price: 299,
      features: ['Up to 5 team members', 'Basic consultation hours', 'Email support', 'Standard templates'],
      icon: Star
    },
    {
      id: 'growth',
      name: 'Growth',
      price: 599,
      features: ['Up to 15 team members', 'Priority consultation', 'Phone support', 'Custom templates', 'Analytics dashboard'],
      popular: true,
      icon: Zap
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 1299,
      features: ['Unlimited team members', 'Dedicated consultant', '24/7 support', 'Custom integrations', 'White-label options'],
      icon: Crown
    }
  ],
  company: [
    {
      id: 'starter',
      name: 'Starter',
      price: 499,
      features: ['Up to 10 employees', 'Basic services', 'Email support', 'Monthly reports'],
      icon: Star
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 999,
      features: ['Up to 50 employees', 'Full service suite', 'Priority support', 'Weekly reports', 'Custom solutions'],
      popular: true,
      icon: Zap
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 2499,
      features: ['Unlimited employees', 'Dedicated team', '24/7 support', 'Custom development', 'API access'],
      icon: Crown
    }
  ]
}

export default function JoinPage() {
  const [userType, setUserType] = useState<UserType | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [step, setStep] = useState<'type' | 'package' | 'form'>('type')
  const [formData, setFormData] = useState<any>({})

  const userTypes = [
    {
      id: 'startup',
      title: 'Startup',
      description: 'Growing companies seeking guidance and resources',
      icon: Rocket,
      color: 'bg-blue-500'
    },
    {
      id: 'company',
      title: 'Company',
      description: 'Established businesses looking for comprehensive solutions',
      icon: Building2,
      color: 'bg-green-500'
    },
    {
      id: 'marketing_agency',
      title: 'Marketing Agency',
      description: 'Agencies seeking consultation and integration services',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      id: 'internal_office',
      title: 'Internal Office',
      description: 'Request office space and internal services',
      icon: Home,
      color: 'bg-orange-500'
    },
    {
      id: 'freelancer',
      title: 'Freelancer',
      description: 'Join our network of creative professionals',
      icon: Users,
      color: 'bg-pink-500'
    },
    {
      id: 'expert',
      title: 'Expert',
      description: 'Share your expertise and consult with clients',
      icon: Star,
      color: 'bg-yellow-500'
    }
  ]

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type)
    if (['startup', 'company'].includes(type)) {
      setStep('package')
    } else {
      setStep('form')
    }
  }

  const handlePackageSelect = (pkgId: string) => {
    setSelectedPackage(pkgId)
    setStep('form')
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission based on user type
    console.log('Form submitted:', { userType, selectedPackage, formData })
    // Redirect to success page or dashboard
  }

  const renderUserTypeSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Join Beatrix Media Hub</h1>
        <p className="text-xl text-gray-600">Choose your path to success</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userTypes.map((type) => {
          const Icon = type.icon
          return (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => handleUserTypeSelect(type.id as UserType)}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto mb-4 p-4 rounded-full ${type.color} w-fit`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{type.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )

  const renderPackageSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-lg text-gray-600">Select the perfect package for your needs</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {packages[userType!]?.map((pkg) => {
          const Icon = pkg.icon
          return (
            <motion.div
              key={pkg.id}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  Most Popular
                </Badge>
              )}
              <Card 
                className={`cursor-pointer transition-all duration-300 ${
                  pkg.popular ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handlePackageSelect(pkg.id)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold">${pkg.price}<span className="text-sm text-gray-500">/year</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )

  const renderForm = () => {
    const getFormFields = () => {
      switch (userType) {
        case 'startup':
          return (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    id="companyName" 
                    value={formData.companyName || ''}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input 
                    id="contactPerson" 
                    value={formData.contactPerson || ''}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fieldOfWork">Field of Work</Label>
                  <Input 
                    id="fieldOfWork" 
                    value={formData.fieldOfWork || ''}
                    onChange={(e) => setFormData({...formData, fieldOfWork: e.target.value})}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input 
                    id="website" 
                    type="url"
                    value={formData.website || ''}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="pitch">Pitch or Goals</Label>
                <Textarea 
                  id="pitch" 
                  rows={4}
                  value={formData.pitch || ''}
                  onChange={(e) => setFormData({...formData, pitch: e.target.value})}
                  placeholder="Tell us about your startup and what you hope to achieve..."
                  required 
                />
              </div>
            </>
          )
        case 'company':
          return (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    id="companyName" 
                    value={formData.companyName || ''}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="companySector">Company Sector</Label>
                  <Select value={formData.companySector || ''} onValueChange={(value) => setFormData({...formData, companySector: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input 
                    id="contactName" 
                    value={formData.contactName || ''}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="employeeCount">Number of Employees</Label>
                  <Select value={formData.employeeCount || ''} onValueChange={(value) => setFormData({...formData, employeeCount: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10</SelectItem>
                      <SelectItem value="11-50">11-50</SelectItem>
                      <SelectItem value="51-200">51-200</SelectItem>
                      <SelectItem value="201-1000">201-1000</SelectItem>
                      <SelectItem value="1000+">1000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="serviceNeeds">Service Needs</Label>
                <Textarea 
                  id="serviceNeeds" 
                  rows={4}
                  value={formData.serviceNeeds || ''}
                  onChange={(e) => setFormData({...formData, serviceNeeds: e.target.value})}
                  placeholder="Describe the services you're looking for..."
                  required 
                />
              </div>
            </>
          )
        case 'marketing_agency':
          return (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="agencyName">Agency Name</Label>
                  <Input 
                    id="agencyName" 
                    value={formData.agencyName || ''}
                    onChange={(e) => setFormData({...formData, agencyName: e.target.value})}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="clientType">Type of Clients</Label>
                  <Select value={formData.clientType || ''} onValueChange={(value) => setFormData({...formData, clientType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startups">Startups</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="sme">SMEs</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthlyRequests">Expected Monthly Requests</Label>
                  <Select value={formData.monthlyRequests || ''} onValueChange={(value) => setFormData({...formData, monthlyRequests: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10</SelectItem>
                      <SelectItem value="11-50">11-50</SelectItem>
                      <SelectItem value="51-100">51-100</SelectItem>
                      <SelectItem value="100+">100+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>
              </div>
            </>
          )
        case 'internal_office':
          return (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Select value={formData.teamSize || ''} onValueChange={(value) => setFormData({...formData, teamSize: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5 people</SelectItem>
                      <SelectItem value="6-15">6-15 people</SelectItem>
                      <SelectItem value="16-30">16-30 people</SelectItem>
                      <SelectItem value="30+">30+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="officeType">Office Type</Label>
                  <Select value={formData.officeType || ''} onValueChange={(value) => setFormData({...formData, officeType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select office type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shared">Shared Space</SelectItem>
                      <SelectItem value="private">Private Office</SelectItem>
                      <SelectItem value="remote">Remote Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="preferredLocation">Preferred Location (Optional)</Label>
                <Input 
                  id="preferredLocation" 
                  value={formData.preferredLocation || ''}
                  onChange={(e) => setFormData({...formData, preferredLocation: e.target.value})}
                  placeholder="City, Country"
                />
              </div>
              <div>
                <Label htmlFor="billingContact">Billing Contact</Label>
                <Input 
                  id="billingContact" 
                  value={formData.billingContact || ''}
                  onChange={(e) => setFormData({...formData, billingContact: e.target.value})}
                  required 
                />
              </div>
            </>
          )
        default:
          return (
            <div className="text-center py-8">
              <p className="text-gray-600">Form for {userType} coming soon...</p>
            </div>
          )
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Complete Your Registration</h2>
          <p className="text-lg text-gray-600">Tell us more about yourself</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {getFormFields()}
              
              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(selectedPackage ? 'package' : 'type')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1">
                  Submit Application
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {step === 'type' && renderUserTypeSelection()}
        {step === 'package' && renderPackageSelection()}
        {step === 'form' && renderForm()}
      </div>
    </div>
  )
}
