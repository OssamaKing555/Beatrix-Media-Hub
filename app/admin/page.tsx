'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth, hasPermission, getRoleDisplayName, getRoleColor } from '@/lib/auth';
import { getUsers, getProjects, getTasks, PLANS, PERMISSIONS, getAllUniquePermissions } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Briefcase, 
  Settings, 
  BarChart3, 
  Palette, 
  MessageSquare,
  FileText,
  Shield,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Globe,
  Database,
  Zap,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState<{ open: boolean; userId?: string }>({ open: false });
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/login');
      return;
    }

    if (!hasPermission(user.role, 'super_admin')) {
      router.push('/platforms');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user || !hasPermission(user.role, 'super_admin')) {
    return null;
  }

  const users = getUsers();
  const projects = getProjects();
  const tasks = getTasks();

  // Calculate stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.isActive).length;
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'in_progress').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Active Projects',
      value: activeProjects,
      change: '+8%',
      icon: Briefcase,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Completed Tasks',
      value: completedTasks,
      change: '+15%',
      icon: CheckCircle,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'System Health',
      value: '99.9%',
      change: 'Stable',
      icon: Shield,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'user', action: 'New user registered', user: 'Sara Ahmed', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'project', action: 'Project completed', user: 'TechStart Egypt', time: '1 hour ago', status: 'success' },
    { id: 3, type: 'task', action: 'Task assigned', user: 'Mohamed Ali', time: '3 hours ago', status: 'pending' },
    { id: 4, type: 'system', action: 'System backup completed', user: 'System', time: '6 hours ago', status: 'success' },
    { id: 5, type: 'user', action: 'User role updated', user: 'Layla Mansour', time: '1 day ago', status: 'success' }
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
              <h1 className="text-3xl font-bold text-white">Super Admin Dashboard</h1>
              <p className="text-white/60 mt-2">System overview and management</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                System Online
              </Badge>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="h-4 w-4 mr-2" />
                Quick Action
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
          <TabsList className="grid w-full grid-cols-5 bg-white/5 backdrop-blur-sm border-white/10">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-500">
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-purple-500">
              Users
            </TabsTrigger>
            <TabsTrigger value="projects" className="text-white data-[state=active]:bg-purple-500">
              Projects
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-purple-500">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:bg-purple-500">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === 'success' ? 'bg-green-400' : 'bg-yellow-400'
                        }`} />
                        <div className="flex-1">
                          <p className="text-white text-sm">{activity.action}</p>
                          <p className="text-white/60 text-xs">{activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Database</span>
                      <Badge className="bg-green-500/20 text-green-400">Healthy</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">API Services</span>
                      <Badge className="bg-green-500/20 text-green-400">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">File Storage</span>
                      <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Email Service</span>
                      <Badge className="bg-green-500/20 text-green-400">Running</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">User Management</CardTitle>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" onClick={() => setShowAddUser(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.slice(0, 10).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-white/60 text-sm">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getRoleColor(user.role as any)} text-white`}>
                          {getRoleDisplayName(user.role as any)}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Project Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-white/5 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-2">{totalProjects}</div>
                    <div className="text-white/60">Total Projects</div>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-2">{activeProjects}</div>
                    <div className="text-white/60">Active Projects</div>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-2">{completedProjects}</div>
                    <div className="text-white/60">Completed Projects</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white/5 rounded-lg">
                    <h3 className="text-white font-semibold mb-4">User Growth</h3>
                    <div className="h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-white/60" />
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-lg">
                    <h3 className="text-white font-semibold mb-4">Project Completion</h3>
                    <div className="h-32 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-white/60" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                      <Database className="h-4 w-4 mr-2" />
                      Database Management
                    </Button>
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                      <Globe className="h-4 w-4 mr-2" />
                      Site Configuration
                    </Button>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Palette className="h-4 w-4 mr-2" />
                      Visual Editor
                    </Button>
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      <Zap className="h-4 w-4 mr-2" />
                      System Maintenance
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add User Modal */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          {/* Form fields will go here */}
          <div className="space-y-4 py-2">
            <Label>Name</Label>
            <Input placeholder="Full Name" />
            <Label>Email</Label>
            <Input placeholder="Email Address" />
            <Label>Role</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select Role" /></SelectTrigger>
              <SelectContent>
                {['client','freelancer','supervisor','producer','distributor','startup','expert'].map(role => (
                  <SelectItem key={role} value={role}>{getRoleDisplayName(role)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Plan/Package</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select Plan" /></SelectTrigger>
              <SelectContent>
                {PLANS.map(plan => (
                  <SelectItem key={plan} value={plan}>{plan}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Custom Permissions</Label>
            <div className="grid grid-cols-2 gap-2">
              {getAllUniquePermissions().map(perm => (
                <div key={perm} className="flex items-center space-x-2">
                  <Checkbox id={perm} />
                  <Label htmlFor={perm}>{perm}</Label>
                </div>
              ))}
            </div>
            <Label>Subscription Start Date</Label>
            <Input type="date" />
            <Label>Subscription End Date</Label>
            <Input type="date" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUser(false)}>Cancel</Button>
            <Button>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal (skeleton) */}
      <Dialog open={showEditUser.open} onOpenChange={open => setShowEditUser({ open })}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {/* Form fields will go here */}
          <div className="py-4 text-gray-500">Edit form coming soon...</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditUser({ open: false })}>Cancel</Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast notification (skeleton) */}
      {notification && <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded shadow">{notification}</div>}
    </div>
  );
} 