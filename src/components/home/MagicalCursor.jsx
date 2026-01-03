"use client"
import { useEffect, useRef } from 'react'
import styles from '../../app/home.module.css'

const MAX_PARTICLES = 25
const SPAWN_RATE = 30 // ms between spawns

export default function MagicalCursor() {
    const canvasRef = useRef(null)
    const cursorDot = useRef(null)
    const particles = useRef([])
    const mousePos = useRef({ x: 0, y: 0 })
    const lastSpawn = useRef(0)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d', { alpha: true })
        if (!ctx) return

        let rafId = null

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize, { passive: true })

        // Instant cursor update + throttled particle spawn
        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY }

            // Update cursor dot IMMEDIATELY - no delay
            if (cursorDot.current) {
                cursorDot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
            }

            // Throttled particle spawn
            const now = performance.now()
            if (now - lastSpawn.current > SPAWN_RATE && particles.current.length < MAX_PARTICLES) {
                particles.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: (Math.random() - 0.5) * 1.2,
                    vy: (Math.random() - 0.5) * 1.2,
                    size: Math.random() * 2 + 1,
                    alpha: 1,
                    color: Math.random() > 0.5 ? '212,175,55' : '255,255,255'
                })
                lastSpawn.current = now
            }
        }

        // Lightweight animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update and draw particles - filter dead ones
            const alive = []
            for (const p of particles.current) {
                p.x += p.vx
                p.y += p.vy
                p.alpha -= 0.025
                p.size *= 0.97

                if (p.alpha > 0 && p.size > 0.3) {
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(${p.color},${p.alpha})`
                    ctx.fill()
                    alive.push(p)
                }
            }
            particles.current = alive

            rafId = requestAnimationFrame(animate)
        }

        window.addEventListener('mousemove', onMouseMove, { passive: true })
        animate()

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMouseMove)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <>
            <canvas
                ref={canvasRef}
                className={styles.canvasCursor}
            />
            <div
                ref={cursorDot}
                className={styles.magicCursor}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 10000,
                    willChange: 'transform'
                }}
            />
        </>
    )
}
