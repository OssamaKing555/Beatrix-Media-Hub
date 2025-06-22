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
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  User,
  CalendarDays,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export default function AdminConsultations() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const consultations = [
    {
      id: 1,
      clientName: 'John Smith',
      clientEmail: 'john@example.com',
      expertName: 'Dr. Sarah Johnson',
      expertSpecialty: 'Business Strategy',
      type: 'Video Consultation',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '60 minutes',
      status: 'confirmed',
      price: 150,
      topic: 'Business expansion strategy for tech startup',
      notes: 'Client wants to discuss international market entry'
    },
    {
      id: 2,
      clientName: 'Maria Garcia',
      clientEmail: 'maria@example.com',
      expertName: 'Michael Chen',
      expertSpecialty: 'Technology Consulting',
      type: 'Phone Consultation',
      date: '2024-01-16',
      time: '02:00 PM',
      duration: '30 minutes',
      status: 'pending',
      price: 90,
      topic: 'Software architecture review',
      notes: 'Need to review current system design'
    },
    {
      id: 3,
      clientName: 'David Wilson',
      clientEmail: 'david@example.com',
      expertName: 'Emily Rodriguez',
      expertSpecialty: 'Marketing & Growth',
      type: 'Chat Consultation',
      date: '2024-01-17',
      time: '11:00 AM',
      duration: '45 minutes',
      status: 'completed',
      price: 67.5,
      topic: 'Digital marketing strategy',
      notes: 'Successfully completed - client satisfied'
    },
    {
      id: 4,
      clientName: 'Lisa Brown',
      clientEmail: 'lisa@example.com',
      expertName: 'Dr. Sarah Johnson',
      expertSpecialty: 'Business Strategy',
      type: 'Video Consultation',
      date: '2024-01-18',
      time: '03:00 PM',
      duration: '60 minutes',
      status: 'cancelled',
      price: 150,
      topic: 'Strategic planning session',
      notes: 'Client requested cancellation due to emergency'
    }
  ];

  const experts = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Business Strategy',
      rating: 4.9,
      totalConsultations: 45,
      hourlyRate: 150,
      availability: 'Mon-Fri, 9AM-6PM',
      status: 'active'
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Technology Consulting',
      rating: 4.8,
      totalConsultations: 32,
      hourlyRate: 180,
      availability: 'Mon-Sat, 10AM-8PM',
      status: 'active'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      specialty: 'Marketing & Growth',
      rating: 4.9,
      totalConsultations: 28,
      hourlyRate: 120,
      availability: 'Mon-Fri, 8AM-5PM',
      status: 'active'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return CheckCircle;
      case 'pending': return Clock;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return AlertCircle;
    }
  };

  const filteredConsultations = consultations.filter(consultation =>
    consultation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.expertName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    {
      title: 'Total Consultations',
      value: consultations.length,
      change: '+12%',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Confirmed',
      value: consultations.filter(c => c.status === 'confirmed').length,
      change: '+8%',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Completed',
      value: consultations.filter(c => c.status === 'completed').length,
      change: '+15%',
      icon: CheckCircle,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Revenue',
      value: `$${consultations.reduce((sum, c) => sum + c.price, 0).toLocaleString()}`,
      change: '+23%',
      icon: DollarSign,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Consultation Management</h1>
              <p className="text-white/60 mt-2">Manage consultations and expert schedules</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Consultation
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                    <p className="text-green-400 text-sm mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-sm border-white/10">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-500">
              Overview
            </TabsTrigger>
            <TabsTrigger value="consultations" className="text-white data-[state=active]:bg-purple-500">
              Consultations
            </TabsTrigger>
            <TabsTrigger value="experts" className="text-white data-[state=active]:bg-purple-500">
              Experts
            </TabsTrigger>
            <TabsTrigger value="schedule" className="text-white data-[state=active]:bg-purple-500">
              Schedule
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Consultations */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Recent Consultations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {consultations.slice(0, 5).map((consultation) => {
                      const StatusIcon = getStatusIcon(consultation.status);
                      return (
                        <div key={consultation.id} className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            consultation.status === 'confirmed' ? 'bg-green-400' : 
                            consultation.status === 'pending' ? 'bg-yellow-400' :
                            consultation.status === 'completed' ? 'bg-blue-400' : 'bg-red-400'
                          }`} />
                          <div className="flex-1">
                            <p className="text-white font-medium">{consultation.clientName}</p>
                            <p className="text-white/60 text-sm">{consultation.expertName} • {consultation.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white text-sm">{consultation.date}</p>
                            <p className="text-white/60 text-xs">{consultation.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Expert Performance */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Expert Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {experts.map((expert) => (
                      <div key={expert.id} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {expert.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{expert.name}</p>
                          <p className="text-white/60 text-sm">{expert.specialty}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-white text-sm">{expert.rating}</span>
                          </div>
                          <p className="text-white/60 text-xs">{expert.totalConsultations} consultations</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Consultations Tab */}
          <TabsContent value="consultations" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                  <Input
                    placeholder="Search consultations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/60"
                  />
                </div>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredConsultations.map((consultation) => {
                const StatusIcon = getStatusIcon(consultation.status);
                return (
                  <Card key={consultation.id} className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {consultation.clientName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{consultation.clientName}</h3>
                            <p className="text-white/60 text-sm">{consultation.clientEmail}</p>
                            <p className="text-white/60 text-sm">{consultation.topic}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-white font-semibold">{consultation.expertName}</p>
                            <p className="text-white/60 text-sm">{consultation.expertSpecialty}</p>
                            <p className="text-white/60 text-sm">{consultation.date} at {consultation.time}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(consultation.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {consultation.status}
                            </Badge>
                            <p className="text-white font-semibold">${consultation.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Experts Tab */}
          <TabsContent value="experts" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {experts.map((expert) => (
                <Card key={expert.id} className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {expert.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">{expert.name}</CardTitle>
                        <CardDescription className="text-white/60">{expert.specialty}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold">{expert.rating}</span>
                      </div>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        {expert.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Hourly Rate:</span>
                        <span className="text-white">${expert.hourlyRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Total Consultations:</span>
                        <span className="text-white">{expert.totalConsultations}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Availability:</span>
                        <span className="text-white">{expert.availability}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Consultation Schedule</CardTitle>
                <CardDescription className="text-white/60">
                  View and manage upcoming consultations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consultations.filter(c => c.status === 'confirmed').map((consultation) => (
                    <div key={consultation.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {consultation.clientName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{consultation.clientName}</p>
                          <p className="text-white/60 text-sm">{consultation.expertName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{consultation.date}</p>
                        <p className="text-white/60 text-sm">{consultation.time} ({consultation.duration})</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Confirmed
                        </Badge>
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 