import React, { useEffect } from 'react';
import { AlertTriangle, Shield, Lock, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecurityAlertProps {
  type: 'success' | 'warning' | 'error' | 'info' | 'security';
  title?: string;
  message: string;
  onClose?: () => void;
  showIcon?: boolean;
  className?: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export function SecurityAlert({
  type,
  title,
  message,
  onClose,
  showIcon = true,
  className = '',
  autoClose = false,
  autoCloseDelay = 5000,
}: SecurityAlertProps) {
  const getAlertConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          colors: 'bg-green-500/10 border-green-500/20 text-green-700',
          iconColors: 'text-green-500',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          colors: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-700',
          iconColors: 'text-yellow-500',
        };
      case 'error':
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          colors: 'bg-red-500/10 border-red-500/20 text-red-700',
          iconColors: 'text-red-500',
        };
      case 'security':
        return {
          icon: <Shield className="h-5 w-5" />,
          colors: 'bg-purple-500/10 border-purple-500/20 text-purple-700',
          iconColors: 'text-purple-500',
        };
      case 'info':
        return {
          icon: <Lock className="h-5 w-5" />,
          colors: 'bg-blue-500/10 border-blue-500/20 text-blue-700',
          iconColors: 'text-blue-500',
        };
      default:
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          colors: 'bg-gray-500/10 border-gray-500/20 text-gray-700',
          iconColors: 'text-gray-500',
        };
    }
  };

  const config = getAlertConfig();

  // Auto-close functionality
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose, autoCloseDelay]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`relative p-4 border rounded-lg backdrop-blur-sm ${config.colors} ${className}`}
      >
        <div className="flex items-start space-x-3">
          {showIcon && (
            <div className={`flex-shrink-0 ${config.iconColors}`}>
              {config.icon}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className="text-sm font-semibold mb-1">
                {title}
              </h4>
            )}
            <p className="text-sm">
              {message}
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Progress bar for auto-close */}
        {autoClose && (
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: autoCloseDelay / 1000, ease: 'linear' }}
            className="absolute bottom-0 left-0 h-1 bg-current opacity-20"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
} 