import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const NAV_LINKS = [
  { id: 'nav-about',      label: 'About',      href: '#about',      shortLabel: 'About' },
  { id: 'nav-experience', label: 'Experience', href: '#experience', shortLabel: 'Exp' },
  { id: 'nav-projects',   label: 'Projects',   href: '#projects',   shortLabel: 'Work' },
  { id: 'nav-contact',    label: 'Contact',    href: '#contact',    shortLabel: 'Contact' },
]

export default function NavBar() {
  const navRef = useRef()
  const [active,   setActive]   = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Set explicit initial state first, then animate to known final state
    // (avoids gsap.from() recording a stale "to" value that breaks scroll-up visibility)
    gsap.set(navRef.current, { y: -80, opacity: 0 })
    gsap.to(navRef.current,  { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.6 })

    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = ['hero', 'about', 'experience', 'projects', 'contact']
      const scrollY  = window.scrollY + window.innerHeight * 0.4
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollY) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      // Use Lenis if available, fall back to native smooth scroll
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: 0, duration: 1.4 })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav
      ref={navRef}
      id="navbar"
      style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '48px',
        padding: '14px 36px',
        background: scrolled ? 'rgba(7, 7, 9, 0.92)' : 'rgba(7, 7, 9, 0.60)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: `1px solid ${scrolled ? 'rgba(0,255,204,0.14)' : 'rgba(255,255,255,0.09)'}`,
        borderRadius: '50px',
        transition: 'background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
        boxShadow: scrolled
          ? '0 10px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,255,204,0.08)'
          : '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        id="nav-logo"
        onClick={(e) => handleNavClick(e, '#hero')}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: '1.18rem',
          letterSpacing: '0.05em',
          color: 'var(--accent)',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        PD<span style={{ color: 'rgba(255,255,255,0.25)' }}>.</span>
      </a>

      {/* Links */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {NAV_LINKS.map((link) => {
          const isActive = active === link.href.replace('#', '')
          return (
            <a
              key={link.id}
              id={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                padding: '8px 20px',
                borderRadius: '50px',
                fontSize: '0.93rem',
                fontFamily: 'var(--font-display)',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#000' : 'var(--text-muted)',
                background: isActive ? 'var(--accent)' : 'transparent',
                transition: 'all 0.28s ease',
                textDecoration: 'none',
                letterSpacing: '0.03em',
                whiteSpace: 'nowrap',
              }}
            >
              <span className="nav-label-full">{link.label}</span>
              <span className="nav-label-short">{link.shortLabel}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
