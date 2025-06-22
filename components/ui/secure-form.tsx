import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { useCSRF } from '@/lib/hooks/useCSRF';
import { SecureBadge } from './secure-badge';
import { SecurityAlert } from './security-alert';

interface SecureFormProps {
  children: React.ReactNode;
  onSubmit: (formData: FormData, csrfToken: string) => Promise<void>;
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  action?: string;
  className?: string;
  showSecurityBadge?: boolean;
  securityBadgeText?: string;
  securityBadgeType?: 'secure' | 'verified' | 'warning' | 'locked';
  disabled?: boolean;
  onSecurityError?: (error: string) => void;
  allowDevelopmentBypass?: boolean;
}

export function SecureForm({
  children,
  onSubmit,
  method = 'POST',
  action,
  className = '',
  showSecurityBadge = true,
  securityBadgeText = 'Secure Form',
  securityBadgeType = 'secure',
  disabled = false,
  onSecurityError,
  allowDevelopmentBypass = true,
}: SecureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [securityAlert, setSecurityAlert] = useState<{
    type: 'success' | 'warning' | 'error' | 'info' | 'security';
    title?: string;
    message: string;
  } | null>(null);

  const {
    csrfToken,
    isLoading: csrfLoading,
    error: csrfError,
    isTokenValid,
    refreshToken,
  } = useCSRF();

  // Development mode bypass
  const isDevelopment = process.env.NODE_ENV === 'development' && allowDevelopmentBypass;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check CSRF token validity (with development bypass)
    if (!isDevelopment && !isTokenValid) {
      if (csrfLoading) {
        const errorMsg = 'Security token is still loading. Please wait a moment and try again.';
        setSecurityAlert({
          type: 'warning',
          title: 'Security Check Loading',
          message: errorMsg,
        });
        onSecurityError?.(errorMsg);
        return;
      } else {
        const errorMsg = 'Security token is invalid or expired. Please refresh the page.';
        setSecurityAlert({
          type: 'error',
          title: 'Security Error',
          message: errorMsg,
        });
        onSecurityError?.(errorMsg);
        return;
      }
    }

    if (disabled || isSubmitting || csrfLoading) {
      return;
    }

    setIsSubmitting(true);
    setSecurityAlert(null);

    try {
      const formData = new FormData(e.currentTarget);
      await onSubmit(formData, csrfToken);

      setSecurityAlert({
        type: 'success',
        title: 'Success',
        message: 'Form submitted successfully!',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      setSecurityAlert({
        type: 'error',
        title: 'Submission Error',
        message: errorMessage,
      });
      
      onSecurityError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRefreshToken = () => {
    refreshToken();
    setSecurityAlert(null);
  };

  // Show warning if token is about to expire
  useEffect(() => {
    if (csrfToken && !csrfLoading && !isDevelopment) {
      // Check if token expires in next 2 minutes
      const tokenExpiry = new Date().getTime() + 2 * 60 * 1000; // 2 minutes from now
      if (tokenExpiry > Date.now()) {
        setSecurityAlert({
          type: 'warning',
          title: 'Security Token Expiring',
          message: 'Your security token will expire soon. Please submit your form quickly.',
        });
      }
    }
  }, [csrfToken, csrfLoading, isDevelopment]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Security Badge */}
      {showSecurityBadge && (
        <div className="flex items-center justify-between">
          <SecureBadge type={securityBadgeType} size="sm">
            {securityBadgeText}
          </SecureBadge>
          
          {csrfLoading && !isDevelopment && (
            <div className="flex items-center text-xs text-gray-500">
              <Loader2 className="h-3 w-3 mr-2 animate-spin" />
              Loading security...
            </div>
          )}
        </div>
      )}

      {/* Development Mode Notice */}
      {isDevelopment && (
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <div className="flex items-center text-yellow-400 text-sm">
            <Shield className="h-4 w-4 mr-2" />
            <span>Development mode: CSRF validation bypassed</span>
          </div>
        </div>
      )}

      {/* CSRF Loading Indicator */}
      {csrfLoading && !isDevelopment && (
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center text-blue-400 text-sm">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <span>Security check loading...</span>
          </div>
        </div>
      )}

      {/* Security Alerts */}
      {securityAlert && (
        <SecurityAlert
          type={securityAlert.type}
          title={securityAlert.title}
          message={securityAlert.message}
          onClose={() => setSecurityAlert(null)}
          autoClose={securityAlert.type === 'success'}
          autoCloseDelay={5000}
        />
      )}

      {/* CSRF Error Alert */}
      {csrfError && !isDevelopment && (
        <SecurityAlert
          type="error"
          title="Security Token Error"
          message={csrfError}
          onClose={() => {}} // Don't allow closing CSRF errors
        />
      )}

      {/* Token Expiry Warning */}
      {!csrfLoading && !isTokenValid && !isDevelopment && (
        <SecurityAlert
          type="warning"
          title="Security Token Expired"
          message="Your security token has expired. Click the button below to refresh it."
          onClose={() => {}}
        />
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        method={method}
        action={action}
        className="space-y-4"
      >
        {/* Hidden CSRF Token */}
        <input type="hidden" name="csrfToken" value={csrfToken} />
        
        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>

        {/* Token Refresh/Retry Button (shown when token is invalid or there's an error) */}
        {(!isDevelopment && (!csrfLoading && !isTokenValid) || csrfError) ? (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleRefreshToken}
              disabled={csrfLoading}
              className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
            >
              <Shield className="h-4 w-4 mr-2" />
              {csrfLoading ? 'Refreshing...' : csrfError ? 'Retry Security Token' : 'Refresh Security Token'}
            </button>
          </div>
        ) : null}

        {/* Security Status */}
        {!isDevelopment && (
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              <span>
                {csrfLoading ? 'Loading security...' : 
                 isTokenValid ? 'Security token valid' : 'Security token expired'}
              </span>
            </div>
            
            {isTokenValid && (
              <div className="flex items-center text-green-500">
                <CheckCircle className="h-3 w-3 mr-1" />
                <span>Protected</span>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
} 