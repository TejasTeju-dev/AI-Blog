"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  opacity: number
  color: string
}

export function ParticleField() {
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

    const particles: Particle[] = []
    const particleCount = 40 // Reduced from 80 to 40
    const colors = ["#9333ea", "#c084fc", "#06b6d4", "#10b981"]

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * canvas.width,
        y: (Math.random() - 0.5) * canvas.height,
        z: Math.random() * 800 + 100, // Keep z positive and away from 0
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 1,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.2, // Slightly reduced opacity range
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        // 3D perspective effect - ensure z never gets too close to 0
        const minZ = 50
        if (particle.z < minZ) particle.z = minZ

        const perspective = Math.max(0.1, 800 / (800 + particle.z))
        const x = particle.x * perspective + canvas.width / 2
        const y = particle.y * perspective + canvas.height / 2
        const size = Math.max(0.5, particle.size * perspective) // Ensure size is always positive

        // Reset particle if it goes off screen or gets too far
        if (particle.z > 1000 || x < -100 || x > canvas.width + 100 || y < -100 || y > canvas.height + 100) {
          particle.x = (Math.random() - 0.5) * canvas.width
          particle.y = (Math.random() - 0.5) * canvas.height
          particle.z = Math.random() * 200 + 100
          particle.vx = (Math.random() - 0.5) * 0.5
          particle.vy = (Math.random() - 0.5) * 0.5
          particle.vz = (Math.random() - 0.5) * 1
        }

        // Only draw if size is positive and reasonable
        if (size > 0 && size < 50) {
          // Draw particle
          ctx.save()
          ctx.globalAlpha = Math.max(0, Math.min(1, particle.opacity * perspective))
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()

          // Add subtle glow effect
          if (size > 1) {
            ctx.shadowBlur = 4
            ctx.shadowColor = particle.color
            ctx.globalAlpha = Math.max(0, Math.min(0.3, particle.opacity * perspective * 0.3))
            ctx.beginPath()
            ctx.arc(x, y, size * 0.5, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.restore()

          // Draw connections to nearby particles (further limited for performance)
          if (index % 4 === 0) {
            // Only check connections for every 4th particle (reduced from every 3rd)
            particles.slice(index + 1, index + 3).forEach((otherParticle) => {
              if (otherParticle.z < 50) return // Skip if other particle is too close

              const otherPerspective = Math.max(0.1, 800 / (800 + otherParticle.z))
              const otherX = otherParticle.x * otherPerspective + canvas.width / 2
              const otherY = otherParticle.y * otherPerspective + canvas.height / 2

              const distance = Math.sqrt((x - otherX) ** 2 + (y - otherY) ** 2)

              if (distance < 60 && distance > 0) {
                // Reduced connection distance from 80 to 60
                ctx.save()
                ctx.globalAlpha = Math.max(0, Math.min(0.1, (1 - distance / 60) * 0.1))
                ctx.strokeStyle = particle.color
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(x, y)
                ctx.lineTo(otherX, otherY)
                ctx.stroke()
                ctx.restore()
              }
            })
          }
        }
      })

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
