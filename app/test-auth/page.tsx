'use client';

import { useEffect, useState } from 'react';
import { useAuth, canAccessPlatform } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TestAuthPage() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [testResults, setTestResults] = useState<any>({});

  useEffect(() => {
    // Test platform access for different roles
    const testPlatformAccess = () => {
      const results: any = {};
      
      if (user) {
        const platforms = ['freelancers', 'clients', 'experts', 'producers', 'distributors', 'startups', 'admin'];
        platforms.forEach(platform => {
          results[platform] = canAccessPlatform(user.role, platform);
        });
      }
      
      setTestResults(results);
    };

    testPlatformAccess();
  }, [user]);

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password);
    console.log('Login result:', success);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Auth Test Page</h1>
        
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle>Authentication Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/60">Is Authenticated:</p>
                <Badge className={isAuthenticated ? 'bg-green-500' : 'bg-red-500'}>
                  {isAuthenticated ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div>
                <p className="text-white/60">User Role:</p>
                <Badge className="bg-blue-500">{user?.role || 'None'}</Badge>
              </div>
            </div>
            
            {user && (
              <div className="space-y-2">
                <p className="text-white/60">User Details:</p>
                <pre className="bg-white/10 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle>Platform Access Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(testResults).map(([platform, hasAccess]) => (
                <div key={platform} className="text-center">
                  <p className="text-white/60 text-sm mb-2">{platform}</p>
                  <Badge className={hasAccess ? 'bg-green-500' : 'bg-red-500'}>
                    {hasAccess ? 'Access' : 'Denied'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle>Quick Login Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => handleLogin('admin@beatrixhub.com', 'admin123')}
                className="bg-red-500 hover:bg-red-600"
              >
                Login as Super Admin
              </Button>
              <Button 
                onClick={() => handleLogin('freelancer@beatrixhub.com', 'freelance')}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Login as Freelancer
              </Button>
              <Button 
                onClick={() => handleLogin('client@beatrixhub.com', 'client123')}
                className="bg-green-500 hover:bg-green-600"
              >
                Login as Client
              </Button>
            </div>
            
            <Button 
              onClick={logout}
              variant="outline"
              className="w-full"
            >
              Logout
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle>Quick Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                onClick={() => window.location.href = '/platforms'}
                className="bg-purple-500 hover:bg-purple-600"
              >
                Go to Platforms
              </Button>
              <Button 
                onClick={() => window.location.href = '/admin'}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Go to Admin
              </Button>
              <Button 
                onClick={() => window.location.href = '/admin/visual-editor'}
                className="bg-cyan-500 hover:bg-cyan-600"
              >
                Go to Visual Editor
              </Button>
              <Button 
                onClick={() => window.location.href = '/admin-access'}
                className="bg-red-500 hover:bg-red-600"
              >
                Admin Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 