import { useEffect, useState, useCallback } from 'react'
import '../styles/Navbar.css'

const LINKS = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'skills',   label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact',  label: 'Contact' },
]

function Navbar({ onResumeClick }) {
  const [scrolled,  setScrolled]  = useState(false)
  const [progress,  setProgress]  = useState(0)
  const [active,    setActive]    = useState('home')
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(scrollTop > 24)
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id) })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && menuOpen) setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  const handleNavClick = useCallback((id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <div className="navbar__progress" style={{ width: `${progress}%` }} aria-hidden="true" />
        <div className="container navbar__row">
          <a
            href="#home"
            className="navbar__logo"
            onClick={(e) => { e.preventDefault(); handleNavClick('home') }}
            aria-label="Chandana YS — go to top"
          >
            <img src={`${import.meta.env.BASE_URL}avatar.png`} alt="" className="navbar__logo-img" aria-hidden="true" />
            <span>Chandana <em>YS</em></span>
          </a>

          <nav className="navbar__links" aria-label="Main navigation">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`navbar__link ${active === link.id ? 'is-active' : ''}`}
                aria-current={active === link.id ? 'page' : undefined}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.id) }}
              >
                {link.label}
              </a>
            ))}
            <button className="navbar__resume-btn" onClick={onResumeClick}>View Resume</button>
          </nav>

          <button
            className={`navbar__burger ${menuOpen ? 'is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
          </button>
        </div>

        <nav
          id="mobile-nav"
          className={`navbar__mobile ${menuOpen ? 'is-open' : ''}`}
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
        >
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`navbar__mobile-link ${active === link.id ? 'is-active' : ''}`}
              aria-current={active === link.id ? 'page' : undefined}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.id) }}
              tabIndex={menuOpen ? 0 : -1}
            >
              {link.label}
            </a>
          ))}
          <button
            className="navbar__mobile-resume"
            onClick={() => { setMenuOpen(false); onResumeClick() }}
            tabIndex={menuOpen ? 0 : -1}
          >
            View Resume
          </button>
        </nav>
      </header>

      {/* Mobile menu backdrop */}
      {menuOpen && (
        <div
          className="navbar__backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export default Navbar
