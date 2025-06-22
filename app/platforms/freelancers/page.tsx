'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth, hasPermission } from '@/lib/auth';
import { getTasksByUser, getProjects } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Briefcase, 
  Upload, 
  MessageSquare, 
  ShoppingCart, 
  Clock, 
  CheckCircle,
  AlertCircle,
  FileText,
  Image,
  Video,
  Music,
  Send,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Star,
  DollarSign,
  Users,
  Calendar,
  Bell,
  Mail
} from 'lucide-react';

export default function FreelancersDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('tasks');
  const [selectedTask, setSelectedTask] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<Array<{name: string, size: string, date: string}>>([]);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/login');
      return;
    }

    if (!hasPermission(user.role, ['super_admin', 'supervisor', 'freelancer'])) {
      router.push('/platforms');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user || !hasPermission(user.role, ['super_admin', 'supervisor', 'freelancer'])) {
    return null;
  }

  const userTasks = getTasksByUser(user.id);
  const userProjects = getProjects().filter(p => p.assignedFreelancers.includes(user.id));

  const stats = [
    {
      title: 'Active Tasks',
      value: userTasks.filter(t => t.status === 'in_progress').length,
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Completed Tasks',
      value: userTasks.filter(t => t.status === 'completed').length,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Pending Reviews',
      value: userTasks.filter(t => t.status === 'pending_review').length,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Total Earnings',
      value: '$2,450',
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const marketplaceItems = [
    {
      id: 1,
      title: 'Premium Logo Template',
      category: 'Design',
      price: 25,
      rating: 4.8,
      downloads: 156,
      image: '/marketplace/logo-template.jpg'
    },
    {
      id: 2,
      title: 'Social Media Kit',
      category: 'Marketing',
      price: 15,
      rating: 4.6,
      downloads: 89,
      image: '/marketplace/social-kit.jpg'
    },
    {
      id: 3,
      title: 'Video Editing Template',
      category: 'Video',
      price: 35,
      rating: 4.9,
      downloads: 234,
      image: '/marketplace/video-template.jpg'
    }
  ];

  const internalMessages = [
    {
      id: 1,
      from: 'supervisor@supervisors.beatrixhub.com',
      subject: 'New task assigned: Brand Identity Design',
      preview: 'You have been assigned a new task for the TechStart project...',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      from: 'admin@admin.beatrixhub.com',
      subject: 'System Update: New upload features',
      preview: 'We have added new features to the upload center...',
      time: '1 day ago',
      unread: false
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
              <h1 className="text-3xl font-bold text-white">Freelancers Platform</h1>
              <p className="text-white/60 mt-2">Manage your tasks, uploads, and communications</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {user.internalEmail}
              </Badge>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="h-4 w-4 mr-2" />
                New Task
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
          <TabsList className="grid w-full grid-cols-5 bg-white/5 backdrop-blur-sm border-white/10">
            <TabsTrigger value="tasks" className="text-white data-[state=active]:bg-purple-500">
              Tasks
            </TabsTrigger>
            <TabsTrigger value="uploads" className="text-white data-[state=active]:bg-purple-500">
              Upload Center
            </TabsTrigger>
            <TabsTrigger value="messages" className="text-white data-[state=active]:bg-purple-500">
              Internal Messages
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="text-white data-[state=active]:bg-purple-500">
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="text-white data-[state=active]:bg-purple-500">
              Portfolio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">My Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          task.status === 'completed' ? 'bg-green-400' :
                          task.status === 'in_progress' ? 'bg-blue-400' :
                          'bg-yellow-400'
                        }`} />
                        <div>
                          <p className="text-white font-medium">{task.title}</p>
                          <p className="text-white/60 text-sm">{task.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge className={`${
                              task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                              task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {task.priority}
                            </Badge>
                            <span className="text-white/40 text-sm">Due: {new Date(task.deadline).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <span className="text-white/60 text-sm">{task.progress}%</span>
                        <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="uploads" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Upload Center</CardTitle>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-6 bg-white/5 rounded-lg border-2 border-dashed border-white/20 hover:border-purple-500/50 transition-colors">
                    <div className="text-center">
                      <Image className="h-12 w-12 text-white/40 mx-auto mb-4" />
                      <p className="text-white font-medium mb-2">Upload Images</p>
                      <p className="text-white/60 text-sm">PNG, JPG, SVG up to 10MB</p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white/5 rounded-lg border-2 border-dashed border-white/20 hover:border-purple-500/50 transition-colors">
                    <div className="text-center">
                      <Video className="h-12 w-12 text-white/40 mx-auto mb-4" />
                      <p className="text-white font-medium mb-2">Upload Videos</p>
                      <p className="text-white/60 text-sm">MP4, MOV up to 100MB</p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white/5 rounded-lg border-2 border-dashed border-white/20 hover:border-purple-500/50 transition-colors">
                    <div className="text-center">
                      <FileText className="h-12 w-12 text-white/40 mx-auto mb-4" />
                      <p className="text-white font-medium mb-2">Upload Documents</p>
                      <p className="text-white/60 text-sm">PDF, DOC, PSD up to 50MB</p>
                    </div>
                  </div>
                </div>

                {/* Recent Uploads */}
                <div className="mt-8">
                  <h3 className="text-white font-semibold mb-4">Recent Uploads</h3>
                  <div className="space-y-3">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-white/60" />
                          <div>
                            <p className="text-white text-sm">{file.name}</p>
                            <p className="text-white/40 text-xs">{file.size} • {file.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Internal Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Message List */}
                  <div className="lg:col-span-1">
                    <div className="space-y-3">
                      {internalMessages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`p-4 rounded-lg cursor-pointer transition-colors ${
                            message.unread ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-white font-medium text-sm">{message.from}</p>
                            {message.unread && <div className="w-2 h-2 bg-purple-400 rounded-full" />}
                          </div>
                          <p className="text-white/80 text-sm font-medium">{message.subject}</p>
                          <p className="text-white/60 text-xs mt-1">{message.preview}</p>
                          <p className="text-white/40 text-xs mt-2">{message.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="lg:col-span-2">
                    <div className="bg-white/5 rounded-lg p-6 h-96 flex flex-col">
                      <div className="flex-1 overflow-y-auto space-y-4">
                        <div className="text-center text-white/40 text-sm">
                          Select a message to view
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex space-x-3">
                          <Textarea
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                          />
                          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Marketplace</CardTitle>
                <CardDescription className="text-white/60">
                  Buy and sell digital assets with other platform members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {marketplaceItems.map((item) => (
                    <div key={item.id} className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
                      <div className="h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <Image className="h-16 w-16 text-white/40" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-purple-500/20 text-purple-400">{item.category}</Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-white/60 text-sm">{item.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                        <div className="flex items-center justify-between">
                          <div className="text-white/60 text-sm">{item.downloads} downloads</div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-bold">${item.price}</span>
                            <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                              Buy
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">My Portfolio</CardTitle>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Work
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-6 bg-white/5 rounded-lg border-2 border-dashed border-white/20 hover:border-purple-500/50 transition-colors">
                    <div className="text-center">
                      <Plus className="h-12 w-12 text-white/40 mx-auto mb-4" />
                      <p className="text-white font-medium mb-2">Add New Project</p>
                      <p className="text-white/60 text-sm">Showcase your best work</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 