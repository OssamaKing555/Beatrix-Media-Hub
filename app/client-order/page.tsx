'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  CreditCard, 
  FileText, 
  Calendar, 
  DollarSign, 
  Shield,
  CheckCircle,
  Clock,
  Truck,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SecureForm } from '@/components/ui/secure-form';
import { SecureBadge } from '@/components/ui/secure-badge';
import { SecurityAlert } from '@/components/ui/security-alert';

interface OrderStatus {
  id: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'review' | 'completed';
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  timestamp?: string;
}

export default function ClientOrderPage() {
  const [orderId, setOrderId] = useState<string>('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus[]>([
    {
      id: '1',
      status: 'pending',
      title: 'Order Submitted',
      description: 'Your order has been received and is being reviewed',
      icon: <FileText className="h-5 w-5" />,
      completed: true,
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      status: 'confirmed',
      title: 'Order Confirmed',
      description: 'Your order has been confirmed and payment processed',
      icon: <CheckCircle className="h-5 w-5" />,
      completed: true,
      timestamp: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      status: 'in_progress',
      title: 'In Progress',
      description: 'Our team is working on your project',
      icon: <Clock className="h-5 w-5" />,
      completed: false,
    },
    {
      id: '4',
      status: 'review',
      title: 'Review Phase',
      description: 'Project is ready for your review and feedback',
      icon: <Star className="h-5 w-5" />,
      completed: false,
    },
    {
      id: '5',
      status: 'completed',
      title: 'Completed',
      description: 'Project has been delivered successfully',
      icon: <Truck className="h-5 w-5" />,
      completed: false,
    },
  ]);

  const [securityAlert, setSecurityAlert] = useState<{
    type: 'success' | 'warning' | 'error' | 'info' | 'security';
    title?: string;
    message: string;
  } | null>(null);

  const handleOrderSubmit = async (formData: FormData, csrfToken: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate order ID
    const newOrderId = `ORD-${Date.now().toString().slice(-6)}`;
    setOrderId(newOrderId);
    
    // Show success message
    setSecurityAlert({
      type: 'success',
      title: 'Order Submitted Successfully',
      message: `Your order has been submitted with ID: ${newOrderId}. You will receive a confirmation email shortly.`
    });
  };

  const handleSecurityError = (error: string) => {
    setSecurityAlert({
      type: 'error',
      title: 'Security Error',
      message: error
    });
  };

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
          <div className="flex items-center justify-center mb-6">
            <Package className="h-12 w-12 text-purple-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Client Order
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Submit your project requirements and track your order progress with real-time updates
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
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
                      Submit Your Order
                    </CardTitle>
                    <CardDescription className="text-white/60">
                      Tell us about your project requirements
                    </CardDescription>
                  </div>
                  <SecureBadge type="secure" size="sm">
                    Protected
                  </SecureBadge>
                </div>
              </CardHeader>
              
              <CardContent>
                <SecureForm
                  onSubmit={handleOrderSubmit}
                  showSecurityBadge={false}
                  onSecurityError={handleSecurityError}
                >
                  <div className="space-y-6">
                    {/* Project Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Project Details</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="projectName" className="text-white">
                          Project Name *
                        </Label>
                        <Input
                          id="projectName"
                          name="projectName"
                          placeholder="Enter your project name"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="projectType" className="text-white">
                          Project Type *
                        </Label>
                        <select
                          id="projectType"
                          name="projectType"
                          className="w-full px-3 py-2 bg-white/5 border border-white/20 text-white rounded-md focus:border-purple-500 focus:outline-none"
                          required
                        >
                          <option value="">Select project type</option>
                          <option value="branding">Brand Identity & Design</option>
                          <option value="web">Web Development</option>
                          <option value="video">Video Production</option>
                          <option value="marketing">Digital Marketing</option>
                          <option value="consulting">Consulting</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-white">
                          Project Description *
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Describe your project requirements, goals, and vision..."
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500 min-h-[120px]"
                          required
                        />
                      </div>
                    </div>

                    {/* Budget & Timeline */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Budget & Timeline</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="budget" className="text-white">
                            Budget Range *
                          </Label>
                          <select
                            id="budget"
                            name="budget"
                            className="w-full px-3 py-2 bg-white/5 border border-white/20 text-white rounded-md focus:border-purple-500 focus:outline-none"
                            required
                          >
                            <option value="">Select budget range</option>
                            <option value="under-5k">Under $5,000</option>
                            <option value="5k-10k">$5,000 - $10,000</option>
                            <option value="10k-25k">$10,000 - $25,000</option>
                            <option value="25k-50k">$25,000 - $50,000</option>
                            <option value="50k-plus">$50,000+</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="timeline" className="text-white">
                            Timeline *
                          </Label>
                          <select
                            id="timeline"
                            name="timeline"
                            className="w-full px-3 py-2 bg-white/5 border border-white/20 text-white rounded-md focus:border-purple-500 focus:outline-none"
                            required
                          >
                            <option value="">Select timeline</option>
                            <option value="urgent">Urgent (1-2 weeks)</option>
                            <option value="standard">Standard (1-2 months)</option>
                            <option value="flexible">Flexible (2-6 months)</option>
                            <option value="long-term">Long-term (6+ months)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Contact Information</h3>
                      
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
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 text-lg font-semibold"
                    >
                      <Package className="mr-2 h-5 w-5" />
                      Submit Order
                    </Button>
                  </div>
                </SecureForm>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Tracking */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white">
                      Order Tracking
                    </CardTitle>
                    <CardDescription className="text-white/60">
                      Track your order progress in real-time
                    </CardDescription>
                  </div>
                  <SecureBadge type="verified" size="sm">
                    Live Updates
                  </SecureBadge>
                </div>
              </CardHeader>
              
              <CardContent>
                {orderId ? (
                  <div className="space-y-6">
                    {/* Order ID */}
                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-400">Order ID</p>
                          <p className="text-lg font-bold text-white">{orderId}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-purple-400" />
                      </div>
                    </div>

                    {/* Progress Timeline */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Progress Timeline</h3>
                      
                      <div className="space-y-4">
                        {orderStatus.map((status, index) => (
                          <div key={status.id} className="flex items-start space-x-4">
                            {/* Status Icon */}
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                              status.completed 
                                ? 'bg-green-500 text-white' 
                                : 'bg-white/10 text-white/40'
                            }`}>
                              {status.icon}
                            </div>
                            
                            {/* Status Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className={`text-sm font-semibold ${
                                  status.completed ? 'text-white' : 'text-white/60'
                                }`}>
                                  {status.title}
                                </h4>
                                {status.timestamp && (
                                  <span className="text-xs text-white/40">
                                    {new Date(status.timestamp).toLocaleTimeString()}
                                  </span>
                                )}
                              </div>
                              <p className={`text-sm ${
                                status.completed ? 'text-white/80' : 'text-white/40'
                              }`}>
                                {status.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-white/40 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      No Active Orders
                    </h3>
                    <p className="text-white/60">
                      Submit an order to start tracking your project progress
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Security Features Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-purple-400 mr-3" />
                <CardTitle className="text-xl font-bold text-white">
                  Security Features
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-purple-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">CSRF Protection</h4>
                  <p className="text-white/60 text-sm">
                    All forms are protected against cross-site request forgery attacks
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Real-time Validation</h4>
                  <p className="text-white/60 text-sm">
                    Input validation and sanitization in real-time
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-blue-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Session Security</h4>
                  <p className="text-white/60 text-sm">
                    Secure session management with automatic expiry
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
