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
    email: 'sara@beatrixhub.com',
    password: 'sara123',
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
    email: 'mohamed@company.com',
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
    id: 'startup-001',
    email: 'layla@startup.com',
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
    }),
    {
      name: 'beatrix-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
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
  
  return requiredRoles.some(role => userLevel >= roleHierarchy[role]);
};

export const getRoleDisplayName = (role: UserRole): string => {
  const displayNames: Record<UserRole, string> = {
    super_admin: 'Super Admin',
    supervisor: 'Supervisor',
    freelancer: 'Freelancer',
    client: 'Client',
    producer: 'Producer',
    distributor: 'Distributor',
    startup: 'Startup',
    expert: 'Expert',
  };
  return displayNames[role];
};

export const getRoleColor = (role: UserRole): string => {
  const colors: Record<UserRole, string> = {
    super_admin: 'bg-red-500',
    supervisor: 'bg-purple-500',
    freelancer: 'bg-blue-500',
    client: 'bg-green-500',
    producer: 'bg-orange-500',
    distributor: 'bg-yellow-500',
    startup: 'bg-pink-500',
    expert: 'bg-indigo-500',
  };
  return colors[role];
};

// Platform access control
export const canAccessPlatform = (userRole: UserRole, platform: string): boolean => {
  const platformAccess: Record<UserRole, string[]> = {
    super_admin: ['admin', 'freelancers', 'clients', 'startups', 'producers', 'distributors', 'experts', 'supervisors'],
    supervisor: ['admin', 'freelancers', 'clients', 'startups', 'producers', 'distributors', 'experts'],
    freelancer: ['freelancers'],
    client: ['clients'],
    startup: ['startups'],
    producer: ['producers'],
    distributor: ['distributors'],
    expert: ['experts'],
  };

  return platformAccess[userRole]?.includes(platform) || false;
};

// Check if user can access admin area
export const canAccessAdmin = (userRole: UserRole): boolean => {
  return hasPermission(userRole, ['super_admin', 'supervisor']);
};

// Get user's accessible platforms
export const getUserPlatforms = (userRole: UserRole): string[] => {
  const platformAccess: Record<UserRole, string[]> = {
    super_admin: ['admin', 'freelancers', 'clients', 'startups', 'producers', 'distributors', 'experts', 'supervisors'],
    supervisor: ['admin', 'freelancers', 'clients', 'startups', 'producers', 'distributors', 'experts'],
    freelancer: ['freelancers'],
    client: ['clients'],
    startup: ['startups'],
    producer: ['producers'],
    distributor: ['distributors'],
    expert: ['experts'],
  };

  return platformAccess[userRole] || [];
}; 