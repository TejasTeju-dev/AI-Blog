"use client"

import { useEffect, useRef } from "react"

export function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const gridSize = 60
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw animated grid
      ctx.strokeStyle = "rgba(147, 51, 234, 0.08)"
      ctx.lineWidth = 1

      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
          const wave = Math.sin((x + y + time) * 0.008) * 0.5 + 0.5
          const opacity = Math.max(0.02, Math.min(0.15, wave * 0.15))

          ctx.globalAlpha = opacity
          ctx.beginPath()
          ctx.rect(x, y, gridSize, gridSize)
          ctx.stroke()
        }
      }

      // Draw flowing lines
      ctx.strokeStyle = "rgba(147, 51, 234, 0.1)"
      ctx.lineWidth = 1
      ctx.globalAlpha = 1

      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        const offsetY = ((time * 0.5 + i * 200) % (canvas.height + 100)) - 50
        const amplitude = Math.max(10, Math.min(30, 20 + Math.sin(time * 0.01 + i) * 10))

        ctx.moveTo(0, offsetY)
        for (let x = 0; x <= canvas.width; x += 8) {
          const y = offsetY + Math.sin((x + time * 0.5) * 0.008) * amplitude
          ctx.lineTo(x, y)
        }
        ctx.globalAlpha = 0.1
        ctx.stroke()
      }

      time += 1
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ background: "transparent" }} />
  )
}
