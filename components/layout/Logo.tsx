'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
  showText?: boolean
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const birdVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: [0, -10, 10, -5, 0],
      transition: { duration: 0.6, ease: "easeInOut" }
    },
    transform: {
      scale: [1, 0.8, 1.2],
      rotate: [0, 180, 360],
      transition: { duration: 1.2, ease: "easeInOut" }
    }
  }

  const textVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, delay: 0.3 }
    }
  }

  return (
    <Link 
      href="/" 
      className={`flex items-center space-x-2 group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bird Icon */}
      <motion.div
        className="relative"
        variants={birdVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        whileHover="hover"
      >
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-purple-500"
          animate={isLoaded ? (isHovered ? "transform" : "initial") : "initial"}
        >
          <motion.path
            d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
            fill="currentColor"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="3"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.svg>
      </motion.div>

      {/* Text */}
      {showText && (
        <motion.div
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="flex flex-col"
        >
          <motion.span 
            className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            BEATRIX
          </motion.span>
          <motion.span 
            className="text-xs text-gray-400 -mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            MEDIA HUB
          </motion.span>
        </motion.div>
      )}
    </Link>
  )
} 