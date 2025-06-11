"use client"

import { useEffect, useState } from "react"

export function SimpleBackground() {
  const [dots, setDots] = useState<Array<{
    left: string;
    top: string;
    delay: string;
    duration: string;
  }>>([])

  useEffect(() => {
    // Generate dots only on client side to avoid hydration mismatch
    const generatedDots = [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 3}s`
    }))
    setDots(generatedDots)
  }, [])

  return (
    <div className="fixed inset-0 z-0">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-pulse" />
      
      {/* Floating dots */}
      <div className="absolute inset-0 overflow-hidden">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full animate-pulse"
            style={{
              left: dot.left,
              top: dot.top,
              animationDelay: dot.delay,
              animationDuration: dot.duration
            }}
          />
        ))}
      </div>
    </div>
  )
} 