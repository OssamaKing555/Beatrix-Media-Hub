'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth, hasPermission, getRoleDisplayName, getRoleColor, UserRole } from '@/lib/auth';
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
  Filter,
  Lock,
  Calendar,
  Mail,
  LogOut
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  plan?: string;
  permissions?: string[];
  subscriptionStart?: string;
  subscriptionEnd?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin: string;
  updatedAt?: string;
}

interface UserFormData {
  name: string;
  email: string;
  role: string;
  plan: string;
  permissions: string[];
  subscriptionStart: string;
  subscriptionEnd: string;
  isActive: boolean;
}

export default function AdminDashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState<{ open: boolean; userId?: string }>({ open: false });
  const [editingUser, setEditingUser] = useState<UserFormData | null>(null);
  const [userFormData, setUserFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: '',
    plan: '',
    permissions: [],
    subscriptionStart: '',
    subscriptionEnd: '',
    isActive: true,
  });
  const [isBypassActive, setIsBypassActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Add users state management
  const [users, setUsers] = useState<User[]>(() => {
    // Load users from localStorage or use default data
    if (typeof window !== 'undefined') {
        const savedUsers = localStorage.getItem('adminUsers');
        if (savedUsers) {
            try {
                return JSON.parse(savedUsers);
            } catch (e) {
                console.error("Failed to parse users from localStorage", e);
                return getUsers();
            }
        }
    }
    return getUsers(); // Default users from data file
  });

  useEffect(() => {
    // Check for admin bypass
    const adminBypass = localStorage.getItem('adminBypass');
    const adminUser = localStorage.getItem('adminUser');
    
    if (adminBypass === 'true' && adminUser) {
      setIsBypassActive(true);
      setIsLoading(false);
      return;
    }
    
    // Wait for Zustand to hydrate and then check authentication
    const checkAuth = () => {
      if (isAuthenticated && user) {
        if (user.role !== 'super_admin') {
          console.log('Non-admin user trying to access admin panel, redirecting to login');
          router.push('/login');
          return;
        }
        setIsLoading(false);
      } else if (!isAuthenticated && !isLoading) {
        console.log('Not authenticated, redirecting to login');
        router.push('/login');
      }
    };

    // Check immediately and also after a delay to ensure Zustand has hydrated
    checkAuth();
    const timer = setTimeout(checkAuth, 1000);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p>Checking admin access...</p>
        </div>
      </div>
    );
  }

  // Show loading if not authenticated and no bypass
  if (!isAuthenticated && !isBypassActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

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

  // User management functions
  const resetForm = () => {
    setUserFormData({
      name: '',
      email: '',
      role: '',
      plan: '',
      permissions: [],
      subscriptionStart: '',
      subscriptionEnd: '',
      isActive: true,
    });
  };

  const handleAddUser = () => {
    if (!userFormData.name || !userFormData.email || !userFormData.role) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: userFormData.name,
      email: userFormData.email,
      role: userFormData.role,
      plan: userFormData.plan,
      permissions: userFormData.permissions,
      subscriptionStart: userFormData.subscriptionStart,
      subscriptionEnd: userFormData.subscriptionEnd,
      isActive: userFormData.isActive,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    // Add to users state
    setUsers(prevUsers => [...prevUsers, newUser]);
    
    // Save to localStorage for persistence
    const updatedUsers = [...users, newUser];
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));

    toast.success(`User ${userFormData.name} created successfully`);
    setShowAddUser(false);
    resetForm();
  };

  const handleEditUser = (userId: string) => {
    const userToEdit = users.find(u => u.id === userId);
    if (!userToEdit) return;

    setEditingUser({
      name: userToEdit.name,
      email: userToEdit.email,
      role: userToEdit.role,
      plan: userToEdit.plan || 'Pro',
      permissions: userToEdit.permissions || [],
      subscriptionStart: userToEdit.subscriptionStart || '2024-01-01',
      subscriptionEnd: userToEdit.subscriptionEnd || '2024-12-31',
      isActive: userToEdit.isActive !== undefined ? userToEdit.isActive : true,
    });
    setShowEditUser({ open: true, userId });
  };

  const handleSaveEdit = () => {
    if (!editingUser || !showEditUser.userId) return;

    if (!editingUser.name || !editingUser.email || !editingUser.role) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Update user in state
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === showEditUser.userId 
          ? { 
              ...user, 
              name: editingUser.name,
              email: editingUser.email,
              role: editingUser.role,
              plan: editingUser.plan,
              permissions: editingUser.permissions,
              subscriptionStart: editingUser.subscriptionStart,
              subscriptionEnd: editingUser.subscriptionEnd,
              isActive: editingUser.isActive,
              updatedAt: new Date().toISOString()
            }
          : user
      )
    );

    // Save to localStorage for persistence
    const updatedUsers = users.map(user => 
      user.id === showEditUser.userId 
        ? { 
            ...user, 
            name: editingUser.name,
            email: editingUser.email,
            role: editingUser.role,
            plan: editingUser.plan,
            permissions: editingUser.permissions,
            subscriptionStart: editingUser.subscriptionStart,
            subscriptionEnd: editingUser.subscriptionEnd,
            isActive: editingUser.isActive,
            updatedAt: new Date().toISOString()
          }
        : user
    );
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));

    toast.success(`User ${editingUser.name} updated successfully`);
    setShowEditUser({ open: false });
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    if (!userToDelete) return;

    // Confirm deletion
    if (!confirm(`Are you sure you want to delete user "${userToDelete.name}"?`)) {
      return;
    }

    // Remove from users state
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    
    // Save to localStorage for persistence
    const updatedUsers = users.filter(user => user.id !== userId);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));

    toast.success(`User ${userToDelete.name} deleted successfully`);
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setUserFormData(prev => ({
        ...prev,
        permissions: [...prev.permissions, permission]
      }));
    } else {
      setUserFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => p !== permission)
      }));
    }
  };

  const handleEditPermissionChange = (permission: string, checked: boolean) => {
    if (!editingUser) return;

    if (checked) {
      setEditingUser(prev => prev ? {
        ...prev,
        permissions: [...prev.permissions, permission]
      } : null);
    } else {
      setEditingUser(prev => prev ? {
        ...prev,
        permissions: prev.permissions.filter(p => p !== permission)
      } : null);
    }
  };

  const isUserEditable = (userRole: string) => {
    return userRole !== 'super_admin';
  };

  const isSubscriptionExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getRoleDisplayName(user.role as UserRole).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    localStorage.removeItem('adminBypass');
    localStorage.removeItem('adminUser');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-300 text-sm">
                  Welcome back, {user?.name || 'Super Admin'}
                  {isBypassActive && <Badge className="ml-2 bg-green-500">Bypass Active</Badge>}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-purple-500">
                {user?.role || 'super_admin'}
              </Badge>
              <Button onClick={handleLogout} variant="outline" size="sm" className="text-white border-white/20">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/10">
            <TabsTrigger value="overview" className="text-white">Overview</TabsTrigger>
            <TabsTrigger value="users" className="text-white">Users</TabsTrigger>
            <TabsTrigger value="projects" className="text-white">Projects</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white">Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="text-white">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-300 text-sm">{stat.title}</p>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                          <p className="text-green-400 text-sm">{stat.change}</p>
                        </div>
                        <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-gray-300">
                  Common administrative tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    onClick={() => router.push('/admin/visual-editor')}
                  >
                    🎨 Visual Editor
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    onClick={() => setActiveTab('users')}
                  >
                    👥 Manage Users
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => router.push('/platforms')}
                  >
                    🌐 Access Platforms
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-300">
                  Latest system events and user actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                        <div>
                          <p className="text-white font-medium">{activity.action}</p>
                          <p className="text-gray-400 text-sm">by {activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">User Management</CardTitle>
                    <CardDescription className="text-gray-300">
                      Manage platform users and permissions
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setShowAddUser(true)}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-white/60 text-sm">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={`${getRoleColor(user.role as UserRole)} text-white text-xs`}>
                              {getRoleDisplayName(user.role as UserRole)}
                            </Badge>
                            <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                              Pro Plan
                            </Badge>
                            {isSubscriptionExpired('2024-12-31') && (
                              <Badge className="bg-red-500/20 text-red-400 text-xs">
                                Expired
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!isUserEditable(user.role) && (
                          <span title="Read-only user">
                            <Lock className="h-4 w-4 text-yellow-400" />
                          </span>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-white/60 hover:text-white" 
                          onClick={() => handleEditUser(user.id)} 
                          disabled={!isUserEditable(user.role)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-400/60 hover:text-red-400" 
                          onClick={() => handleDeleteUser(user.id)} 
                          disabled={!isUserEditable(user.role)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Project Management</CardTitle>
                <CardDescription className="text-gray-300">
                  Track and manage ongoing projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300">Project management interface coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Analytics Dashboard</CardTitle>
                <CardDescription className="text-gray-300">
                  Platform performance and user insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300">Analytics dashboard coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">System Settings</CardTitle>
                <CardDescription className="text-gray-300">
                  Configure platform settings and security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300">Settings interface coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Full Name"
                value={userFormData.name}
                onChange={(e) => setUserFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                value={userFormData.email}
                onChange={(e) => setUserFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="role">Role *</Label>
              <Select value={userFormData.role} onValueChange={(value) => setUserFormData(prev => ({ ...prev, role: value }))}>
                <SelectTrigger><SelectValue placeholder="Select Role" /></SelectTrigger>
                <SelectContent>
                  {['client','freelancer','supervisor','producer','distributor','startup','expert'].map(role => (
                    <SelectItem key={role} value={role}>{getRoleDisplayName(role as UserRole)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowAddUser(false);
              resetForm();
            }}>Cancel</Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditUser.open} onOpenChange={(open) => setShowEditUser({ ...showEditUser, open })}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User: {editingUser?.name}</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} className="bg-gray-700 border-gray-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} className="bg-gray-700 border-gray-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={editingUser.role} onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white">
                    {Object.keys(PERMISSIONS).map(role => (
                      <SelectItem key={role} value={role}>{getRoleDisplayName(role as UserRole)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan">Plan</Label>
                <Select value={editingUser.plan} onValueChange={(value) => setEditingUser({ ...editingUser, plan: value })}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white">
                    {Object.values(PLANS).map(plan => (
                      <SelectItem key={plan} value={plan}>{plan}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-3 gap-2 p-4 rounded-md border border-gray-600 bg-gray-700/50 max-h-48 overflow-y-auto">
                  {getAllUniquePermissions().map(permission => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Checkbox
                        id={`perm-${permission}`}
                        checked={editingUser.permissions.includes(permission)}
                        onCheckedChange={(checked) => handleEditPermissionChange(permission, !!checked)}
                      />
                      <Label htmlFor={`perm-${permission}`} className="text-sm font-normal">{permission}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="isActive" checked={editingUser.isActive} onCheckedChange={(checked) => setEditingUser(prev => prev ? { ...prev, isActive: !!checked } : null)} />
                <Label htmlFor="isActive">User is Active</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowEditUser({ open: false });
              setEditingUser(null);
            }}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 