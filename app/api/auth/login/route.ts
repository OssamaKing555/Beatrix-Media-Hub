import { NextRequest, NextResponse } from 'next/server';
import { RateLimiter, InputValidator, PasswordManager, TokenManager, SessionManager, SecurityLogger } from '@/lib/security';
import { useAuth } from '@/lib/auth';

// Mock user data with hashed passwords
const mockUsers = [
  {
    id: 'admin-001',
    email: 'admin@beatrixhub.com',
    password: PasswordManager.hashPassword('admin123'),
    name: 'Beatrix Admin',
    role: 'super_admin',
    avatar: '/avatars/admin.jpg',
    internalEmail: 'admin@admin.beatrixhub.com',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-12-19T10:30:00Z',
  },
  {
    id: 'freelancer-001',
    email: 'sara@beatrixhub.com',
    password: PasswordManager.hashPassword('sara123'),
    name: 'Sara Ahmed',
    role: 'freelancer',
    avatar: '/avatars/sara.jpg',
    internalEmail: 'sara@freelancers.beatrixhub.com',
    isActive: true,
    createdAt: '2024-02-01T00:00:00Z',
    lastLogin: '2024-12-19T08:45:00Z',
  },
  {
    id: 'client-001',
    email: 'mohamed@company.com',
    password: PasswordManager.hashPassword('client123'),
    name: 'Mohamed Ali',
    role: 'client',
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
    password: PasswordManager.hashPassword('startup123'),
    name: 'Layla Mansour',
    role: 'startup',
    company: 'InnovateTech',
    avatar: '/avatars/layla.jpg',
    internalEmail: 'layla@startups.beatrixhub.com',
    isActive: true,
    createdAt: '2024-06-01T00:00:00Z',
    lastLogin: '2024-12-19T04:00:00Z',
  },
];

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';

  try {
    // Rate limiting check
    const rateLimit = RateLimiter.checkRateLimit(`login:${ip}`);
    if (!rateLimit.allowed) {
      SecurityLogger.logSecurityEvent('login_rate_limit_exceeded', { ip, userAgent }, 'medium');
      return NextResponse.json(
        { 
          error: 'Too many login attempts. Please try again later.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: { 'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString() }
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const { email, password } = InputValidator.sanitizeObject(body);

    // Input validation
    if (!email || !password) {
      SecurityLogger.logSecurityEvent('login_missing_fields', { ip, userAgent, email: email ? 'provided' : 'missing' }, 'low');
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (!InputValidator.validateEmail(email)) {
      SecurityLogger.logSecurityEvent('login_invalid_email', { ip, userAgent, email }, 'low');
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check login attempts for this email
    const loginAttempts = RateLimiter.checkLoginAttempts(email);
    if (!loginAttempts.allowed) {
      SecurityLogger.logSecurityEvent('login_account_locked', { ip, userAgent, email }, 'high');
      return NextResponse.json(
        { 
          error: 'Account temporarily locked due to too many failed attempts',
          lockoutUntil: loginAttempts.lockoutUntil
        },
        { status: 423 }
      );
    }

    // Find user
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      RateLimiter.recordLoginAttempt(email, false);
      SecurityLogger.logSecurityEvent('login_user_not_found', { ip, userAgent, email }, 'medium');
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Verify password
    if (!PasswordManager.verifyPassword(password, user.password)) {
      RateLimiter.recordLoginAttempt(email, false);
      SecurityLogger.logSecurityEvent('login_invalid_password', { ip, userAgent, email }, 'medium');
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Check if account is active
    if (!user.isActive) {
      SecurityLogger.logSecurityEvent('login_inactive_account', { ip, userAgent, email }, 'high');
      return NextResponse.json({ error: 'Account is deactivated' }, { status: 403 });
    }

    // Create session (for logging only, not required for authentication)
    const sessionId = SessionManager.createSession(user.id, user.role);
    
    // Generate JWT token
    const token = TokenManager.generateJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
      sessionId
    });

    // Record successful login
    RateLimiter.recordLoginAttempt(email, true);

    // Log successful login
    SecurityLogger.logSecurityEvent('login_success', {
      ip,
      userAgent,
      email,
      userId: user.id,
      role: user.role,
      duration: Date.now() - startTime
    }, 'low');

    // Update last login
    user.lastLogin = new Date().toISOString();

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        internalEmail: user.internalEmail,
        company: user.company,
        isActive: user.isActive,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      },
      token,
      sessionId,
      message: 'Login successful'
    });

    // Set secure HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 60, // 30 minutes
      path: '/'
    });

    // (Optional) Set session-id cookie for logging only
    response.cookies.set('session-id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 60, // 30 minutes
      path: '/'
    });

    return response;

  } catch (error) {
    SecurityLogger.logSecurityEvent('login_error', {
      ip,
      userAgent,
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: Date.now() - startTime
    }, 'high');

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 