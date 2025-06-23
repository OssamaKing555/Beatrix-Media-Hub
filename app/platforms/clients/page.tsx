'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Briefcase, 
  Clock, 
  DollarSign, 
  Star, 
  MessageSquare, 
  Users,
  FileText,
  Download,
  Eye,
  Plus,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Settings,
  Upload,
  Send,
  Receipt
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in_progress' | 'review' | 'completed';
  progress: number;
  startDate: string;
  endDate: string;
  budget: string;
  team: string[];
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'review';
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'draft' | 'submitted' | 'in_review' | 'approved' | 'in_progress' | 'completed';
  submittedDate: string;
  estimatedCost: string;
  priority: 'low' | 'medium' | 'high';
}

interface Invoice {
  id: string;
  projectTitle: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string;
  issueDate: string;
  description: string;
}

const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Brand Identity Redesign',
    description: 'Complete rebranding including logo, color palette, and brand guidelines',
    status: 'in_progress',
    progress: 65,
    startDate: '2024-11-01',
    endDate: '2024-12-25',
    budget: '$15,000',
    team: ['Sara Ahmed', 'Ahmed Hassan'],
    tasks: [
      {
        id: 'task-1',
        title: 'Logo Design',
        description: 'Create new logo variations',
        status: 'completed',
        assignedTo: 'Sara Ahmed',
        dueDate: '2024-12-15',
        priority: 'high'
      },
      {
        id: 'task-2',
        title: 'Brand Guidelines',
        description: 'Develop comprehensive brand guidelines',
        status: 'in_progress',
        assignedTo: 'Ahmed Hassan',
        dueDate: '2024-12-20',
        priority: 'medium'
      },
      {
        id: 'task-3',
        title: 'Website Updates',
        description: 'Update website with new branding',
        status: 'pending',
        assignedTo: 'Sara Ahmed',
        dueDate: '2024-12-25',
        priority: 'high'
      }
    ]
  },
  {
    id: 'proj-2',
    title: 'Marketing Campaign',
    description: 'Digital marketing campaign for Q1 product launch',
    status: 'planning',
    progress: 25,
    startDate: '2024-12-20',
    endDate: '2024-03-20',
    budget: '$8,000',
    team: ['Fatima Zahra'],
    tasks: [
      {
        id: 'task-4',
        title: 'Campaign Strategy',
        description: 'Develop marketing strategy and timeline',
        status: 'in_progress',
        assignedTo: 'Fatima Zahra',
        dueDate: '2024-12-25',
        priority: 'high'
      }
    ]
  }
];

const mockServiceRequests: ServiceRequest[] = [
  {
    id: 'req-1',
    title: 'Social Media Management',
    description: 'Monthly social media content creation and management',
    category: 'Marketing',
    status: 'approved',
    submittedDate: '2024-12-15',
    estimatedCost: '$2,500/month',
    priority: 'medium'
  },
  {
    id: 'req-2',
    title: 'Video Production',
    description: 'Product demonstration video for website',
    category: 'Production',
    status: 'in_review',
    submittedDate: '2024-12-18',
    estimatedCost: '$5,000',
    priority: 'high'
  }
];

const mockInvoices: Invoice[] = [
  {
    id: 'inv-1',
    projectTitle: 'Brand Identity Redesign',
    amount: 7500,
    status: 'paid',
    dueDate: '2024-12-10',
    issueDate: '2024-12-01',
    description: 'Phase 1: Logo and brand identity development'
  },
  {
    id: 'inv-2',
    projectTitle: 'Brand Identity Redesign',
    amount: 7500,
    status: 'sent',
    dueDate: '2024-12-25',
    issueDate: '2024-12-15',
    description: 'Phase 2: Brand guidelines and implementation'
  },
  {
    id: 'inv-3',
    projectTitle: 'Marketing Campaign',
    amount: 2000,
    status: 'draft',
    dueDate: '2024-12-30',
    issueDate: '2024-12-20',
    description: 'Campaign strategy and planning'
  }
];

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(mockServiceRequests);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const stats = [
    { title: 'Active Projects', value: projects.filter(p => p.status === 'in_progress').length, icon: Briefcase, color: 'text-blue-600' },
    { title: 'Pending Tasks', value: projects.reduce((acc, p) => acc + p.tasks.filter(t => t.status === 'pending').length, 0), icon: Clock, color: 'text-yellow-600' },
    { title: 'Total Spent', value: '$22,500', icon: DollarSign, color: 'text-purple-600' },
    { title: 'Service Requests', value: serviceRequests.filter(r => r.status === 'in_review').length, icon: FileText, color: 'text-green-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'planning': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'in_review': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitRequest = () => {
    if (newRequest.title && newRequest.description && newRequest.category) {
      const request: ServiceRequest = {
        id: `req-${Date.now()}`,
        title: newRequest.title,
        description: newRequest.description,
        category: newRequest.category,
        status: 'draft',
        submittedDate: new Date().toISOString(),
        estimatedCost: 'TBD',
        priority: newRequest.priority
      };
      setServiceRequests([...serviceRequests, request]);
      setNewRequest({ title: '', description: '', category: '', priority: 'medium' });
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
            <p className="text-gray-600">Welcome back, Mohamed! Here's your project overview</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Team
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Request
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
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="requests">Service Requests</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Active Projects */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Active Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {projects.filter(p => p.status === 'in_progress').map((project) => (
                      <div key={project.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{project.title}</h4>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm text-gray-600">Due: {project.endDate}</span>
                          <span className="font-medium">{project.budget}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Invoices */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Receipt className="w-5 h-5" />
                      Recent Invoices
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {invoices.slice(0, 3).map((invoice) => (
                      <div key={invoice.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{invoice.projectTitle}</h4>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{invoice.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Due: {invoice.dueDate}</span>
                          <span className="font-medium">${invoice.amount.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {projects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <p className="text-gray-600">{project.description}</p>
                          </div>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Progress</p>
                            <div className="flex items-center gap-2">
                              <Progress value={project.progress} className="flex-1 h-2" />
                              <span className="text-sm font-medium">{project.progress}%</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm text-gray-600">Budget</p>
                              <p className="font-medium">{project.budget}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Team</p>
                              <p className="font-medium">{project.team.length} members</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium">Tasks</h4>
                          {project.tasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Badge className={getStatusColor(task.status)}>
                                  {task.status}
                                </Badge>
                                <div>
                                  <span className="text-sm font-medium">{task.title}</span>
                                  <p className="text-xs text-gray-500">{task.assignedTo}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getPriorityColor(task.priority)}>
                                  {task.priority}
                                </Badge>
                                <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message Team
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Service Requests Tab */}
            <TabsContent value="requests" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Service Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {serviceRequests.map((request) => (
                          <div key={request.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-semibold">{request.title}</h3>
                                <p className="text-gray-600">{request.category}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getStatusColor(request.status)}>
                                  {request.status}
                                </Badge>
                                <Badge className={getPriorityColor(request.priority)}>
                                  {request.priority}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-4">{request.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="flex gap-4 text-sm text-gray-600">
                                <span>Submitted: {new Date(request.submittedDate).toLocaleDateString()}</span>
                                <span>Est. Cost: {request.estimatedCost}</span>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4 mr-1" />
                                  View Details
                                </Button>
                                <Button variant="outline" size="sm">
                                  <MessageSquare className="w-4 h-4 mr-1" />
                                  Message
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* New Request Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>New Service Request</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Request Title</Label>
                      <Input 
                        id="title"
                        value={newRequest.title}
                        onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                        placeholder="Enter request title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={newRequest.category} onValueChange={(value) => setNewRequest({...newRequest, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Development">Development</SelectItem>
                          <SelectItem value="Production">Production</SelectItem>
                          <SelectItem value="Consulting">Consulting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={newRequest.priority} onValueChange={(value) => setNewRequest({...newRequest, priority: value as any})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description"
                        value={newRequest.description}
                        onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                        placeholder="Describe your request..."
                        rows={4}
                      />
                    </div>
                    <Button onClick={handleSubmitRequest} className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Request
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Invoices Tab */}
            <TabsContent value="invoices" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{invoice.projectTitle}</h3>
                            <p className="text-gray-600">{invoice.description}</p>
                          </div>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span>Issue Date: {invoice.issueDate}</span>
                            <span>Due Date: {invoice.dueDate}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xl font-bold">${invoice.amount.toLocaleString()}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                              {invoice.status === 'sent' && (
                                <Button size="sm">
                                  Pay Now
                                </Button>
                              )}
                            </div>
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
