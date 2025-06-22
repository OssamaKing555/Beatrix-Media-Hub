'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { canDelete } from '@/lib/auth'
import { getClients, formatDate } from '@/lib/data'
import { useAuth } from '@/lib/auth'

export default function Clients() {
  const { user } = useAuth()
  const [clientList, setClientList] = useState(getClients())
  const [showAddModal, setShowAddModal] = useState(false)

  const handleDelete = (id: string) => {
    if (user && canDelete(user.role)) {
      setClientList(prev => prev.filter(client => client.id !== id))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Clients</h1>
          <p className="text-gray-600 mt-2">Add, edit, or remove clients from your portfolio</p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Add New Client
        </Button>
      </div>

      {/* Clients List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Clients ({clientList.length})</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {clientList.map((client) => (
            <div key={client.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
                    <Badge variant="outline">{client.industry}</Badge>
                    <Badge variant="outline">{client.size}</Badge>
                    {client.featured && (
                      <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                    )}
                    {client.verified && (
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{client.location} • {client.website}</p>
                  <p className="text-sm text-gray-500 mt-1">{client.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Projects: {client.projects.length}</span>
                    <span>Joined: {formatDate(client.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    {user && canDelete(user.role) && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(client.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Client Modal (simplified) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Client</h3>
            <p className="text-gray-600 mb-4">This feature would open a form to add a new client.</p>
            <div className="flex space-x-2">
              <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Add Client</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 