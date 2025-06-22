import projects from '@/data/projects.json'
import services from '@/data/services.json'
import clients from '@/data/clients.json'

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Projects',
      value: projects.length,
      description: 'Active projects in portfolio',
      icon: '📁'
    },
    {
      title: 'Services Offered',
      value: services.length,
      description: 'Available services',
      icon: '⚙️'
    },
    {
      title: 'Client Partners',
      value: clients.length,
      description: 'Trusted client relationships',
      icon: '👥'
    },
    {
      title: 'Years Experience',
      value: '3+',
      description: 'Industry expertise',
      icon: '📈'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your BEATRIX Media Hub admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/projects"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">📁</span>
            <div>
              <p className="font-medium text-gray-900">Manage Projects</p>
              <p className="text-sm text-gray-600">Add, edit, or remove projects</p>
            </div>
          </a>
          <a
            href="/admin/services"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">⚙️</span>
            <div>
              <p className="font-medium text-gray-900">Manage Services</p>
              <p className="text-sm text-gray-600">Update service offerings</p>
            </div>
          </a>
          <a
            href="/admin/clients"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">👥</span>
            <div>
              <p className="font-medium text-gray-900">Manage Clients</p>
              <p className="text-sm text-gray-600">Update client information</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Projects</h2>
        <div className="space-y-4">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{project.title}</p>
                <p className="text-sm text-gray-600">{project.client} • {project.category}</p>
              </div>
              <span className="text-sm text-gray-500">{project.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 