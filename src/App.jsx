import { useEffect, useRef } from 'react'
import Scene3D from './components/Scene3D'
import HTMLOverlay from './components/HTMLOverlay'
import NavBar from './components/NavBar'
import CustomCursor from './components/CustomCursor'
import { useScrollProgress } from './hooks/useScrollProgress'

// ─── Subtle grid overlay ──────────────────────────────────────────────────────
function BackgroundGrid() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(0,255,204,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,204,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        pointerEvents: 'none',
      }}
    />
  )
}

// ─── Film grain / noise overlay ────────────────────────────────────────────────
function GrainOverlay() {
  return (
    <>
      <svg style={{ position: 'fixed', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          opacity: 0.028,
          filter: 'url(#grain-filter)',
          willChange: 'transform',
        }}
      />
    </>
  )
}

// ─── Left-side scroll progress bar ────────────────────────────────────────────
function ScrollBar({ progressRef }) {
  const barRef = useRef()

  useEffect(() => {
    const onScroll = () => {
      if (barRef.current) {
        barRef.current.style.height = `${(progressRef.current ?? 0) * 100}%`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [progressRef])

  return (
    <div className="scroll-bar-ui" style={{
      position: 'fixed', left: '28px', top: '50%', transform: 'translateY(-50%)',
      zIndex: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
    }}>
      <div style={{
        width: '1px', height: '110px', background: 'rgba(255,255,255,0.07)',
        borderRadius: '1px', position: 'relative', overflow: 'hidden',
      }}>
        <div ref={barRef} style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '0%',
          background: 'var(--accent)',
          transition: 'height 0.1s linear',
          boxShadow: '0 0 8px var(--accent)',
        }} />
      </div>
    </div>
  )
}

// ─── Right-side section indicator ─────────────────────────────────────────────
const SECTIONS = [
  { id: 'hero',       label: '00' },
  { id: 'about',      label: '01' },
  { id: 'experience', label: '02' },
  { id: 'projects',   label: '03' },
  { id: 'contact',    label: '04' },
]

function SectionIndicator() {
  const dotsRef = useRef([])
  const activeRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.4
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id)
        if (el && el.offsetTop <= scrollY) {
          if (activeRef.current !== i) {
            activeRef.current = i
            dotsRef.current.forEach((dot, j) => {
              if (!dot) return
              dot.style.background = j === i ? 'var(--accent)' : 'rgba(255,255,255,0.18)'
              dot.style.boxShadow  = j === i ? '0 0 8px var(--accent)' : 'none'
              dot.style.width      = j === i ? '20px' : '4px'
            })
          }
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { duration: 1.4 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="section-indicator-ui" style={{
      position: 'fixed', right: '28px', top: '50%', transform: 'translateY(-50%)',
      zIndex: 90, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px',
    }}>
      {SECTIONS.map((sec, i) => (
        <button
          key={sec.id}
          title={sec.id}
          onClick={() => goTo(sec.id)}
          style={{
            width: i === 0 ? '20px' : '4px',
            height: '4px',
            borderRadius: '2px',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            background: i === 0 ? 'var(--accent)' : 'rgba(255,255,255,0.18)',
            boxShadow: i === 0 ? '0 0 8px var(--accent)' : 'none',
            transition: 'all 0.35s ease',
          }}
          ref={el => dotsRef.current[i] = el}
        />
      ))}
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const { progress } = useScrollProgress()

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (!isTouchDevice) document.body.style.cursor = 'none'
    return () => { document.body.style.cursor = '' }
  }, [])

  return (
    <>
      <CustomCursor />
      <BackgroundGrid />
      <GrainOverlay />
      <Scene3D scrollProgress={progress} />
      <NavBar />
      <ScrollBar progressRef={progress} />
      <SectionIndicator />
      <HTMLOverlay />
    </>
  )
}
