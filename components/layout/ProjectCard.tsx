import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  id: string
  title: string
  category: string
  description: string
  image: string
  client: string
  year: string
  className?: string
}

export default function ProjectCard({ 
  id, 
  title, 
  category, 
  description, 
  image, 
  client, 
  year, 
  className 
}: ProjectCardProps) {
  return (
    <Link href={`/work/${id}`}>
      <div className={cn(
        "group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300",
        className
      )}>
        {/* Image */}
        <div className="aspect-video relative overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
            <span className="text-4xl text-white/50">📸</span>
          </div>
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-semibold">View Project</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-purple-400 font-medium">{category}</span>
            <span className="text-sm text-gray-400">{year}</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
            {description}
          </p>
          <p className="text-sm text-gray-400">
            Client: {client}
          </p>
        </div>
      </div>
    </Link>
  )
} 