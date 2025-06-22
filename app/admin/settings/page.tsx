'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import FormInput from '@/components/layout/FormInput'
import { canEditSettings } from '@/lib/auth'
import siteConfig from '@/data/siteConfig.json'

export default function Settings() {
  const [settings, setSettings] = useState({
    companyName: siteConfig.company.name,
    description: siteConfig.company.description,
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    address: siteConfig.contact.address,
    instagram: siteConfig.social.instagram,
    linkedin: siteConfig.social.linkedin,
    facebook: siteConfig.social.facebook,
    whatsapp: siteConfig.social.whatsapp,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (canEditSettings()) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  if (!canEditSettings()) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to access settings.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-600 mt-2">Configure your company information and contact details</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Company Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Company Name"
            name="companyName"
            value={settings.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={settings.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <FormInput
            label="Phone"
            name="phone"
            value={settings.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          <FormInput
            label="Address"
            name="address"
            value={settings.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </div>

        <FormInput
          label="Company Description"
          name="description"
          type="textarea"
          value={settings.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="mt-6"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Social Media Links</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Instagram URL"
            name="instagram"
            value={settings.instagram}
            onChange={(e) => handleChange('instagram', e.target.value)}
          />
          <FormInput
            label="LinkedIn URL"
            name="linkedin"
            value={settings.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
          />
          <FormInput
            label="Facebook URL"
            name="facebook"
            value={settings.facebook}
            onChange={(e) => handleChange('facebook', e.target.value)}
          />
          <FormInput
            label="WhatsApp Number"
            name="whatsapp"
            value={settings.whatsapp}
            onChange={(e) => handleChange('whatsapp', e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Logo & Branding</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Logo
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <Button variant="outline">Upload New Logo</Button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Favicon
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">B</span>
              </div>
              <Button variant="outline">Upload New Favicon</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button 
          onClick={handleSave}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Save Changes
        </Button>
      </div>

      {saved && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Settings saved successfully!
        </div>
      )}
    </div>
  )
} 