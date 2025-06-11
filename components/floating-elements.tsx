"use client"

import { useEffect, useState } from "react"

export function FloatingElements() {
  const [elements, setElements] = useState<
    Array<{ id: number; left: number; top: number; size: number; delay: number; opacity: number }>
  >([])

  useEffect(() => {
    const newElements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 5 + 2,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }))
    setElements(newElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute rounded-full"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            backgroundColor: `rgba(147, 51, 234, ${element.opacity})`,
            boxShadow: `0 0 ${element.size * 2}px rgba(147, 51, 234, ${element.opacity})`,
            animationDelay: `${element.delay}s`,
            animation: `float ${3 + element.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}
