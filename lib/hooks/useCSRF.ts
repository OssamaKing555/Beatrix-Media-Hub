import { useState, useEffect } from 'react';

interface CSRFResponse {
  success: boolean;
  csrfToken: string;
  expiresIn: number;
  message: string;
}

export function useCSRF() {
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [expiresAt, setExpiresAt] = useState<number>(0);
  const [retryCount, setRetryCount] = useState(0);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);

  const fetchCSRFToken = async (isRetry = false) => {
    // Prevent rapid successive calls
    if (Date.now() - lastFetchTime < 1000) {
      return;
    }

    setIsLoading(true);
    setError('');
    setLastFetchTime(Date.now());

    try {
      const response = await fetch('/api/auth/csrf', {
        method: 'GET',
        credentials: 'include', // Include cookies for authentication
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 429) {
          // Rate limiting error
          const retryAfter = response.headers.get('Retry-After');
          const retrySeconds = retryAfter ? parseInt(retryAfter) : 60;
          throw new Error(`Too many requests. Please wait ${retrySeconds} seconds before trying again.`);
        } else if (response.status === 401) {
          // Authentication required - this is normal for CSRF endpoint
          if (process.env.NODE_ENV === 'development') {
            // In development, don't treat 401 as an error for CSRF
            setError('');
            setIsLoading(false);
            return;
          } else {
            throw new Error('Authentication required. Please log in to continue.');
          }
        } else {
          throw new Error(`Failed to fetch CSRF token: ${response.status} ${response.statusText}`);
        }
      }

      const data: CSRFResponse = await response.json();
      
      if (data.success) {
        setCsrfToken(data.csrfToken);
        setExpiresAt(Date.now() + data.expiresIn);
        setError('');
        setRetryCount(0); // Reset retry count on success
      } else {
        throw new Error(data.message || 'Failed to generate CSRF token');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      
      // In development, provide more helpful error messages
      if (process.env.NODE_ENV === 'development') {
        if (errorMessage.includes('Failed to fetch')) {
          setError('CSRF endpoint not available. This is normal during development setup.');
        } else {
          setError(`CSRF Error: ${errorMessage}`);
        }
      } else {
        setError(errorMessage);
      }
      
      console.error('CSRF token fetch error:', err);
      
      // Auto-retry logic for non-critical errors
      if (!isRetry && retryCount < 2 && !errorMessage.includes('429')) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => {
          fetchCSRFToken(true);
        }, 2000 * (retryCount + 1)); // Exponential backoff
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = () => {
    setRetryCount(0);
    fetchCSRFToken();
  };

  const isTokenValid = () => {
    return csrfToken && Date.now() < expiresAt;
  };

  const isTokenExpired = () => {
    return !csrfToken || Date.now() >= expiresAt;
  };

  // Auto-refresh token when it's about to expire (within 1 minute)
  useEffect(() => {
    if (expiresAt && Date.now() >= expiresAt - 60000) {
      fetchCSRFToken();
    }
  }, [expiresAt]);

  // Fetch token on mount with delay to avoid conflicts
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCSRFToken();
    }, 500); // Small delay to ensure app is fully loaded

    return () => clearTimeout(timer);
  }, []);

  return {
    csrfToken,
    isLoading,
    error,
    expiresAt,
    isTokenValid: isTokenValid(),
    isTokenExpired: isTokenExpired(),
    refreshToken,
    fetchCSRFToken,
    retryCount,
  };
} 