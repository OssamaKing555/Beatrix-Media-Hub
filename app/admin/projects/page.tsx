'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { canDelete } from '@/lib/auth'
import { getProjects, getStatusColor, getPriorityColor, formatCurrency, formatDate } from '@/lib/data'
import { useAuth } from '@/lib/auth'

export default function Projects() {
  const { user } = useAuth()
  const [projectList, setProjectList] = useState(getProjects())
  const [showAddModal, setShowAddModal] = useState(false)

  const handleDelete = (id: string) => {
    if (user && canDelete(user.role)) {
      setProjectList(prev => prev.filter(project => project.id !== id))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Projects</h1>
          <p className="text-gray-600 mt-2">Add, edit, or remove projects from your portfolio</p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Add New Project
        </Button>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Projects ({projectList.length})</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {projectList.map((project) => (
            <div key={project.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.replace('_', ' ')}
                    </Badge>
                    <Badge className={getPriorityColor(project.priority)}>
                      {project.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{project.clientName} • {project.type}</p>
                  <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Budget: {formatCurrency(project.budget, project.currency)}</span>
                    <span>Deadline: {formatDate(project.deadline)}</span>
                    <span>Tasks: {project.tasks.length}</span>
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
                        onClick={() => handleDelete(project.id)}
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

      {/* Add Project Modal (simplified) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Project</h3>
            <p className="text-gray-600 mb-4">This feature would open a form to add a new project.</p>
            <div className="flex space-x-2">
              <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Add Project</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 