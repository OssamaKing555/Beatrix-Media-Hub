import usersData from '@/data/users.json';
import projectsData from '@/data/projects.json';
import servicesData from '@/data/services.json';
import consultingData from '@/data/consulting.json';
import siteConfigData from '@/data/siteConfig.json';
import clientsData from '@/data/clients.json';

// Types
export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  name: string;
  avatar?: string;
  internalEmail?: string;
  permissions?: string[];
  assignedProjects?: string[];
  specialties?: string[];
  portfolio?: string[];
  assignedTasks?: string[];
  rating?: number;
  completedProjects?: number;
  company?: string;
  projects?: string[];
  subscription?: string;
  reach?: string;
  verified?: boolean;
  availableProjects?: string[];
  stage?: string;
  consultations?: string[];
  expertise?: string[];
  credentials?: string[];
  hourlyRate?: number;
  isActive: boolean;
  createdAt: string;
  lastLogin: string;
}

export interface Project {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  type: string;
  status: string;
  priority: string;
  budget: number;
  currency: string;
  startDate: string;
  deadline: string;
  description: string;
  requirements: string[];
  assignedSupervisor: string;
  assignedFreelancers: string[];
  tasks: Task[];
  files: ProjectFile[];
  messages: ProjectMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  projectId?: string;
  title: string;
  description: string;
  assignedTo: string;
  status: string;
  priority: string;
  deadline: string;
  progress: number;
  files: ProjectFile[];
  comments: TaskComment[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface ProjectMessage {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
}

export interface TaskComment {
  id: string;
  from: string;
  content: string;
  timestamp: string;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  pricing: Record<string, any>;
  image: string;
  icon: string;
  popular: boolean;
}

export interface ConsultationType {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  price: number;
  currency: string;
  experts: string[];
  topics: string[];
  popular: boolean;
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  avatar: string;
  credentials: string[];
  specialties: string[];
  experience: string;
  rating: number;
  consultations: number;
  hourlyRate: number;
  bio: string;
  languages: string[];
  availability: Record<string, string[]>;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  description: string;
  projects: string[];
  testimonial: {
    text: string;
    author: string;
    position: string;
    rating: number;
  };
  caseStudy: {
    title: string;
    summary: string;
    challenge: string;
    solution: string;
    results: string[];
    duration: string;
    budget: string;
  };
  featured: boolean;
  verified: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  clientId: string;
  text: string;
  author: string;
  position: string;
  company: string;
  rating: number;
  project: string;
  featured: boolean;
}

// Data fetching functions
export const getUsers = (): User[] => {
  return usersData.users as User[];
};

export const getUserById = (id: string): User | undefined => {
  return usersData.users.find(user => user.id === id) as User | undefined;
};

export const getUserByEmail = (email: string): User | undefined => {
  return usersData.users.find(user => user.email === email) as User | undefined;
};

export const getProjects = (): Project[] => {
  return projectsData.projects as Project[];
};

export const getProjectById = (id: string): Project | undefined => {
  return projectsData.projects.find(project => project.id === id) as Project | undefined;
};

export const getProjectsByClient = (clientId: string): Project[] => {
  return projectsData.projects.filter(project => project.clientId === clientId) as Project[];
};

export const getProjectsByStatus = (status: string): Project[] => {
  return projectsData.projects.filter(project => project.status === status) as Project[];
};

export const getTasks = (): Task[] => {
  return projectsData.tasks as Task[];
};

export const getTaskById = (id: string): Task | undefined => {
  return projectsData.tasks.find(task => task.id === id) as Task | undefined;
};

export const getTasksByUser = (userId: string): Task[] => {
  return projectsData.tasks.filter(task => task.assignedTo === userId) as Task[];
};

export const getServices = (): Service[] => {
  return servicesData.services as Service[];
};

export const getServiceById = (id: string): Service | undefined => {
  return servicesData.services.find(service => service.id === id) as Service | undefined;
};

export const getServicesByCategory = (category: string): Service[] => {
  return servicesData.services.filter(service => service.category === category) as Service[];
};

export const getServiceCategories = () => {
  const categories = [...new Set(servicesData.services.map(service => service.category))];
  return categories;
};

export const getConsultationTypes = (): ConsultationType[] => {
  return consultingData.consultationTypes as ConsultationType[];
};

export const getConsultationTypeById = (id: string): ConsultationType | undefined => {
  return consultingData.consultationTypes.find(type => type.id === id) as ConsultationType | undefined;
};

export const getExperts = (): Expert[] => {
  return consultingData.experts as Expert[];
};

export const getExpertById = (id: string): Expert | undefined => {
  return consultingData.experts.find(expert => expert.id === id) as Expert | undefined;
};

export const getExpertsBySpecialty = (specialty: string): Expert[] => {
  return consultingData.experts.filter(expert => 
    expert.specialties.includes(specialty)
  ) as Expert[];
};

export const getBookings = () => {
  return consultingData.bookings || [];
};

export const getClients = (): Client[] => {
  return clientsData.clients as Client[];
};

export const getClientById = (id: string): Client | undefined => {
  return clientsData.clients.find(client => client.id === id) as Client | undefined;
};

export const getFeaturedClients = (): Client[] => {
  return clientsData.clients.filter(client => client.featured) as Client[];
};

export const getTestimonials = (): Testimonial[] => {
  return clientsData.testimonials as Testimonial[];
};

export const getFeaturedTestimonials = (): Testimonial[] => {
  return clientsData.testimonials.filter(testimonial => testimonial.featured) as Testimonial[];
};

export const getSiteConfig = () => {
  return siteConfigData;
};

// Utility functions
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Mock API functions for future backend integration
export const api = {
  // User management
  createUser: async (userData: Partial<User>): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...userData, id: `user-${Date.now()}`, createdAt: new Date().toISOString() } as User;
  },

  updateUser: async (id: string, updates: Partial<User>): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = getUserById(id);
    if (!user) throw new Error('User not found');
    return { ...user, ...updates };
  },

  // Project management
  createProject: async (projectData: Partial<Project>): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...projectData, id: `project-${Date.now()}`, createdAt: new Date().toISOString() } as Project;
  },

  updateProject: async (id: string, updates: Partial<Project>): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const project = getProjectById(id);
    if (!project) throw new Error('Project not found');
    return { ...project, ...updates, updatedAt: new Date().toISOString() };
  },

  // Task management
  createTask: async (taskData: Partial<Task>): Promise<Task> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...taskData, id: `task-${Date.now()}`, createdAt: new Date().toISOString() } as Task;
  },

  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const task = getTaskById(id);
    if (!task) throw new Error('Task not found');
    return { ...task, ...updates, updatedAt: new Date().toISOString() };
  },

  // Booking management
  createBooking: async (bookingData: any): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...bookingData, id: `booking-${Date.now()}`, createdAt: new Date().toISOString() };
  },
};

// Plans/packages for user management
export const PLANS = ['Basic', 'Pro', 'Enterprise'];

// Permissions for user management
export const PERMISSIONS = [
  'all',
  'manage_freelancers',
  'approve_submissions',
  'client_communication',
  'view_projects',
  'edit_projects',
  'manage_users',
  'access_marketplace',
  'access_consulting',
  'access_visual_editor',
  'view_analytics',
  'edit_settings',
];

// Get all unique permissions from users and the default list
export const getAllUniquePermissions = (): string[] => {
  const users = getUsers();
  const perms = users.flatMap(u => u.permissions || []);
  return Array.from(new Set([...perms, ...PERMISSIONS]));
}; 