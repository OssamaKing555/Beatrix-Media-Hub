'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth, canAccessPlatform } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  Star, 
  Bell,
  User,
  FileText,
  Calendar,
  TrendingUp,
  Award,
  MessageSquare,
  Upload,
  Edit,
  Eye,
  Shield
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  client: string;
  description: string;
  budget: string;
  duration: string;
  skills: string[];
  status: 'open' | 'applied' | 'in_progress' | 'completed';
  postedDate: string;
}

interface Project {
  id: string;
  title: string;
  client: string;
  progress: number;
  deadline: string;
  status: 'active' | 'review' | 'completed';
  budget: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Brand Identity Design for Tech Startup',
    client: 'TechFlow Solutions',
    description: 'Create a complete brand identity including logo, color palette, and brand guidelines for a new fintech startup.',
    budget: '$2,500 - $4,000',
    duration: '2-3 weeks',
    skills: ['Logo Design', 'Brand Identity', 'Adobe Illustrator'],
    status: 'open',
    postedDate: '2024-12-19T10:00:00Z'
  },
  {
    id: 'job-2',
    title: 'Social Media Content Creation',
    client: 'Fashion Retail Co.',
    description: 'Create engaging social media content for Instagram and TikTok campaigns.',
    budget: '$800 - $1,200',
    duration: '1 week',
    skills: ['Content Creation', 'Social Media', 'Video Editing'],
    status: 'applied',
    postedDate: '2024-12-18T14:30:00Z'
  },
  {
    id: 'job-3',
    title: 'Website Redesign',
    client: 'Restaurant Chain',
    description: 'Modernize the website design with improved UX and mobile responsiveness.',
    budget: '$3,000 - $5,000',
    duration: '3-4 weeks',
    skills: ['Web Design', 'UX/UI', 'Figma'],
    status: 'open',
    postedDate: '2024-12-17T09:15:00Z'
  }
];

const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'E-commerce Website Development',
    client: 'Fashion Retail Co.',
    progress: 75,
    deadline: '2024-12-25',
    status: 'active',
    budget: '$4,500',
    tasks: [
      { id: 'task-1', title: 'Homepage Design', status: 'completed', dueDate: '2024-12-20' },
      { id: 'task-2', title: 'Product Catalog', status: 'in_progress', dueDate: '2024-12-22' },
      { id: 'task-3', title: 'Payment Integration', status: 'pending', dueDate: '2024-12-25' }
    ]
  },
  {
    id: 'proj-2',
    title: 'Marketing Campaign Design',
    client: 'TechStart Egypt',
    progress: 100,
    deadline: '2024-12-20',
    status: 'review',
    budget: '$2,800',
    tasks: [
      { id: 'task-4', title: 'Banner Designs', status: 'completed', dueDate: '2024-12-18' },
      { id: 'task-5', title: 'Social Media Assets', status: 'completed', dueDate: '2024-12-19' },
      { id: 'task-6', title: 'Email Templates', status: 'completed', dueDate: '2024-12-20' }
    ]
  }
];

const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'Project Approved',
    message: 'Your design proposal for TechFlow Solutions has been approved!',
    type: 'success',
    timestamp: '2024-12-19T11:30:00Z',
    read: false
  },
  {
    id: 'notif-2',
    title: 'New Message',
    message: 'You have a new message from Fashion Retail Co. regarding your project.',
    type: 'info',
    timestamp: '2024-12-19T10:15:00Z',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Payment Received',
    message: 'Payment of $2,800 has been received for Marketing Campaign Design.',
    type: 'success',
    timestamp: '2024-12-19T09:00:00Z',
    read: true
  }
];

export default function FreelancerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(mockNotifications.filter(n => !n.read).length);

  // Access control
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!canAccessPlatform(user?.role || 'client', 'freelancers')) {
      router.push('/platforms');
      return;
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user || !canAccessPlatform(user.role, 'freelancers')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this platform.</p>
        </div>
      </div>
    );
  }

  const stats = [
    { title: 'Active Projects', value: mockProjects.filter(p => p.status === 'active').length, icon: Briefcase, color: 'text-blue-600' },
    { title: 'Completed This Month', value: 8, icon: CheckCircle, color: 'text-green-600' },
    { title: 'Total Earnings', value: '$12,450', icon: DollarSign, color: 'text-purple-600' },
    { title: 'Average Rating', value: '4.8', icon: Star, color: 'text-yellow-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'open': return 'bg-green-100 text-green-800';
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
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
            <h1 className="text-3xl font-bold text-gray-900">Freelancer Dashboard</h1>
            <p className="text-gray-600">Welcome back, Sara! Here's your work overview</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="relative">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload Portfolio
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
              <TabsTrigger value="jobs">Job Opportunities</TabsTrigger>
              <TabsTrigger value="projects">My Projects</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
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
                    {mockProjects.filter(p => p.status === 'active').map((project) => (
                      <div key={project.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{project.title}</h4>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{project.client}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm text-gray-600">Due: {project.deadline}</span>
                          <span className="font-medium">{project.budget}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Recent Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {notifications.slice(0, 3).map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-3 rounded-lg border-l-4 ${
                          notification.read ? 'bg-gray-50' : 'bg-blue-50'
                        } ${
                          notification.type === 'success' ? 'border-l-green-500' :
                          notification.type === 'warning' ? 'border-l-yellow-500' :
                          notification.type === 'error' ? 'border-l-red-500' :
                          'border-l-blue-500'
                        }`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-sm">{notification.title}</h5>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Job Opportunities Tab */}
            <TabsContent value="jobs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Job Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockJobs.map((job) => (
                      <div key={job.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <p className="text-gray-600">{job.client}</p>
                          </div>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-4">{job.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.map((skill, index) => (
                            <Badge key={index} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {job.budget}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {job.duration}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            {job.status === 'open' && (
                              <Button size="sm">
                                Apply Now
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockProjects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <p className="text-gray-600">{project.client}</p>
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
                              <p className="text-sm text-gray-600">Deadline</p>
                              <p className="font-medium">{project.deadline}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium">Tasks</h4>
                          {project.tasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Badge className={getTaskStatusColor(task.status)}>
                                  {task.status}
                                </Badge>
                                <span className="text-sm">{task.title}</span>
                              </div>
                              <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message Client
                          </Button>
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-1" />
                            Submit Work
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Profile Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Sara Ahmed</h3>
                        <p className="text-gray-600">Graphic Designer & Brand Specialist</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm">4.8 (127 reviews)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-gray-600">sara@beatrixhub.com</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-gray-600">Cairo, Egypt</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Experience</p>
                        <p className="text-gray-600">5+ years in design and branding</p>
                      </div>
                    </div>

                    <Button className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Skills & Portfolio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Graphic Design', 'Brand Identity', 'Adobe Creative Suite', 'UI/UX Design', 'Illustration', 'Typography'].map((skill) => (
                          <Badge key={skill} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Portfolio</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4].map((item) => (
                          <div key={item} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-gray-500" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Add Portfolio Item
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
} 