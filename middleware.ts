import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Extend global type for security logs
declare global {
  var securityLogs: Array<{
    timestamp: string;
    event: string;
    details: any;
    severity: 'low' | 'medium' | 'high';
  }>;
}

// Security Configuration
const SECURITY_CONFIG = {
  ALLOWED_ORIGINS: ['https://beatrixhub.com', 'https://www.beatrixhub.com', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  RATE_LIMIT_WINDOW: 60 * 1000, // 1 minute
  RATE_LIMIT_MAX_REQUESTS: 30, // 30 requests per minute (increased from 5 for development)
  LOGIN_ATTEMPTS_MAX: 5,
  ACCOUNT_LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
};

// In-memory rate limiting store (replace with Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const loginAttempts = new Map<string, { count: number; lockoutUntil: number }>();

// Security Headers
const getSecurityHeaders = () => ({
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
});

// CORS Headers
const getCorsHeaders = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin && SECURITY_CONFIG.ALLOWED_ORIGINS.includes(origin) ? origin : SECURITY_CONFIG.ALLOWED_ORIGINS[0],
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
  'Access-Control-Allow-Credentials': 'true',
});

// Rate Limiting
const checkRateLimit = (identifier: string) => {
  const now = Date.now();
  const key = `rate_limit:${identifier}`;
  const record = rateLimitStore.get(key);
  
  if (!record || now > record.resetTime) {
    const newRecord = {
      count: 1,
      resetTime: now + SECURITY_CONFIG.RATE_LIMIT_WINDOW
    };
    rateLimitStore.set(key, newRecord);
    return { allowed: true, remaining: SECURITY_CONFIG.RATE_LIMIT_MAX_REQUESTS - 1, resetTime: newRecord.resetTime };
  }
  
  if (record.count >= SECURITY_CONFIG.RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }
  
  record.count++;
  return { allowed: true, remaining: SECURITY_CONFIG.RATE_LIMIT_MAX_REQUESTS - record.count, resetTime: record.resetTime };
};

// Security Logging
const logSecurityEvent = (event: string, details: any, severity: 'low' | 'medium' | 'high' = 'medium') => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details,
    severity,
  };
  
  console.log(`[SECURITY ${severity.toUpperCase()}]`, logEntry);
  
  // Store in memory for admin dashboard (replace with database in production)
  if (!global.securityLogs) {
    global.securityLogs = [];
  }
  global.securityLogs.push(logEntry);
  
  // Keep only last 1000 entries
  if (global.securityLogs.length > 1000) {
    global.securityLogs = global.securityLogs.slice(-1000);
  }
};

export function middleware(request: NextRequest) {
  const startTime = Date.now();
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const origin = request.headers.get('origin');
  const pathname = request.nextUrl.pathname;

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 200 });
    Object.entries(getCorsHeaders(origin)).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  try {
    // CORS check
    if (origin && !SECURITY_CONFIG.ALLOWED_ORIGINS.includes(origin)) {
      logSecurityEvent('cors_violation', { ip, origin, userAgent, pathname }, 'high');
      return NextResponse.json({ error: 'CORS violation' }, { status: 403 });
    }

    // Rate limiting for sensitive endpoints
    const sensitiveEndpoints = ['/api/auth', '/api/upload', '/api/admin', '/login'];
    const isSensitiveEndpoint = sensitiveEndpoints.some(endpoint => pathname.startsWith(endpoint));
    
    if (isSensitiveEndpoint) {
      const rateLimit = checkRateLimit(ip);
      if (!rateLimit.allowed) {
        logSecurityEvent('rate_limit_exceeded', { ip, userAgent, pathname }, 'medium');
        return NextResponse.json(
          { 
            error: 'Rate limit exceeded', 
            retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000) 
          },
          { 
            status: 429, 
            headers: { 
              'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString() 
            } 
          }
        );
      }
    }

    // Authentication check for protected routes
    const protectedRoutes = ['/admin', '/platforms', '/api/admin', '/api/upload'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    
    if (isProtectedRoute) {
      const authToken = request.headers.get('authorization')?.replace('Bearer ', '') || 
                       request.cookies.get('auth-token')?.value;
      
      if (!authToken) {
        logSecurityEvent('unauthorized_access', { ip, userAgent, pathname }, 'high');
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    // Continue with the request
    const response = NextResponse.next();

    // Add security headers
    Object.entries(getSecurityHeaders()).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    // Add CORS headers
    Object.entries(getCorsHeaders(origin)).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    // Log successful request for sensitive endpoints
    if (isSensitiveEndpoint) {
      logSecurityEvent('request_success', {
        ip,
        userAgent,
        method: request.method,
        pathname,
        duration: Date.now() - startTime,
      }, 'low');
    }

    return response;

  } catch (error) {
    logSecurityEvent('middleware_error', {
      ip,
      userAgent,
      method: request.method,
      pathname,
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: Date.now() - startTime,
    }, 'high');

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 