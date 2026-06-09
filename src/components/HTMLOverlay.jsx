import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 'proj-1',
    title: 'Neural Predict',
    desc: 'Deep learning model for real-time predictive analytics on time-series data using LSTM networks and attention mechanisms.',
    tags: ['Python', 'PyTorch', 'LSTM', 'FastAPI'],
    accent: '#00ffcc',
    link: '#',
    metric: '94% F1',
  },
  {
    id: 'proj-2',
    title: 'Vision Forge',
    desc: 'Computer vision pipeline for object detection and semantic segmentation in edge-computing environments.',
    tags: ['Python', 'OpenCV', 'YOLOv8', 'TensorRT'],
    accent: '#4f8eff',
    link: '#',
    metric: '60fps Edge',
  },
  {
    id: 'proj-3',
    title: 'LangGraph Agent',
    desc: 'Multi-agent orchestration system built with LangGraph for autonomous reasoning and task decomposition.',
    tags: ['Python', 'LangGraph', 'LLM', 'RAG'],
    accent: '#a855f7',
    link: '#',
    metric: '8 Agents',
  },
  {
    id: 'proj-4',
    title: 'Quantum Sim',
    desc: 'Quantum circuit simulation and optimization tool using variational quantum eigensolvers for research applications.',
    tags: ['Python', 'Qiskit', 'NumPy', 'Matplotlib'],
    accent: '#f97316',
    link: '#',
    metric: '12-qubit',
  },
]

const SKILLS = [
  'Python', 'PyTorch', 'TensorFlow', 'React', 'Node.js',
  'Computer Vision', 'NLP', 'Reinforcement Learning',
  'Docker', 'FastAPI', 'SQL', 'Git',
]

const EXPERIENCE = [
  {
    id: 'exp-1',
    year: '2024 — Present',
    role: 'AI Research Intern',
    company: 'AI Lab · University of Ruhuna',
    desc: 'Developed LSTM-based anomaly detection for IoT sensor streams. Achieved 94% F1-score on industry benchmark datasets. Co-authored a conference paper on adaptive thresholding.',
    accent: '#00ffcc',
    tags: ['PyTorch', 'LSTM', 'IoT', 'Research'],
  },
  {
    id: 'exp-2',
    year: '2023 — 2024',
    role: 'Software Engineer Intern',
    company: 'TechVista Solutions · Sri Lanka',
    desc: 'Built and maintained REST APIs serving 10 000+ daily requests. Implemented CI/CD pipelines with Docker and GitHub Actions, cutting deployment time by 60%.',
    accent: '#4f8eff',
    tags: ['FastAPI', 'Docker', 'CI/CD', 'PostgreSQL'],
  },
  {
    id: 'exp-3',
    year: '2022 — 2023',
    role: 'Open Source Contributor',
    company: 'Various ML Projects',
    desc: 'Contributed bug-fixes and feature additions to popular Python ML libraries. Maintained community documentation and mentored new contributors.',
    accent: '#a855f7',
    tags: ['Python', 'Open Source', 'Mentoring'],
  },
]

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const titleRef = useRef()
  const subRef   = useRef()
  const ctaRef   = useRef()
  const badgeRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from(badgeRef.current, { y: 30, opacity: 0, duration: 0.8 })
        .from(titleRef.current.querySelectorAll('.word'), {
          y: 120, opacity: 0, duration: 1.1, stagger: 0.14, skewY: 8,
        }, '-=0.4')
        .from(subRef.current, { y: 30, opacity: 0, duration: 0.9 }, '-=0.5')
        .from(ctaRef.current.querySelectorAll('a, button'), {
          y: 20, opacity: 0, duration: 0.7, stagger: 0.12,
        }, '-=0.45')
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" className="section" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div ref={badgeRef} style={{ marginBottom: '36px' }}>
        <span className="badge">
          <span className="dot" />
          Available for opportunities
        </span>
      </div>

      <div ref={titleRef} style={{ overflow: 'hidden' }}>
        <h1 className="display-xl" style={{ lineHeight: '0.88', marginBottom: '8px' }}>
          {['Pannilage', 'Dilshan'].map((w, i) => (
            <span key={i} className="word" style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{ display: 'block' }}>
                {i === 1 ? (
                  <span className="text-accent glow-text">{w}</span>
                ) : w}
              </span>
            </span>
          ))}
        </h1>
        <p className="display-md text-muted" style={{ marginTop: '16px', fontWeight: 300 }}>
          AI Engineer &amp; Researcher
        </p>
      </div>

      <div className="divider" style={{ margin: '28px 0' }} />

      <p ref={subRef} style={{
        maxWidth: '500px',
        color: 'var(--text-muted)',
        fontSize: '1.05rem',
        lineHeight: 1.75,
        marginBottom: '44px',
      }}>
        Building intelligent systems at the intersection of deep learning,
        computer vision, and autonomous agents.&nbsp;
        <span style={{ color: 'rgba(240,240,248,0.7)' }}>Faculty of Engineering,
        University of Ruhuna.</span>
      </p>

      <div ref={ctaRef} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <a href="#projects" className="btn-primary" id="hero-cta-projects">
          View Projects
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <a href="#contact" className="btn-outline" id="hero-cta-contact">
          Get in Touch
        </a>
        <a
          href="#"
          className="btn-ghost"
          id="hero-cta-resume"
          download
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Résumé
        </a>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        animation: 'float-indicator 2s ease-in-out infinite',
      }}>
        <span className="text-mono text-muted" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>SCROLL</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
        <style>{`
          @keyframes float-indicator {
            0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
            50% { transform: translateX(-50%) translateY(8px); opacity: 0.4; }
          }
        `}</style>
      </div>
    </section>
  )
}

// ─── About Section ─────────────────────────────────────────────────────────────

function AboutSection() {
  const sectionRef = useRef()
  const textRef    = useRef()
  const chipsRef   = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.querySelectorAll('.reveal-item'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        y: 50, opacity: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out',
      })
      gsap.from(chipsRef.current.querySelectorAll('.chip'), {
        scrollTrigger: { trigger: chipsRef.current, start: 'top 82%' },
        scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'back.out(1.5)',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section" style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: '660px' }}>
        <div ref={textRef}>
          <p className="text-mono text-accent reveal-item" style={{ marginBottom: '16px' }}>
            001 — About Me
          </p>
          <h2 className="display-lg reveal-item" style={{ marginBottom: '24px' }}>
            Engineering<br />
            <span className="text-accent glow-text">Intelligence</span>
          </h2>
          <div className="divider reveal-item" />
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, margin: '24px 0', fontSize: '1.05rem' }} className="reveal-item">
            I'm an AI Engineering student at the <strong style={{ color: 'var(--text-primary)' }}>
            Faculty of Engineering, University of Ruhuna</strong>, passionate about building
            systems that push the boundaries of machine intelligence.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '36px', fontSize: '1.05rem' }} className="reveal-item">
            My research spans deep learning architectures, computer vision, and
            autonomous multi-agent systems. I believe in building AI that is not
            only powerful but explainable and ethical.
          </p>

          {/* Stat cards */}
          <div className="reveal-item" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
            {[
              { value: '15+', label: 'Projects Built' },
              { value: '4+',  label: 'Years Coding' },
              { value: 'AI/ML', label: 'Specialization' },
            ].map((stat, i) => (
              <div key={i} className="glass-card" style={{ padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.8rem', color: 'var(--accent)' }}>
                  {stat.value}
                </div>
                <div className="text-mono text-muted" style={{ fontSize: '0.68rem', marginTop: '4px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills chips */}
        <div ref={chipsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {SKILLS.map((skill) => (
            <span key={skill} className="chip">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Experience Section ────────────────────────────────────────────────────────

function ExperienceItem({ item, index }) {
  const ref = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scrollTrigger: { trigger: ref.current, start: 'top 82%' },
        x: -40, opacity: 0, duration: 0.8,
        delay: index * 0.12,
        ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [index])

  return (
    <div
      ref={ref}
      id={`exp-${item.id}`}
      className="timeline-item"
      style={{ '--item-accent': item.accent }}
    >
      {/* Dot */}
      <div className="timeline-dot" />

      {/* Year badge */}
      <span className="text-mono" style={{
        fontSize: '0.68rem',
        color: item.accent,
        letterSpacing: '0.12em',
        display: 'block',
        marginBottom: '10px',
      }}>
        {item.year}
      </span>

      <div className="glass-card timeline-card">
        <div style={{ marginBottom: '6px' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.2rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}>
            {item.role}
          </h3>
          <p className="text-mono text-muted" style={{ fontSize: '0.73rem', marginTop: '4px' }}>
            {item.company}
          </p>
        </div>

        <div className="divider" style={{
          width: '30px',
          background: `linear-gradient(90deg, ${item.accent}, transparent)`,
          margin: '14px 0',
        }} />

        <p style={{ color: 'var(--text-muted)', fontSize: '0.93rem', lineHeight: 1.75, marginBottom: '18px' }}>
          {item.desc}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
          {item.tags.map((tag) => (
            <span key={tag} style={{
              padding: '3px 10px',
              background: `${item.accent}12`,
              border: `1px solid ${item.accent}35`,
              borderRadius: '4px',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: item.accent,
              letterSpacing: '0.05em',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ExperienceSection() {
  const sectionRef = useRef()
  const headRef    = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.querySelectorAll('.reveal-item'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        y: 40, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section"
      style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div ref={headRef} style={{ marginBottom: '64px' }}>
        <p className="text-mono text-accent reveal-item" style={{ marginBottom: '16px' }}>
          002 — Experience
        </p>
        <h2 className="display-lg reveal-item">
          Work &amp;<br />
          <span className="text-accent glow-text">Journey</span>
        </h2>
        <div className="divider reveal-item" style={{ marginTop: '20px' }} />
      </div>

      {/* Timeline */}
      <div className="timeline" style={{ maxWidth: '640px' }}>
        {EXPERIENCE.map((item, i) => (
          <ExperienceItem key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}

// ─── Projects Section ──────────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  const cardRef = useRef()

  useEffect(() => {
    const card = cardRef.current
    const handleMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      card.style.transform = `perspective(1000px) rotateX(${-y / 28}deg) rotateY(${x / 28}deg) translateY(-4px)`
    }
    const handleLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
    }
    card.addEventListener('mousemove', handleMove)
    card.addEventListener('mouseleave', handleLeave)
    return () => {
      card.removeEventListener('mousemove', handleMove)
      card.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="glass-card project-card"
      id={`project-card-${project.id}`}
      style={{
        padding: '32px 28px',
        cursor: 'pointer',
        transition: 'transform 0.15s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        borderTop: `2px solid ${project.accent}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Metric badge */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '3px 10px',
        background: `${project.accent}18`,
        border: `1px solid ${project.accent}40`,
        borderRadius: '50px',
        fontSize: '0.68rem',
        fontFamily: 'var(--font-mono)',
        color: project.accent,
        letterSpacing: '0.06em',
      }}>
        {project.metric}
      </div>

      {/* Number */}
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
        color: project.accent, marginBottom: '20px', opacity: 0.65,
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <h3 className="display-md" style={{ fontSize: '1.45rem', marginBottom: '14px' }}>
        {project.title}
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.91rem', lineHeight: 1.75, marginBottom: '24px' }}>
        {project.desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
        {project.tags.map((tag) => (
          <span key={tag} style={{
            padding: '3px 10px',
            background: `${project.accent}13`,
            border: `1px solid ${project.accent}38`,
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            color: project.accent,
            letterSpacing: '0.05em',
          }}>
            {tag}
          </span>
        ))}
      </div>

      <a href={project.link} style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        fontSize: '0.83rem', color: project.accent, fontFamily: 'var(--font-display)',
        fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>
        View Project
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  )
}

function ProjectsSection() {
  const sectionRef = useRef()
  const headRef    = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.querySelectorAll('.reveal-item'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        y: 40, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out',
      })
      gsap.from(sectionRef.current.querySelectorAll('.glass-card'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 62%' },
        y: 60, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="section" style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px' }}>
      <div ref={headRef} style={{ marginBottom: '56px' }}>
        <p className="text-mono text-accent reveal-item" style={{ marginBottom: '16px' }}>
          003 — Selected Work
        </p>
        <h2 className="display-lg reveal-item">
          Projects &amp;<br />
          <span className="text-accent glow-text">Research</span>
        </h2>
        <div className="divider reveal-item" style={{ marginTop: '20px' }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  const sectionRef = useRef()
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('dilshan@eng.ruh.ac.lk')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.reveal-item'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        y: 50, opacity: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="section section--center" style={{ minHeight: '100vh' }}>
      <p className="text-mono text-accent reveal-item" style={{ marginBottom: '16px' }}>
        004 — Let's Connect
      </p>
      <h2 className="display-lg reveal-item" style={{ marginBottom: '4px' }}>
        Start a
      </h2>
      <h2 className="display-lg text-accent glow-text reveal-item" style={{ marginBottom: '32px' }}>
        Conversation
      </h2>
      <div className="divider reveal-item" style={{ margin: '0 auto 32px' }} />

      <p className="reveal-item" style={{
        color: 'var(--text-muted)', maxWidth: '440px', lineHeight: 1.85, marginBottom: '52px', fontSize: '1.05rem',
      }}>
        Open to research collaborations, internship opportunities, and
        interesting AI projects. Don't hesitate to reach out.
      </p>

      <div className="reveal-item" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '56px' }}>
        <button
          id="copy-email-btn"
          className="btn-primary"
          onClick={copyEmail}
          style={{ minWidth: '210px' }}
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copy Email
            </>
          )}
        </button>
        <a
          href="mailto:dilshan@eng.ruh.ac.lk"
          className="btn-outline"
          id="contact-email-link"
        >
          Send Email
        </a>
      </div>

      {/* Social links */}
      <div className="reveal-item" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          {
            id: 'link-github', label: 'GitHub', href: 'https://github.com/',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>,
          },
          {
            id: 'link-linkedin', label: 'LinkedIn', href: 'https://linkedin.com/',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
          },
          {
            id: 'link-scholar', label: 'Scholar', href: '#',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9l-11-6zm0 14.5L7 15.18V11.5l5 2.72 5-2.72v3.68L12 17.5zM12 12.5L3.18 8.55 12 4.6l8.82 3.95L12 12.5z"/></svg>,
          },
        ].map((link) => (
          <a
            key={link.id}
            id={link.id}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="glass-card social-link"
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '13px 22px', color: 'var(--text-muted)',
              fontSize: '0.88rem', fontFamily: 'var(--font-display)', fontWeight: 600,
            }}
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </div>

      {/* Footer */}
      <p className="text-mono text-muted reveal-item" style={{ marginTop: '88px', fontSize: '0.7rem', opacity: 0.5 }}>
        © 2025 Pannilage Dilshan · Faculty of Engineering, University of Ruhuna
      </p>
    </section>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function HTMLOverlay() {
  return (
    <div id="content">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}
