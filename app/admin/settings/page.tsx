'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useAuth, hasPermission } from '@/lib/auth'
import siteConfig from '@/data/siteConfig.json'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Upload, Palette, Building, Link as LinkIcon, AtSign, Phone } from 'lucide-react'

export default function Settings() {
  const { user } = useAuth()
  const [settings, setSettings] = useState(siteConfig)
  const [isSaving, setIsSaving] = useState(false)
  
  const canEdit = user ? hasPermission(user.role, 'super_admin') : false

  const handleSave = () => {
    if (!canEdit) {
      toast.error("You don't have permission to save settings.")
      return
    }
    setIsSaving(true)
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Saving settings...',
        success: () => {
          setIsSaving(false)
          console.log('Saved Settings:', settings)
          return 'Settings saved successfully!'
        },
        error: 'Failed to save settings.',
      }
    )
  }

  const handleChange = (path: string, value: string) => {
    setSettings(prev => {
      const keys = path.split('.')
      const newSettings = JSON.parse(JSON.stringify(prev))
      let current: any = newSettings
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value
      return newSettings
    })
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    )
  }
  
  if (!canEdit) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to access settings.</p>
      </div>
    )
  }

  const inputIconStyle = "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-gray-600 mt-2">Manage your platform's global configuration.</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving || !canEdit}
          style={{ backgroundColor: siteConfig.ui.theme.primary }}
          className="text-white"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Building className="mr-2" /> Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Label htmlFor="companyName">Company Name</Label>
                <AtSign className={inputIconStyle} />
                <Input id="companyName" value={settings.site.name} onChange={(e) => handleChange('site.name', e.target.value)} className="pl-10"/>
              </div>
              <div>
                <Label htmlFor="description">Company Description</Label>
                <Textarea id="description" value={settings.site.description} onChange={(e) => handleChange('site.description', e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Label htmlFor="email">Email</Label>
                  <AtSign className={inputIconStyle} />
                  <Input id="email" type="email" value={settings.contact.email} onChange={(e) => handleChange('contact.email', e.target.value)} className="pl-10"/>
                </div>
                <div className="relative">
                  <Label htmlFor="phone">Phone</Label>
                  <Phone className={inputIconStyle} />
                  <Input id="phone" value={settings.contact.phone} onChange={(e) => handleChange('contact.phone', e.target.value)} className="pl-10"/>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><LinkIcon className="mr-2" /> Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(settings.contact.social).map(key => (
                <div key={key} className="relative">
                  <Label htmlFor={key} className="capitalize">{key} URL</Label>
                  <LinkIcon className={inputIconStyle} />
                  <Input id={key} value={settings.contact.social[key as keyof typeof settings.contact.social]} onChange={(e) => handleChange(`contact.social.${key}`, e.target.value)} className="pl-10"/>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Palette className="mr-2" /> Branding & Theme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Company Logo</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img src={settings.site.logo} alt="logo" className="max-w-full max-h-full"/>
                  </div>
                  <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Upload</Button>
                </div>
              </div>
              <div>
                <Label>Favicon</Label>
                 <div className="flex items-center space-x-4 mt-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img src={settings.site.favicon} alt="favicon" className="max-w-full max-h-full"/>
                  </div>
                  <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Upload</Button>
                </div>
              </div>
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center space-x-2">
                  <Input id="primaryColor" type="color" value={settings.ui.theme.primary} onChange={(e) => handleChange('ui.theme.primary', e.target.value)} className="w-12 h-12 p-1"/>
                  <Input type="text" value={settings.ui.theme.primary} onChange={(e) => handleChange('ui.theme.primary', e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
} 