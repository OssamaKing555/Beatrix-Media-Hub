import { cn } from '@/lib/utils'

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  className?: string
}

const iconMap: Record<string, string> = {
  video: '🎥',
  sparkles: '✨',
  'trending-up': '📈',
  users: '👥',
  'pen-tool': '✏️',
  star: '⭐',
}

export default function ServiceCard({ title, description, icon, className }: ServiceCardProps) {
  return (
    <div className={cn(
      "bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 group",
      className
    )}>
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
          {iconMap[icon] || '📋'}
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  )
} 