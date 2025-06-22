'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Briefcase, Award, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SecureForm } from '@/components/ui/secure-form'
import { SecureBadge } from '@/components/ui/secure-badge'
import { SecurityAlert } from '@/components/ui/security-alert'

export default function JoinPage() {
  const [securityAlert, setSecurityAlert] = useState<{
    type: 'success' | 'warning' | 'error' | 'info' | 'security';
    title?: string;
    message: string;
  } | null>(null)

  const handleFreelancerSubmit = async (formData: FormData, csrfToken: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSecurityAlert({
      type: 'success',
      title: 'Application Submitted',
      message: 'Thank you for your application! We will review your profile and get back to you within 5-7 business days.'
    })
  }

  const handleExpertSubmit = async (formData: FormData, csrfToken: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSecurityAlert({
      type: 'success',
      title: 'Application Submitted',
      message: 'Thank you for your expert application! Our team will review your credentials and contact you within 3-5 business days.'
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
            Join Our Team
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Become part of our creative community. Whether you're a talented freelancer or an industry expert, 
            we have opportunities for you to grow and succeed.
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

        {/* Application Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs defaultValue="freelancer" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 bg-white/5 backdrop-blur-sm border-white/10">
              <TabsTrigger value="freelancer" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                <Users className="mr-2 h-4 w-4" />
                Freelancer
              </TabsTrigger>
              <TabsTrigger value="expert" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                <Award className="mr-2 h-4 w-4" />
                Expert
              </TabsTrigger>
            </TabsList>

            {/* Freelancer Application */}
            <TabsContent value="freelancer" className="mt-8">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-white">
                        Freelancer Application
                      </CardTitle>
                      <CardDescription className="text-white/60">
                        Join our network of talented freelancers and work on exciting projects
                      </CardDescription>
                    </div>
                    <SecureBadge type="secure" size="sm">
                      Protected
                    </SecureBadge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <SecureForm
                    onSubmit={handleFreelancerSubmit}
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
                        <Label htmlFor="skills" className="text-white">
                          Skills & Expertise *
                        </Label>
                        <Input
                          id="skills"
                          name="skills"
                          placeholder="e.g., Graphic Design, Video Editing, Web Development"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience" className="text-white">
                          Years of Experience *
                        </Label>
                        <Input
                          id="experience"
                          name="experience"
                          type="number"
                          min="0"
                          max="50"
                          placeholder="5"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="portfolio" className="text-white">
                          Portfolio URL
                        </Label>
                        <Input
                          id="portfolio"
                          name="portfolio"
                          type="url"
                          placeholder="https://your-portfolio.com"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="motivation" className="text-white">
                          Why do you want to join? *
                        </Label>
                        <Textarea
                          id="motivation"
                          name="motivation"
                          placeholder="Tell us about your motivation and what you hope to achieve..."
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500 min-h-[120px]"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 text-lg font-semibold"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        Submit Application
                      </Button>
                    </div>
                  </SecureForm>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Expert Application */}
            <TabsContent value="expert" className="mt-8">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-white">
                        Expert Application
                      </CardTitle>
                      <CardDescription className="text-white/60">
                        Join our network of industry experts and thought leaders
                      </CardDescription>
                    </div>
                    <SecureBadge type="secure" size="sm">
                      Protected
                    </SecureBadge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <SecureForm
                    onSubmit={handleExpertSubmit}
                    showSecurityBadge={false}
                    onSecurityError={handleSecurityError}
                  >
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expertFirstName" className="text-white">
                            First Name *
                          </Label>
                          <Input
                            id="expertFirstName"
                            name="firstName"
                            placeholder="Your first name"
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="expertLastName" className="text-white">
                            Last Name *
                          </Label>
                          <Input
                            id="expertLastName"
                            name="lastName"
                            placeholder="Your last name"
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expertEmail" className="text-white">
                          Email Address *
                        </Label>
                        <Input
                          id="expertEmail"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expertTitle" className="text-white">
                          Professional Title *
                        </Label>
                        <Input
                          id="expertTitle"
                          name="title"
                          placeholder="e.g., Senior Creative Director, Industry Consultant"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expertCompany" className="text-white">
                          Current Company/Organization
                        </Label>
                        <Input
                          id="expertCompany"
                          name="company"
                          placeholder="Your current company or organization"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expertExpertise" className="text-white">
                          Areas of Expertise *
                        </Label>
                        <Input
                          id="expertExpertise"
                          name="expertise"
                          placeholder="e.g., Brand Strategy, Digital Marketing, Creative Direction"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expertExperience" className="text-white">
                          Years of Industry Experience *
                        </Label>
                        <Input
                          id="expertExperience"
                          name="experience"
                          type="number"
                          min="0"
                          max="50"
                          placeholder="10"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expertLinkedIn" className="text-white">
                          LinkedIn Profile
                        </Label>
                        <Input
                          id="expertLinkedIn"
                          name="linkedin"
                          type="url"
                          placeholder="https://linkedin.com/in/yourprofile"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expertBio" className="text-white">
                          Professional Bio *
                        </Label>
                        <Textarea
                          id="expertBio"
                          name="bio"
                          placeholder="Tell us about your professional background, achievements, and expertise..."
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500 min-h-[120px]"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expertValue" className="text-white">
                          How can you add value to our community? *
                        </Label>
                        <Textarea
                          id="expertValue"
                          name="value"
                          placeholder="Describe how your expertise can benefit our clients and community..."
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500 min-h-[120px]"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 text-lg font-semibold"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        Submit Expert Application
                      </Button>
                    </div>
                  </SecureForm>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Join BEATRIX?
            </h2>
            <p className="text-xl text-white/70">
              Discover the benefits of being part of our creative community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Exciting Projects</h3>
                <p className="text-white/60">
                  Work on diverse, high-profile projects with leading brands and innovative startups.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Professional Growth</h3>
                <p className="text-white/60">
                  Access to training, mentorship, and opportunities to expand your skills and network.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Flexible Work</h3>
                <p className="text-white/60">
                  Choose your projects, set your rates, and work on your own schedule from anywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
