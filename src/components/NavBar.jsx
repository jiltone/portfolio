import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const NAV_LINKS = [
  { id: 'nav-about',      label: 'About',      href: '#about' },
  { id: 'nav-experience', label: 'Experience', href: '#experience' },
  { id: 'nav-projects',   label: 'Projects',   href: '#projects' },
  { id: 'nav-contact',    label: 'Contact',    href: '#contact' },
]

export default function NavBar() {
  const navRef = useRef()
  const [active,   setActive]   = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    gsap.from(navRef.current, { y: -60, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.6 })

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
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '32px',
        padding: '10px 24px',
        background: scrolled ? 'rgba(7, 7, 9, 0.88)' : 'rgba(7, 7, 9, 0.52)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${scrolled ? 'rgba(0,255,204,0.1)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '50px',
        transition: 'background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
        boxShadow: scrolled
          ? '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,255,204,0.06)'
          : 'none',
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
          fontSize: '1rem',
          letterSpacing: '0.04em',
          color: 'var(--accent)',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        PD<span style={{ color: 'rgba(255,255,255,0.25)' }}>.</span>
      </a>

      {/* Links */}
      <div style={{ display: 'flex', gap: '2px' }}>
        {NAV_LINKS.map((link) => {
          const isActive = active === link.href.replace('#', '')
          return (
            <a
              key={link.id}
              id={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                padding: '6px 14px',
                borderRadius: '50px',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-display)',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#000' : 'var(--text-muted)',
                background: isActive ? 'var(--accent)' : 'transparent',
                transition: 'all 0.28s ease',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              {link.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
