'use client'

import { useState } from 'react'
import { SecureForm } from '@/components/ui/secure-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestCSRFPage() {
  const [testResult, setTestResult] = useState<string>('')

  const handleTestSubmit = async (formData: FormData, csrfToken: string) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const testData = {
      name: formData.get('name'),
      email: formData.get('email'),
      csrfToken: csrfToken,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    }
    
    setTestResult(JSON.stringify(testData, null, 2))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">CSRF Token Test</CardTitle>
            <CardDescription className="text-white/60">
              Test the improved CSRF handling in different environments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SecureForm
              onSubmit={handleTestSubmit}
              securityBadgeText="Test Form"
              allowDevelopmentBypass={true}
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="bg-white/5 border-white/20 text-white"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/5 border-white/20 text-white"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Test Submission
                </Button>
              </div>
            </SecureForm>
          </CardContent>
        </Card>

        {testResult && (
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Test Result</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-black/20 p-4 rounded-lg text-green-400 text-sm overflow-auto">
                {testResult}
              </pre>
            </CardContent>
          </Card>
        )}

        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Improvements Made</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-white/80">
            <div>
              <h4 className="font-semibold text-white mb-2">1. CSRF Handling Fix</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Login button now enabled when email and password are filled</li>
                <li>Clear loading indicators when CSRF token is loading</li>
                <li>Graceful error handling with user-friendly messages</li>
                <li>No permanent button disable due to CSRF loading</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">2. Development Mode Bypass</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>CSRF validation bypassed in development environment</li>
                <li>Clear visual indicators when in development mode</li>
                <li>Allows testing without full backend CSRF setup</li>
                <li>Configurable via allowDevelopmentBypass prop</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">3. Better UX</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Visual feedback with loading spinners and status indicators</li>
                <li>Different button states for loading, security check, and ready</li>
                <li>Security status display showing token readiness</li>
                <li>Improved error messages and retry mechanisms</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 