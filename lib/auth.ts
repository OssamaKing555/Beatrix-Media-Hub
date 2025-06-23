import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 
  | 'super_admin'
  | 'supervisor'
  | 'freelancer'
  | 'client'
  | 'producer'
  | 'distributor'
  | 'startup'
  | 'expert';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  internalEmail?: string;
  company?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  directAdminAccess: () => void;
}

// Mock user data - replace with real API calls
const mockUsers = [
  {
    id: 'admin-001',
    email: 'admin@beatrixhub.com',
    password: 'admin123',
    name: 'Beatrix Admin',
    role: 'super_admin' as UserRole,
    avatar: '/avatars/admin.jpg',
    internalEmail: 'admin@admin.beatrixhub.com',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-12-19T10:30:00Z',
  },
  {
    id: 'freelancer-001',
    email: 'freelancer@beatrixhub.com',
    password: 'freelance',
    name: 'Sara Ahmed',
    role: 'freelancer' as UserRole,
    avatar: '/avatars/sara.jpg',
    internalEmail: 'sara@freelancers.beatrixhub.com',
    isActive: true,
    createdAt: '2024-02-01T00:00:00Z',
    lastLogin: '2024-12-19T08:45:00Z',
  },
  {
    id: 'client-001',
    email: 'client@beatrixhub.com',
    password: 'client123',
    name: 'Mohamed Ali',
    role: 'client' as UserRole,
    company: 'TechStart Egypt',
    avatar: '/avatars/mohamed.jpg',
    internalEmail: 'mohamed@clients.beatrixhub.com',
    isActive: true,
    createdAt: '2024-03-01T00:00:00Z',
    lastLogin: '2024-12-19T07:30:00Z',
  },
  {
    id: 'expert-001',
    email: 'expert@beatrixhub.com',
    password: 'expert123',
    name: 'Dr. Karim El-Sayed',
    role: 'expert' as UserRole,
    avatar: '/avatars/karim.jpg',
    internalEmail: 'karim@experts.beatrixhub.com',
    isActive: true,
    createdAt: '2024-07-01T00:00:00Z',
    lastLogin: '2024-12-19T03:30:00Z',
  },
  {
    id: 'supervisor-001',
    email: 'supervisor@beatrixhub.com',
    password: 'supervisor123',
    name: 'Ahmed Hassan',
    role: 'supervisor' as UserRole,
    avatar: '/avatars/ahmed.jpg',
    internalEmail: 'ahmed@supervisors.beatrixhub.com',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    lastLogin: '2024-12-19T09:15:00Z',
  },
  {
    id: 'producer-001',
    email: 'producer@beatrixhub.com',
    password: 'producer123',
    name: 'Fatima Zahra',
    role: 'producer' as UserRole,
    avatar: '/avatars/fatima.jpg',
    internalEmail: 'fatima@producers.beatrixhub.com',
    isActive: true,
    createdAt: '2024-04-01T00:00:00Z',
    lastLogin: '2024-12-19T06:20:00Z',
  },
  {
    id: 'distributor-001',
    email: 'distributor@beatrixhub.com',
    password: 'distributor123',
    name: 'Omar Khalil',
    role: 'distributor' as UserRole,
    company: 'Media Distribution Co.',
    avatar: '/avatars/omar.jpg',
    internalEmail: 'omar@distributors.beatrixhub.com',
    isActive: true,
    createdAt: '2024-05-01T00:00:00Z',
    lastLogin: '2024-12-19T05:10:00Z',
  },
  {
    id: 'startup-001',
    email: 'startup@beatrixhub.com',
    password: 'startup123',
    name: 'Layla Mansour',
    role: 'startup' as UserRole,
    company: 'InnovateTech',
    avatar: '/avatars/layla.jpg',
    internalEmail: 'layla@startups.beatrixhub.com',
    isActive: true,
    createdAt: '2024-06-01T00:00:00Z',
    lastLogin: '2024-12-19T04:00:00Z',
  },
];

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser = mockUsers.find(
          u => u.email === email && u.password === password
        );
        
        if (mockUser) {
          const { password: _, ...userWithoutPassword } = mockUser;
          set({
            user: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
        // Clear localStorage
        localStorage.removeItem('adminBypass');
        localStorage.removeItem('adminUser');
      },

      setUser: (user: User) => {
        set({
          user,
          isAuthenticated: true,
        });
      },

      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
          });
        }
      },

      directAdminAccess: () => {
        const adminUser: User = {
          id: 'admin-1',
          email: 'admin@beatrixhub.com',
          name: 'Super Admin',
          role: 'super_admin',
          avatar: '/avatars/admin.jpg',
          internalEmail: 'admin@admin.beatrixhub.com',
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z',
          lastLogin: new Date().toISOString(),
        };
        
        set({
          user: adminUser,
          isAuthenticated: true,
        });
        
        // Store in localStorage as backup
        localStorage.setItem('adminBypass', 'true');
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
      },
    }),
    {
      name: 'beatrix-auth',
      version: 1,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      migrate: (persistedState) => persistedState,
    }
  )
);

// Standalone functions for compatibility with existing code
export const isAuthenticated = (): boolean => {
  return useAuth.getState().isAuthenticated;
};

export const getCurrentUser = (): User | null => {
  return useAuth.getState().user;
};

export const logout = (): void => {
  useAuth.getState().logout();
};

// Additional exports for admin pages
export const canDelete = (userRole: UserRole): boolean => {
  return hasPermission(userRole, ['super_admin', 'supervisor']);
};

export const canEditSettings = (userRole: UserRole): boolean => {
  return hasPermission(userRole, ['super_admin']);
};

export const canManageUsers = (userRole: UserRole): boolean => {
  return hasPermission(userRole, ['super_admin', 'supervisor']);
};

export const canViewAnalytics = (userRole: UserRole): boolean => {
  return hasPermission(userRole, ['super_admin', 'supervisor']);
};

// Role-based access control
export const hasPermission = (userRole: UserRole, requiredRole: UserRole | UserRole[]): boolean => {
  const roleHierarchy: Record<UserRole, number> = {
    super_admin: 8,
    supervisor: 7,
    expert: 6,
    producer: 5,
    distributor: 4,
    freelancer: 3,
    client: 2,
    startup: 1,
  };

  const userLevel = roleHierarchy[userRole];
  const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  
  return requiredRoles.some(role => {
    const requiredLevel = roleHierarchy[role];
    return userLevel >= requiredLevel;
  });
};

export const getRoleDisplayName = (role: UserRole): string => {
  const roleNames: Record<UserRole, string> = {
    super_admin: 'Super Admin',
    supervisor: 'Supervisor',
    freelancer: 'Freelancer',
    client: 'Client',
    producer: 'Producer',
    distributor: 'Distributor',
    startup: 'Startup',
    expert: 'Expert',
  };
  return roleNames[role] || role;
};

export const getRoleColor = (role: UserRole): string => {
  const roleColors: Record<UserRole, string> = {
    super_admin: 'bg-red-100 text-red-800',
    supervisor: 'bg-purple-100 text-purple-800',
    freelancer: 'bg-blue-100 text-blue-800',
    client: 'bg-green-100 text-green-800',
    producer: 'bg-orange-100 text-orange-800',
    distributor: 'bg-indigo-100 text-indigo-800',
    startup: 'bg-pink-100 text-pink-800',
    expert: 'bg-yellow-100 text-yellow-800',
  };
  return roleColors[role] || 'bg-gray-100 text-gray-800';
};

export const canAccessPlatform = (userRole: UserRole, platform: string): boolean => {
  const platformAccess: Record<string, UserRole[]> = {
    freelancers: ['super_admin', 'supervisor', 'freelancer'],
    clients: ['super_admin', 'supervisor', 'client'],
    experts: ['super_admin', 'supervisor', 'expert'],
    producers: ['super_admin', 'supervisor', 'producer'],
    distributors: ['super_admin', 'supervisor', 'distributor'],
    startups: ['super_admin', 'supervisor', 'startup'],
    admin: ['super_admin'],
    supervisors: ['super_admin', 'supervisor'],
  };
  
  // Super admin can access all platforms
  if (userRole === 'super_admin') {
    return true;
  }
  
  return platformAccess[platform]?.includes(userRole) || false;
};

export const canAccessAdmin = (userRole: UserRole): boolean => {
  return hasPermission(userRole, ['super_admin', 'supervisor']);
};

export const getUserPlatforms = (userRole: UserRole): string[] => {
  const allPlatforms = ['freelancers', 'clients', 'experts', 'producers', 'distributors', 'startups'];
  return allPlatforms.filter(platform => canAccessPlatform(userRole, platform));
}; 