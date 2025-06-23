'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface FlyingBirdProps {
  enabled?: boolean
  speed?: number
  size?: number
}

export default function FlyingBird({ 
  enabled = true, 
  speed = 1, 
  size = 40 
}: FlyingBirdProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [direction, setDirection] = useState(1)
  const [isFlying, setIsFlying] = useState(false)

  useEffect(() => {
    if (!enabled) return

    // Initialize bird position
    setPosition({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight })
    setIsVisible(true)

    let animationId: number
    let lastTime = 0

    const animate = (currentTime: number) => {
      if (!lastTime) lastTime = currentTime
      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      setPosition(prev => {
        const newX = prev.x + (direction * speed * deltaTime * 0.05)
        const newY = prev.y + Math.sin(currentTime * 0.001) * 2

        // Reverse direction when hitting screen edges
        if (newX > window.innerWidth + 100) {
          setDirection(-1)
          return { x: window.innerWidth + 50, y: Math.random() * window.innerHeight }
        } else if (newX < -100) {
          setDirection(1)
          return { x: -50, y: Math.random() * window.innerHeight }
        }

        return { x: newX, y: newY }
      })

      // Random flying animation
      if (Math.random() < 0.01) {
        setIsFlying(true)
        setTimeout(() => setIsFlying(false), 2000)
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [enabled, speed, direction])

  if (!enabled || !isVisible) return null

  return (
    <motion.div
      className="fixed pointer-events-none z-[9996]"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
      }}
      animate={{
        y: [0, -10, 0],
        rotate: direction === 1 ? [0, 5, -5, 0] : [0, -5, 5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Main bird body */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-purple-400 drop-shadow-lg"
        animate={{
          scale: isFlying ? [1, 1.2, 1] : 1,
          rotate: isFlying ? [0, 15, -15, 0] : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Bird body */}
        <motion.path
          d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
          fill="currentColor"
          animate={{
            pathLength: isFlying ? [0.8, 1, 0.8] : 0.8,
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        
        {/* Wings */}
        <motion.path
          d="M8 6L10 8L12 6L14 8L16 6"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          animate={{
            pathLength: isFlying ? [0, 1, 0] : 0.5,
            opacity: isFlying ? [0, 1, 0] : 0.3,
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </motion.svg>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-purple-400 rounded-full blur-md opacity-20"
        animate={{
          scale: isFlying ? [1, 1.5, 1] : 1,
          opacity: isFlying ? [0.2, 0.4, 0.2] : 0.2,
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {/* Sparkle trail */}
      {isFlying && (
        <motion.div
          className="absolute -top-2 -right-2 w-2 h-2 bg-yellow-300 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            x: [0, 20],
            y: [0, -20],
          }}
          transition={{ duration: 1 }}
        />
      )}
    </motion.div>
  )
} 