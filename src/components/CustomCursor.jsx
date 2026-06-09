import { useEffect, useRef } from 'react'

/**
 * CustomCursor — Dot + ring cursor with hover enlargement.
 * Hidden on touch devices via CSS.
 */
export default function CustomCursor() {
  const dotRef = useRef()
  const ringRef = useRef()

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let rafId

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top  = `${mouseY}px`
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.1)
      ringY = lerp(ringY, mouseY, 0.1)
      ring.style.left = `${ringX}px`
      ring.style.top  = `${ringY}px`
      rafId = requestAnimationFrame(animate)
    }

    const onEnter = () => ring.classList.add('hovering')
    const onLeave = () => ring.classList.remove('hovering')

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, .glass-card').forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
