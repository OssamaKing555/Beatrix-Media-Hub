import { createHash, randomBytes, createHmac } from 'crypto';

// Security Configuration
export const SECURITY_CONFIG = {
  // Token settings
  CSRF_TOKEN_EXPIRY: 5 * 60 * 1000, // 5 minutes
  JWT_TOKEN_EXPIRY: 30 * 60 * 1000, // 30 minutes
  SESSION_EXPIRY: 30 * 60 * 1000, // 30 minutes
  
  // Rate limiting - More lenient for development
  RATE_LIMIT_WINDOW: 60 * 1000, // 1 minute
  RATE_LIMIT_MAX_REQUESTS: 30, // 30 requests per minute (increased from 5)
  LOGIN_ATTEMPTS_MAX: 5,
  ACCOUNT_LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  
  // CORS settings
  ALLOWED_ORIGINS: ['https://beatrixhub.com', 'https://www.beatrixhub.com', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  
  // File upload restrictions
  ALLOWED_FILE_TYPES: ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx', '.txt', '.mp4', '.mov', '.avi', '.mp3', '.wav'],
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  FORBIDDEN_EXTENSIONS: ['.exe', '.php', '.html', '.js', '.bat', '.cmd', '.sh', '.ps1', '.vbs'],
  
  // Password requirements
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REQUIRE_UPPERCASE: true,
  PASSWORD_REQUIRE_LOWERCASE: true,
  PASSWORD_REQUIRE_NUMBERS: true,
  PASSWORD_REQUIRE_SPECIAL: true,
};

// In-memory storage for rate limiting and sessions (replace with Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const sessionStore = new Map<string, { userId: string; role: string; expires: number }>();
const loginAttempts = new Map<string, { count: number; lockoutUntil: number }>();

// Token Management
export class TokenManager {
  private static readonly SECRET = process.env.JWT_SECRET || 'beatrix-super-secret-key-change-in-production';
  
  static generateCSRFToken(userId: string, sessionId: string): string {
    const timestamp = Date.now();
    const random = randomBytes(32).toString('hex');
    const data = `${userId}:${sessionId}:${timestamp}:${random}`;
    const signature = createHmac('sha256', this.SECRET).update(data).digest('hex');
    return `${data}:${signature}`;
  }
  
  static validateCSRFToken(token: string, userId: string, sessionId: string): boolean {
    try {
      const parts = token.split(':');
      if (parts.length !== 5) return false;
      
      const [tokenUserId, tokenSessionId, timestamp, random, signature] = parts;
      
      // Check if token is expired
      if (Date.now() - parseInt(timestamp) > SECURITY_CONFIG.CSRF_TOKEN_EXPIRY) {
        return false;
      }
      
      // Verify user and session match
      if (tokenUserId !== userId || tokenSessionId !== sessionId) {
        return false;
      }
      
      // Verify signature
      const data = `${userId}:${sessionId}:${timestamp}:${random}`;
      const expectedSignature = createHmac('sha256', this.SECRET).update(data).digest('hex');
      
      return signature === expectedSignature;
    } catch {
      return false;
    }
  }
  
  static generateJWT(payload: any): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const exp = now + (SECURITY_CONFIG.JWT_TOKEN_EXPIRY / 1000);
    
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify({ ...payload, iat: now, exp })).toString('base64url');
    
    const signature = createHmac('sha256', this.SECRET)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url');
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
  
  static validateJWT(token: string): any | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const [encodedHeader, encodedPayload, signature] = parts;
      
      // Verify signature
      const expectedSignature = createHmac('sha256', this.SECRET)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest('base64url');
      
      if (signature !== expectedSignature) return null;
      
      // Decode payload
      const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString());
      
      // Check expiration
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        return null;
      }
      
      return payload;
    } catch {
      return null;
    }
  }
}

// Rate Limiting
export class RateLimiter {
  static checkRateLimit(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
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
  }
  
  static checkLoginAttempts(email: string): { allowed: boolean; remainingAttempts: number; lockoutUntil?: number } {
    const record = loginAttempts.get(email);
    const now = Date.now();
    
    if (record && record.lockoutUntil && now < record.lockoutUntil) {
      return { allowed: false, remainingAttempts: 0, lockoutUntil: record.lockoutUntil };
    }
    
    if (!record || now > record.lockoutUntil) {
      return { allowed: true, remainingAttempts: SECURITY_CONFIG.LOGIN_ATTEMPTS_MAX };
    }
    
    return { allowed: true, remainingAttempts: SECURITY_CONFIG.LOGIN_ATTEMPTS_MAX - record.count };
  }
  
  static recordLoginAttempt(email: string, success: boolean): void {
    if (success) {
      loginAttempts.delete(email);
      return;
    }
    
    const record = loginAttempts.get(email) || { count: 0, lockoutUntil: 0 };
    record.count++;
    
    if (record.count >= SECURITY_CONFIG.LOGIN_ATTEMPTS_MAX) {
      record.lockoutUntil = Date.now() + SECURITY_CONFIG.ACCOUNT_LOCKOUT_DURATION;
    }
    
    loginAttempts.set(email, record);
  }
}

// Input Validation and Sanitization
export class InputValidator {
  static sanitizeString(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim();
  }
  
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }
  
  static validatePassword(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (password.length < SECURITY_CONFIG.PASSWORD_MIN_LENGTH) {
      errors.push(`Password must be at least ${SECURITY_CONFIG.PASSWORD_MIN_LENGTH} characters long`);
    }
    
    if (SECURITY_CONFIG.PASSWORD_REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (SECURITY_CONFIG.PASSWORD_REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (SECURITY_CONFIG.PASSWORD_REQUIRE_NUMBERS && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (SECURITY_CONFIG.PASSWORD_REQUIRE_SPECIAL && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return { valid: errors.length === 0, errors };
  }
  
  static validateFileUpload(filename: string, size: number): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Check file size
    if (size > SECURITY_CONFIG.MAX_FILE_SIZE) {
      errors.push(`File size must be less than ${SECURITY_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB`);
    }
    
    // Check file extension
    const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
    
    if (SECURITY_CONFIG.FORBIDDEN_EXTENSIONS.includes(extension)) {
      errors.push(`File type ${extension} is not allowed`);
    }
    
    if (!SECURITY_CONFIG.ALLOWED_FILE_TYPES.includes(extension)) {
      errors.push(`File type ${extension} is not supported`);
    }
    
    return { valid: errors.length === 0, errors };
  }
  
  static sanitizeObject(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return typeof obj === 'string' ? this.sanitizeString(obj) : obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeObject(item));
    }
    
    const sanitized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = this.sanitizeObject(value);
    }
    
    return sanitized;
  }
}

// Session Management
export class SessionManager {
  static createSession(userId: string, role: string): string {
    const sessionId = randomBytes(32).toString('hex');
    const expires = Date.now() + SECURITY_CONFIG.SESSION_EXPIRY;
    
    sessionStore.set(sessionId, { userId, role, expires });
    return sessionId;
  }
  
  static validateSession(sessionId: string): { valid: boolean; userId?: string; role?: string } {
    const session = sessionStore.get(sessionId);
    
    if (!session) {
      return { valid: false };
    }
    
    if (Date.now() > session.expires) {
      sessionStore.delete(sessionId);
      return { valid: false };
    }
    
    return { valid: true, userId: session.userId, role: session.role };
  }
  
  static destroySession(sessionId: string): void {
    sessionStore.delete(sessionId);
  }
  
  static refreshSession(sessionId: string): boolean {
    const session = sessionStore.get(sessionId);
    if (!session) return false;
    
    session.expires = Date.now() + SECURITY_CONFIG.SESSION_EXPIRY;
    sessionStore.set(sessionId, session);
    return true;
  }
}

// Password Hashing
export class PasswordManager {
  static hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = createHash('sha256').update(password + salt).digest('hex');
    return `${salt}:${hash}`;
  }
  
  static verifyPassword(password: string, hashedPassword: string): boolean {
    const [salt, hash] = hashedPassword.split(':');
    const computedHash = createHash('sha256').update(password + salt).digest('hex');
    return hash === computedHash;
  }
}

// Security Logging
export class SecurityLogger {
  static logSecurityEvent(event: string, details: any, severity: 'low' | 'medium' | 'high' = 'medium'): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      severity,
      ip: details.ip || 'unknown',
      userAgent: details.userAgent || 'unknown',
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
  }
  
  static getSecurityLogs(): any[] {
    return global.securityLogs || [];
  }
  
  static getSecurityStats(): any {
    const logs = this.getSecurityLogs();
    const last24h = logs.filter(log => 
      new Date(log.timestamp).getTime() > Date.now() - 24 * 60 * 60 * 1000
    );
    
    return {
      totalEvents: logs.length,
      events24h: last24h.length,
      highSeverity: logs.filter(log => log.severity === 'high').length,
      mediumSeverity: logs.filter(log => log.severity === 'medium').length,
      lowSeverity: logs.filter(log => log.severity === 'low').length,
      recentEvents: logs.slice(-10),
    };
  }
} 