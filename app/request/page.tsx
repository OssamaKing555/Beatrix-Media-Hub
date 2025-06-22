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
  Send, 
  FileText, 
  Clock, 
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Phone,
  Mail
} from 'lucide-react'
import { SecureForm } from '@/components/ui/secure-form'

const requestTypes = [
  {
    icon: FileText,
    title: 'Project Request',
    description: 'Submit a new project proposal or request for services',
    color: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  },
  {
    icon: MessageSquare,
    title: 'Consultation',
    description: 'Request a consultation or advisory session',
    color: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
  },
  {
    icon: Phone,
    title: 'Support',
    description: 'Get technical support or assistance',
    color: 'bg-green-500/20 text-green-300 border-green-500/30'
  },
  {
    icon: Mail,
    title: 'General Inquiry',
    description: 'Ask questions or request information',
    color: 'bg-orange-500/20 text-orange-300 border-orange-500/30'
  }
]

export default function RequestPage() {
  const [selectedType, setSelectedType] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'normal',
    budget: '',
    timeline: ''
  })

  const handleSubmit = async (formData: FormData, csrfToken: string) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real app, you would send this to your API
    console.log('Request submitted:', Object.fromEntries(formData))
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: '',
      priority: 'normal',
      budget: '',
      timeline: ''
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
              Submit Your Request
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              How Can We
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {' '}Help You?
              </span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Submit your request and our team will get back to you within 24 hours. 
              We're here to help with projects, consultations, support, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Request Types Section */}
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
              What Type of Request?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Choose the category that best describes your request
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {requestTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className={`bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer ${
                    selectedType === type.title ? 'ring-2 ring-purple-500 bg-white/10' : ''
                  }`}
                  onClick={() => setSelectedType(type.title)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`p-3 rounded-lg w-12 h-12 mx-auto mb-4 flex items-center justify-center ${type.color}`}>
                      <type.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{type.title}</h3>
                    <p className="text-sm text-white/70">{type.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form Section */}
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
                  Submit Your Request
                </CardTitle>
                <CardDescription className="text-white/70">
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SecureForm
                  onSubmit={handleSubmit}
                  securityBadgeText="Secure Request Form"
                  allowDevelopmentBypass={true}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-white">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
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
                      <Label htmlFor="company" className="text-white">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Enter your company name"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
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
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="subject" className="text-white">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Brief description of your request"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                      required
                    />
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="message" className="text-white">Detailed Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please provide detailed information about your request..."
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <Label htmlFor="priority" className="text-white">Priority Level</Label>
                      <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="w-full bg-white/5 border border-white/20 text-white rounded-md px-3 py-2 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="budget" className="text-white">Budget Range</Label>
                      <Input
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="e.g., $5,000 - $10,000"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="timeline" className="text-white">Timeline</Label>
                      <Input
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        placeholder="e.g., 2-3 months"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Request
                  </Button>
                </SecureForm>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
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
              What Happens Next?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Our streamlined process ensures you get the help you need quickly and efficiently
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Send,
                title: 'Submit Request',
                description: 'Fill out our secure form with your project details and requirements'
              },
              {
                icon: Clock,
                title: 'Review & Response',
                description: 'Our team reviews your request and responds within 24 hours'
              },
              {
                icon: CheckCircle,
                title: 'Project Start',
                description: 'Once approved, we begin working on your project immediately'
              }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="p-4 bg-purple-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
