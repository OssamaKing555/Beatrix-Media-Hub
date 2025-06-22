'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SecureForm } from '@/components/ui/secure-form'
import { SecureBadge } from '@/components/ui/secure-badge'
import { SecurityAlert } from '@/components/ui/security-alert'

export default function ContactPage() {
  const [securityAlert, setSecurityAlert] = useState<{
    type: 'success' | 'warning' | 'error' | 'info' | 'security';
    title?: string;
    message: string;
  } | null>(null)

  const handleContactSubmit = async (formData: FormData, csrfToken: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSecurityAlert({
      type: 'success',
      title: 'Message Sent Successfully',
      message: 'Thank you for your message! We will get back to you within 24 hours.'
    })
  }

  const handleSecurityError = (error: string) => {
    setSecurityAlert({
      type: 'error',
      title: 'Security Error',
      message: error
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Ready to start your next project? Let's discuss how we can help bring your vision to life.
          </p>
        </motion.div>

        {/* Security Alert */}
        {securityAlert && (
          <div className="mb-8">
            <SecurityAlert
              type={securityAlert.type}
              title={securityAlert.title}
              message={securityAlert.message}
              onClose={() => setSecurityAlert(null)}
              autoClose={securityAlert.type === 'success'}
              autoCloseDelay={5000}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white">
                      Send us a Message
                    </CardTitle>
                    <CardDescription className="text-white/60">
                      Fill out the form below and we'll get back to you
                    </CardDescription>
                  </div>
                  <SecureBadge type="secure" size="sm">
                    Protected
                  </SecureBadge>
                </div>
              </CardHeader>
              
              <CardContent>
                <SecureForm
                  onSubmit={handleContactSubmit}
                  showSecurityBadge={false}
                  onSecurityError={handleSecurityError}
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-white">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Your first name"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-white">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Your last name"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What's this about?"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your project or inquiry..."
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500 min-h-[120px]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 text-lg font-semibold"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </div>
                </SecureForm>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">
                  Contact Information
                </CardTitle>
                <CardDescription className="text-white/60">
                  Get in touch with us through any of these channels
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Email</h4>
                    <p className="text-white/60">hello@beatrixhub.com</p>
                    <p className="text-white/60">support@beatrixhub.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Phone</h4>
                    <p className="text-white/60">+1 (555) 123-4567</p>
                    <p className="text-white/60">Mon-Fri: 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Office</h4>
                    <p className="text-white/60">123 Creative Street</p>
                    <p className="text-white/60">New York, NY 10001</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Quick Response</h4>
                    <p className="text-white/60">We typically respond within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 