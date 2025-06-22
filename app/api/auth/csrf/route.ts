import { NextRequest, NextResponse } from 'next/server';
import { TokenManager, SessionManager, SecurityLogger } from '@/lib/security';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';

  try {
    // Get session ID from cookie
    const sessionId = request.cookies.get('session-id')?.value;
    const token = request.cookies.get('auth-token')?.value;

    if (!sessionId || !token) {
      SecurityLogger.logSecurityEvent('csrf_no_session', { ip, userAgent }, 'medium');
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Validate JWT token
    const payload = TokenManager.validateJWT(token);
    if (!payload) {
      SecurityLogger.logSecurityEvent('csrf_invalid_token', { ip, userAgent }, 'high');
      return NextResponse.json({ error: 'Invalid authentication token' }, { status: 401 });
    }

    // Validate session
    const session = SessionManager.validateSession(sessionId);
    if (!session.valid || session.userId !== payload.userId) {
      SecurityLogger.logSecurityEvent('csrf_session_mismatch', { ip, userAgent, userId: payload.userId }, 'high');
      return NextResponse.json({ error: 'Session validation failed' }, { status: 401 });
    }

    // Generate CSRF token
    const csrfToken = TokenManager.generateCSRFToken(payload.userId, sessionId);

    // Log token generation
    SecurityLogger.logSecurityEvent('csrf_token_generated', {
      ip,
      userAgent,
      userId: payload.userId,
      role: payload.role,
      duration: Date.now() - startTime
    }, 'low');

    return NextResponse.json({
      success: true,
      csrfToken,
      expiresIn: 5 * 60 * 1000, // 5 minutes in milliseconds
      message: 'CSRF token generated successfully'
    });

  } catch (error) {
    SecurityLogger.logSecurityEvent('csrf_error', {
      ip,
      userAgent,
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: Date.now() - startTime
    }, 'high');

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 