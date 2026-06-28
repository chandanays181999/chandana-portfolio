import { useEffect, useState } from 'react'
import '../styles/ScrollProgress.css'

const SECTIONS = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'skills',   label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact',  label: 'Contact' },
]

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [active,   setActive]   = useState('home')

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="scroll-progress" aria-label="Page section navigation">
      <div className="scroll-progress__line" aria-hidden="true">
        <div className="scroll-progress__fill" style={{ height: `${progress}%` }} />
      </div>
      <div className="scroll-progress__dots">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            className={`scroll-progress__dot ${active === s.id ? 'is-active' : ''}`}
            onClick={() => scrollTo(s.id)}
            aria-label={`Navigate to ${s.label} section`}
            aria-current={active === s.id ? 'true' : undefined}
          >
            <span className="scroll-progress__dot-label" aria-hidden="true">{s.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default ScrollProgress
