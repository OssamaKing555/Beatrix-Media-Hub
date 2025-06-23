'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Lock, 
  Eye, 
  EyeOff,
  Activity,
  Users,
  Globe,
  Clock,
  Zap,
  BarChart3,
  Settings,
  RefreshCw,
  Filter,
  Download,
  Bell,
  Key,
  Database,
  Network
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { SecureBadge } from '@/components/ui/secure-badge';
import { SecurityAlert } from '@/components/ui/security-alert';
import { useAuth, hasPermission } from '@/lib/auth';
import siteConfig from '@/data/siteConfig.json';
import { toast } from 'sonner';

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'failed_login' | 'csrf_violation' | 'rate_limit' | 'suspicious_activity' | 'system_alert';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  ip: string;
  userAgent: string;
  userId?: string;
  resolved: boolean;
}

interface SecurityStats {
  totalEvents: number;
  criticalEvents: number;
  activeThreats: number;
  blockedAttacks: number;
  csrfTokensGenerated: number;
  sessionsActive: number;
  rateLimitHits: number;
  lastUpdated: string;
}

const initialEvents: SecurityEvent[] = [
    {
        id: '1',
        type: 'failed_login',
        severity: 'medium',
        message: 'Multiple failed login attempts detected from IP 192.168.1.100',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        ip: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        userId: 'user123',
        resolved: false,
    },
    {
        id: '2',
        type: 'csrf_violation',
        severity: 'high',
        message: 'CSRF token validation failed for form submission',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        ip: '203.0.113.45',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        resolved: true,
    },
];

const eventTypes = ['login', 'logout', 'failed_login', 'csrf_violation', 'rate_limit', 'suspicious_activity', 'system_alert'];
const severities = ['low', 'medium', 'high', 'critical'];

function generateMockEvent(): SecurityEvent {
    return {
        id: Math.random().toString(36).substr(2, 9),
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)] as SecurityEvent['type'],
        severity: severities[Math.floor(Math.random() * severities.length)] as SecurityEvent['severity'],
        message: 'A new security event has been detected.',
        timestamp: new Date().toISOString(),
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        resolved: false
    };
}

export default function SecurityDashboard() {
  const { user } = useAuth();
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>(initialEvents);
  const [stats, setStats] = useState<SecurityStats>({
    totalEvents: 0,
    criticalEvents: 0,
    activeThreats: 0,
    blockedAttacks: 0,
    csrfTokensGenerated: 1247,
    sessionsActive: 23,
    rateLimitHits: 156,
    lastUpdated: new Date().toISOString(),
  });
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [showResolved, setShowResolved] = useState(false);
  const [securityAlert, setSecurityAlert] = useState<{
    type: 'success' | 'warning' | 'error' | 'info' | 'security';
    title?: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!user || !hasPermission(user.role, 'super_admin')) return;

    const interval = setInterval(() => {
        const newEvent = generateMockEvent();
        setSecurityEvents(prev => [newEvent, ...prev]);
        toast.warning(`New ${newEvent.severity} security event detected!`, {
            description: newEvent.message
        });
    }, 15000);

    return () => clearInterval(interval);
  }, [user]);
  
  useEffect(() => {
    setStats(prev => ({
      ...prev,
      totalEvents: securityEvents.length,
      criticalEvents: securityEvents.filter(e => e.severity === 'critical').length,
      activeThreats: securityEvents.filter(e => !e.resolved && e.severity === 'high').length,
      blockedAttacks: securityEvents.filter(e => e.type === 'csrf_violation' || e.type === 'rate_limit').length,
      lastUpdated: new Date().toISOString(),
    }));
  }, [securityEvents]);

  const handleResolveEvent = (eventId: string) => {
    setSecurityEvents(prev => 
      prev.map(event => 
        event.id === eventId ? { ...event, resolved: true } : event
      )
    );
    toast.success('Event marked as resolved.');
  };

  const handleRefreshData = () => {
    toast.info('Refreshing security data...');
    setTimeout(() => {
        setSecurityEvents(prev => [generateMockEvent(), ...prev.slice(0, 19)]);
        toast.success('Security dashboard updated.');
    }, 1000);
  };
  
  const filteredEvents = useMemo(() => securityEvents.filter(event => {
    if (filterType !== 'all' && event.type !== filterType) return false;
    if (filterSeverity !== 'all' && event.severity !== filterSeverity) return false;
    if (!showResolved && event.resolved) return false;
    return true;
  }), [securityEvents, filterType, filterSeverity, showResolved]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login': return <CheckCircle className="h-4 w-4" />;
      case 'logout': return <Lock className="h-4 w-4" />;
      case 'failed_login': return <AlertTriangle className="h-4 w-4" />;
      case 'csrf_violation': return <Shield className="h-4 w-4" />;
      case 'rate_limit': return <Clock className="h-4 w-4" />;
      case 'suspicious_activity': return <Eye className="h-4 w-4" />;
      case 'system_alert': return <Bell className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  if (!user || !hasPermission(user.role, 'supervisor')) {
      return (
          <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
              <p className="text-gray-600">You don't have permission to access the security dashboard.</p>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Security Dashboard</h1>
              <p className="text-white/60">Monitor and manage platform security in real-time</p>
            </div>
            <div className="flex items-center space-x-4">
              <SecureBadge type="secure" size="lg">
                Enterprise Security
              </SecureBadge>
              <Button onClick={handleRefreshData} variant="outline" className="border-white/20 text-white">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Security Alert */}
        {securityAlert && (
          <div className="mb-6">
            <SecurityAlert
              type={securityAlert.type}
              title={securityAlert.title}
              message={securityAlert.message}
              onClose={() => setSecurityAlert(null)}
              autoClose={securityAlert.type === 'success'}
              autoCloseDelay={3000}
            />
          </div>
        )}

        {/* Security Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Total Events</p>
                  <p className="text-3xl font-bold text-white">{stats.totalEvents}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Critical Events</p>
                  <p className="text-3xl font-bold text-red-400">{stats.criticalEvents}</p>
                </div>
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Active Threats</p>
                  <p className="text-3xl font-bold text-orange-400">{stats.activeThreats}</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Blocked Attacks</p>
                  <p className="text-3xl font-bold text-green-400">{stats.blockedAttacks}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Security Events */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white">Security Events</CardTitle>
                    <CardDescription className="text-white/60">
                      Real-time security event monitoring
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="border-white/20 text-white">
                      {filteredEvents.length} events
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="type-filter" className="text-white text-sm">Type:</Label>
                    <select
                      id="type-filter"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-3 py-1 bg-white/5 border border-white/20 text-white rounded text-sm"
                    >
                      <option value="all">All Types</option>
                      <option value="login">Login</option>
                      <option value="logout">Logout</option>
                      <option value="failed_login">Failed Login</option>
                      <option value="csrf_violation">CSRF Violation</option>
                      <option value="rate_limit">Rate Limit</option>
                      <option value="suspicious_activity">Suspicious Activity</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="severity-filter" className="text-white text-sm">Severity:</Label>
                    <select
                      id="severity-filter"
                      value={filterSeverity}
                      onChange={(e) => setFilterSeverity(e.target.value)}
                      className="px-3 py-1 bg-white/5 border border-white/20 text-white rounded text-sm"
                    >
                      <option value="all">All Severities</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="show-resolved"
                      checked={showResolved}
                      onChange={(e) => setShowResolved(e.target.checked)}
                      className="rounded border-white/20 bg-white/5"
                    />
                    <Label htmlFor="show-resolved" className="text-white text-sm">Show Resolved</Label>
                  </div>
                </div>

                {/* Events List */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg border ${
                        event.resolved 
                          ? 'bg-white/5 border-white/10' 
                          : 'bg-white/10 border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            event.resolved ? 'bg-gray-500/20' : 'bg-red-500/20'
                          }`}>
                            {getEventIcon(event.type)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className={`text-sm font-semibold ${
                                event.resolved ? 'text-white/60' : 'text-white'
                              }`}>
                                {event.message}
                              </h4>
                              <Badge className={`text-xs ${getSeverityColor(event.severity)}`}>
                                {event.severity}
                              </Badge>
                              {event.resolved && (
                                <Badge variant="outline" className="text-xs border-green-500/20 text-green-400">
                                  Resolved
                                </Badge>
                              )}
                            </div>
                            
                            <div className="text-xs text-white/60 space-y-1">
                              <p>IP: {event.ip}</p>
                              <p>Time: {new Date(event.timestamp).toLocaleString()}</p>
                              {event.userId && <p>User: {event.userId}</p>}
                            </div>
                          </div>
                        </div>
                        
                        {!event.resolved && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleResolveEvent(event.id)}
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            Resolve
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Overview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Security Overview</CardTitle>
                <CardDescription className="text-white/60">
                  System security status and metrics
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* CSRF Tokens */}
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">CSRF Protection</h4>
                    <Key className="h-4 w-4 text-purple-400" />
                  </div>
                  <p className="text-2xl font-bold text-purple-400">{stats.csrfTokensGenerated}</p>
                  <p className="text-xs text-white/60">Tokens generated today</p>
                </div>

                {/* Active Sessions */}
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">Active Sessions</h4>
                    <Users className="h-4 w-4 text-blue-400" />
                  </div>
                  <p className="text-2xl font-bold text-blue-400">{stats.sessionsActive}</p>
                  <p className="text-xs text-white/60">Current active users</p>
                </div>

                {/* Rate Limiting */}
                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">Rate Limit Hits</h4>
                    <Zap className="h-4 w-4 text-orange-400" />
                  </div>
                  <p className="text-2xl font-bold text-orange-400">{stats.rateLimitHits}</p>
                  <p className="text-xs text-white/60">Requests blocked today</p>
                </div>

                {/* Security Status */}
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">System Status</h4>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-lg font-bold text-green-400">Secure</p>
                  <p className="text-xs text-white/60">All systems operational</p>
                </div>

                {/* Last Updated */}
                <div className="text-center text-xs text-white/40">
                  Last updated: {new Date(stats.lastUpdated).toLocaleTimeString()}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Security Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12"
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center">
                Security Features
              </CardTitle>
              <CardDescription className="text-white/60 text-center">
                Comprehensive protection across all platform components
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-purple-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">CSRF Protection</h4>
                  <p className="text-white/60 text-sm">
                    All forms protected against cross-site request forgery
                  </p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-blue-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Session Security</h4>
                  <p className="text-white/60 text-sm">
                    Secure session management with automatic expiry
                  </p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-green-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Rate Limiting</h4>
                  <p className="text-white/60 text-sm">
                    API and form submission rate limiting
                  </p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-orange-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Activity Monitoring</h4>
                  <p className="text-white/60 text-sm">
                    Real-time security event monitoring and alerts
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