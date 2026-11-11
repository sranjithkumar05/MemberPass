import { useEffect, useRef } from 'react'

export default function BackgroundEffects() {
  const canvasRef = useRef(null)
  const spotlightRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    const bounds = {
      width: (canvas.width = window.innerWidth),
      height: (canvas.height = window.innerHeight),
    }

    // Dynamic particles
    const particleCount = Math.min(Math.floor((bounds.width * bounds.height) / 25000), 50)
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * bounds.width,
        y: Math.random() * bounds.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.6 + 0.8,
        alpha: Math.random() * 0.4 + 0.15,
      })
    }

    const mouse = {
      x: bounds.width / 2,
      y: bounds.height / 2,
      targetX: bounds.width / 2,
      targetY: bounds.height / 2,
    }

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
    }

    const handleResize = () => {
      bounds.width = canvas.width = window.innerWidth
      bounds.height = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize)

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.08
      mouse.y += (mouse.targetY - mouse.y) * 0.08

      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${mouse.x}px`
        spotlightRef.current.style.top = `${mouse.y}px`
      }

      ctx.clearRect(0, 0, bounds.width, bounds.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = bounds.width
        else if (p.x > bounds.width) p.x = 0
        if (p.y < 0) p.y = bounds.height
        else if (p.y > bounds.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(192, 132, 252, ${p.alpha})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.09
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="global-bg-canvas" aria-hidden="true" />
      <div className="global-ambient-glow" aria-hidden="true">
        <div className="glow-orb orb-top-left" />
        <div className="glow-orb orb-mid-right" />
        <div className="glow-orb orb-bottom-left" />
      </div>
      <div ref={spotlightRef} className="global-cursor-spotlight" aria-hidden="true" />
      <div className="global-grid-pattern" aria-hidden="true" />
    </>
  )
}

