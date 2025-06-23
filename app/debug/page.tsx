'use client';

import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export default function DebugPage() {
  const { user, isAuthenticated, login } = useAuth();

  const testLogin = async () => {
    await login('admin@beatrixhub.com', 'admin123');
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl mb-8">Debug Page</h1>
      
      <div className="space-y-4">
        <p>Auth: {isAuthenticated ? 'Yes' : 'No'}</p>
        <p>User: {user?.name || 'None'}</p>
        <p>Role: {user?.role || 'None'}</p>
        
        <Button onClick={testLogin}>Test Login</Button>
        <Button onClick={() => window.location.href = '/platforms'}>Go to Platforms</Button>
        <Button onClick={() => window.location.href = '/admin'}>Go to Admin</Button>
      </div>
    </div>
  );
} 