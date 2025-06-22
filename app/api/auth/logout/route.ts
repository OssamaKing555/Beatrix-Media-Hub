import { NextRequest, NextResponse } from 'next/server';
import { SessionManager, SecurityLogger, TokenManager } from '@/lib/security';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';

  try {
    // Get session ID from cookie
    const sessionId = request.cookies.get('session-id')?.value;
    const token = request.cookies.get('auth-token')?.value;

    if (sessionId) {
      // Validate session and get user info for logging
      const session = SessionManager.validateSession(sessionId);
      if (session.valid) {
        // Log logout event
        SecurityLogger.logSecurityEvent('logout_success', {
          ip,
          userAgent,
          userId: session.userId,
          role: session.role,
          duration: Date.now() - startTime
        }, 'low');

        // Destroy session
        SessionManager.destroySession(sessionId);
      }
    }

    if (token) {
      // Validate token for additional logging
      const payload = TokenManager.validateJWT(token);
      if (payload) {
        SecurityLogger.logSecurityEvent('logout_token_validated', {
          ip,
          userAgent,
          userId: payload.userId,
          role: payload.role
        }, 'low');
      }
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logout successful'
    });

    // Clear cookies
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    response.cookies.set('session-id', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    return response;

  } catch (error) {
    SecurityLogger.logSecurityEvent('logout_error', {
      ip,
      userAgent,
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: Date.now() - startTime
    }, 'medium');

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 