import { Shield, CheckCircle, AlertTriangle, Lock } from 'lucide-react';
import { Badge } from './badge';

interface SecureBadgeProps {
  type?: 'secure' | 'verified' | 'warning' | 'locked';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export function SecureBadge({ 
  type = 'secure', 
  size = 'md', 
  className = '',
  showIcon = true,
  children 
}: SecureBadgeProps) {
  const getBadgeConfig = () => {
    switch (type) {
      case 'secure':
        return {
          icon: <Shield className="h-3 w-3" />,
          text: 'Secure',
          variant: 'default' as const,
          colors: 'bg-green-500/10 text-green-600 border-green-500/20'
        };
      case 'verified':
        return {
          icon: <CheckCircle className="h-3 w-3" />,
          text: 'Verified',
          variant: 'default' as const,
          colors: 'bg-blue-500/10 text-blue-600 border-blue-500/20'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="h-3 w-3" />,
          text: 'Warning',
          variant: 'destructive' as const,
          colors: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
        };
      case 'locked':
        return {
          icon: <Lock className="h-3 w-3" />,
          text: 'Locked',
          variant: 'secondary' as const,
          colors: 'bg-gray-500/10 text-gray-600 border-gray-500/20'
        };
      default:
        return {
          icon: <Shield className="h-3 w-3" />,
          text: 'Secure',
          variant: 'default' as const,
          colors: 'bg-green-500/10 text-green-600 border-green-500/20'
        };
    }
  };

  const config = getBadgeConfig();
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  return (
    <Badge 
      variant={config.variant}
      className={`${config.colors} ${sizeClasses[size]} ${className} flex items-center gap-1 border`}
    >
      {showIcon && config.icon}
      {children || config.text}
    </Badge>
  );
} 