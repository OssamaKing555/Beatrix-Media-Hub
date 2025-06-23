'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth, canAccessPlatform, getRoleDisplayName, getRoleColor } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Briefcase, 
  Palette, 
  Video, 
  TrendingUp, 
  Rocket, 
  Settings,
  ArrowRight,
  Shield,
  MessageSquare,
  FileText,
  BarChart3
} from 'lucide-react';

const platforms = [
  {
    id: 'freelancers',
    title: 'Freelancers Platform',
    description: 'Access your tasks, upload deliverables, and manage your portfolio',
    icon: Palette,
    color: 'from-blue-500 to-cyan-500',
    features: ['Task Dashboard', 'Portfolio Editor', 'Internal Messaging', 'Upload Center'],
    roles: ['super_admin', 'supervisor', 'freelancer'],
    route: '/platforms/freelancers'
  },
  {
    id: 'clients',
    title: 'Clients Platform',
    description: 'Track your projects, communicate with teams, and manage requests',
    icon: Briefcase,
    color: 'from-green-500 to-emerald-500',
    features: ['Project Dashboard', 'Live Chat', 'File Upload', 'Progress Tracking'],
    roles: ['super_admin', 'supervisor', 'client'],
    route: '/platforms/clients'
  },
  {
    id: 'supervisors',
    title: 'Supervisors Platform',
    description: 'Manage teams, approve submissions, and coordinate projects',
    icon: Users,
    color: 'from-orange-500 to-red-500',
    features: ['Team Management', 'Approval System', 'Client Communication', 'Project Oversight'],
    roles: ['super_admin', 'supervisor'],
    route: '/platforms/supervisors'
  },
  {
    id: 'distributors',
    title: 'Distributors Platform',
    description: 'Upload metrics, apply for verification, and access distribution projects',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500',
    features: ['Metrics Upload', 'Verification System', 'Project Access', 'Network Management'],
    roles: ['super_admin', 'supervisor', 'distributor'],
    route: '/platforms/distributors'
  },
  {
    id: 'producers',
    title: 'Producers Platform',
    description: 'Showcase your work, join collaborations, and connect with creative teams',
    icon: Video,
    color: 'from-indigo-500 to-purple-500',
    features: ['Portfolio Showcase', 'Collaboration Requests', 'Network Access', 'Project Bidding'],
    roles: ['super_admin', 'supervisor', 'producer'],
    route: '/platforms/producers'
  },
  {
    id: 'startups',
    title: 'Startups Platform',
    description: 'Access startup-focused services, book consultations, and find resources',
    icon: Rocket,
    color: 'from-yellow-500 to-orange-500',
    features: ['Service Bundles', 'Consultation Booking', 'Resource Library', 'Expert Network'],
    roles: ['super_admin', 'supervisor', 'startup'],
    route: '/platforms/startups'
  },
  {
    id: 'admin',
    title: 'Super Admin Panel',
    description: 'Full system control, user management, and visual editor',
    icon: Settings,
    color: 'from-red-500 to-pink-500',
    features: ['User Management', 'Visual Editor', 'System Analytics', 'Content Control'],
    roles: ['super_admin'],
    route: '/admin'
  }
];

export default function PlatformsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Debug logging
  console.log('Platforms Page Debug:', { user, isAuthenticated });

  useEffect(() => {
    console.log('Platforms Page useEffect:', { user, isAuthenticated });
    if (!isAuthenticated) {
      console.log('Redirecting to login - not authenticated');
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    console.log('Platforms Page - showing loading, auth state:', { isAuthenticated, user });
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-white mt-4">Loading...</p>
          <p className="text-white/60 mt-2">Auth: {isAuthenticated ? 'Yes' : 'No'}</p>
          <p className="text-white/60">User: {user ? 'Yes' : 'No'}</p>
        </div>
      </div>
    );
  }

  // Super admin can access all platforms
  const accessiblePlatforms = user.role === 'super_admin' 
    ? platforms 
    : platforms.filter(platform => 
        platform.roles.includes(user.role)
      );

  console.log('Platforms Page - rendering with platforms:', accessiblePlatforms.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to Your
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Platform Hub
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Access your personalized dashboard and tools based on your role as{' '}
            <Badge className={`${getRoleColor(user.role)} text-white`}>
              {getRoleDisplayName(user.role)}
            </Badge>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accessiblePlatforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <platform.icon className="h-8 w-8 text-white" />
                    </div>
                    <ArrowRight className="h-6 w-6 text-white/40 group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {platform.title}
                  </CardTitle>
                  
                  <CardDescription className="text-white/70">
                    {platform.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative">
                  <div className="space-y-3 mb-6">
                    {platform.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-white/80">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Link href={platform.route}>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white group-hover:scale-105 transition-transform duration-300">
                      Access Platform
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">150+</h3>
            <p className="text-white/60">Active Projects</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">500+</h3>
            <p className="text-white/60">Team Members</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">1000+</h3>
            <p className="text-white/60">Files Shared</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">98%</h3>
            <p className="text-white/60">Success Rate</p>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center text-white/60 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
            <Shield className="h-5 w-5 mr-2" />
            <span className="text-sm">All platforms are secured with enterprise-grade encryption</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 