'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Star, 
  MessageSquare, 
  Users,
  Award,
  BookOpen,
  Video,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  User,
  Settings,
  Plus
} from 'lucide-react';

interface Consultation {
  id: string;
  clientName: string;
  clientEmail: string;
  topic: string;
  description: string;
  duration: number;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  type: 'video' | 'phone' | 'in_person';
  rate: number;
}

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  rate: number;
  duration: number;
  isActive: boolean;
}

interface Message {
  id: string;
  from: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  urgent: boolean;
}

const mockConsultations: Consultation[] = [
  {
    id: 'cons-1',
    clientName: 'Ahmed Hassan',
    clientEmail: 'ahmed@techstart.com',
    topic: 'Business Strategy Consultation',
    description: 'Need guidance on scaling our startup and entering new markets.',
    duration: 60,
    date: '2024-12-20',
    time: '14:00',
    status: 'confirmed',
    type: 'video',
    rate: 150
  },
  {
    id: 'cons-2',
    clientName: 'Fatima Zahra',
    clientEmail: 'fatima@innovate.com',
    topic: 'Legal Compliance Review',
    description: 'Review of our current legal structure and compliance requirements.',
    duration: 90,
    date: '2024-12-21',
    time: '10:00',
    status: 'pending',
    type: 'phone',
    rate: 150
  },
  {
    id: 'cons-3',
    clientName: 'Omar Khalil',
    clientEmail: 'omar@globalind.com',
    topic: 'Financial Planning',
    description: 'Help with financial planning and investment strategies.',
    duration: 120,
    date: '2024-12-22',
    time: '16:00',
    status: 'pending',
    type: 'in_person',
    rate: 150
  }
];

const mockServices: Service[] = [
  {
    id: 'service-1',
    title: 'Business Strategy Consultation',
    description: 'Comprehensive business strategy development and planning',
    category: 'Business',
    rate: 150,
    duration: 60,
    isActive: true
  },
  {
    id: 'service-2',
    title: 'Legal Compliance Review',
    description: 'Legal structure review and compliance assessment',
    category: 'Legal',
    rate: 150,
    duration: 90,
    isActive: true
  },
  {
    id: 'service-3',
    title: 'Financial Planning',
    description: 'Personal and business financial planning services',
    category: 'Finance',
    rate: 150,
    duration: 120,
    isActive: false
  }
];

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    from: 'ahmed@techstart.com',
    subject: 'Consultation Preparation',
    preview: 'Hi Dr. Karim, I wanted to prepare some questions for our session tomorrow...',
    timestamp: '2024-12-19T15:30:00Z',
    read: false,
    urgent: false
  },
  {
    id: 'msg-2',
    from: 'admin@beatrixhub.com',
    subject: 'New Consultation Request',
    preview: 'You have received a new consultation request from a high-priority client...',
    timestamp: '2024-12-19T12:00:00Z',
    read: false,
    urgent: true
  },
  {
    id: 'msg-3',
    from: 'fatima@innovate.com',
    subject: 'Follow-up Questions',
    preview: 'Thank you for the consultation yesterday. I have some follow-up questions...',
    timestamp: '2024-12-18T09:15:00Z',
    read: true,
    urgent: false
  }
];

export default function ExpertDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [consultations, setConsultations] = useState<Consultation[]>(mockConsultations);
  const [services, setServices] = useState<Service[]>(mockServices);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedDate, setSelectedDate] = useState('2024-12-20');

  const stats = [
    { title: 'Upcoming Consultations', value: consultations.filter(c => c.status === 'confirmed').length, icon: Calendar, color: 'text-blue-600' },
    { title: 'Completed This Month', value: 12, icon: CheckCircle, color: 'text-green-600' },
    { title: 'Total Earnings', value: '$8,450', icon: DollarSign, color: 'text-purple-600' },
    { title: 'Average Rating', value: '4.9', icon: Star, color: 'text-yellow-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'phone': return Phone;
      case 'in_person': return Users;
      default: return Video;
    }
  };

  const handleConsultationStatusChange = (consultationId: string, newStatus: string) => {
    setConsultations(consultations.map(cons => 
      cons.id === consultationId ? { ...cons, status: newStatus as any } : cons
    ));
  };

  const markMessageAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const todayConsultations = consultations.filter(c => c.date === selectedDate);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Expert Dashboard</h1>
            <p className="text-gray-600">Welcome back, Dr. Karim! Manage your consultations and services</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Service
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="consultations">Consultations</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Today's Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Today's Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {todayConsultations.length > 0 ? (
                      todayConsultations.map((consultation) => {
                        const TypeIcon = getTypeIcon(consultation.type);
                        return (
                          <div key={consultation.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <TypeIcon className="w-4 h-4 text-gray-600" />
                                <h4 className="font-medium">{consultation.topic}</h4>
                              </div>
                              <Badge className={getStatusColor(consultation.status)}>
                                {consultation.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{consultation.clientName}</p>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">{consultation.time} ({consultation.duration}min)</span>
                              <span className="font-medium">${consultation.rate}</span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No consultations scheduled for today</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Messages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Recent Messages
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {messages.slice(0, 3).map((message) => (
                      <div 
                        key={message.id} 
                        className={`p-3 rounded-lg border-l-4 cursor-pointer ${
                          message.read ? 'bg-gray-50' : 'bg-blue-50'
                        } ${
                          message.urgent ? 'border-l-red-500' : 'border-l-blue-500'
                        }`}
                        onClick={() => markMessageAsRead(message.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-sm">{message.subject}</h5>
                            <p className="text-sm text-gray-600">{message.preview}</p>
                            <p className="text-xs text-gray-500 mt-1">{message.from}</p>
                          </div>
                          {!message.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(message.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Consultations Tab */}
            <TabsContent value="consultations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Consultation Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {consultations.map((consultation) => {
                      const TypeIcon = getTypeIcon(consultation.type);
                      return (
                        <div key={consultation.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">{consultation.topic}</h3>
                              <p className="text-gray-600">{consultation.clientName}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(consultation.status)}>
                                {consultation.status}
                              </Badge>
                              <TypeIcon className="w-4 h-4 text-gray-600" />
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{consultation.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {consultation.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {consultation.time} ({consultation.duration}min)
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                ${consultation.rate}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Select 
                                value={consultation.status} 
                                onValueChange={(value) => handleConsultationStatusChange(consultation.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button variant="outline" size="sm">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>My Services</CardTitle>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Service
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{service.title}</h3>
                            <p className="text-gray-600">{service.category}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={service.isActive ? "default" : "secondary"}>
                              {service.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{service.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              ${service.rate}/hour
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {service.duration} min
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              {service.isActive ? 'Deactivate' : 'Activate'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                          message.read ? '' : 'bg-blue-50'
                        }`}
                        onClick={() => markMessageAsRead(message.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{message.subject}</h4>
                              {message.urgent && (
                                <Badge variant="destructive" className="text-xs">Urgent</Badge>
                              )}
                              {!message.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{message.preview}</p>
                            <p className="text-xs text-gray-500">{message.from}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              {new Date(message.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
