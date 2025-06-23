'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CustomCursorProps {
  enabled?: boolean
}

export default function CustomCursor({ enabled = true }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!enabled) return

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    document.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseenter', () => setIsVisible(true))
    document.addEventListener('mouseleave', () => setIsVisible(false))

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseenter', () => setIsVisible(true))
      document.removeEventListener('mouseleave', () => setIsVisible(false))
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          className="w-full h-full bg-white rounded-full"
          animate={{
            scale: isHovering ? 1.2 : 1,
            rotate: isHovering ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Bird cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        }}
        style={{ opacity: isVisible ? 0.7 : 0 }}
      >
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-purple-400"
          animate={{
            rotate: isHovering ? [0, -10, 10, 0] : 0,
            scale: isHovering ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
        >
          <motion.path
            d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
            fill="currentColor"
            animate={{
              pathLength: isHovering ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.svg>
      </motion.div>

      {/* Trailing dots */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9997]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          mass: 1,
        }}
        style={{ opacity: isVisible ? 0.4 : 0 }}
      >
        <div className="w-full h-full bg-purple-300 rounded-full" />
      </motion.div>
    </>
  )
} 