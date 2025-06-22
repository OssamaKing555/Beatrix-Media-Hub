import { cn } from '@/lib/utils'

interface ClientLogoProps {
  name: string
  logo: string
  category: string
  className?: string
}

export default function ClientLogo({ name, logo, category, className }: ClientLogoProps) {
  return (
    <div className={cn(
      "flex items-center justify-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 group",
      className
    )}>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl text-white/70">🏢</span>
        </div>
        <h4 className="text-white font-medium text-sm">{name}</h4>
        <p className="text-gray-400 text-xs mt-1">{category}</p>
      </div>
    </div>
  )
} 