import { useEffect, useState } from 'react'
import '../styles/Hero.css'

const ROLES = ['Mainframe Developer', 'Natural/Adabas Expert', 'Production Support Lead', 'Batch Processing Engineer']

function useTypewriter(words, typeSpeed = 70, deleteSpeed = 40, pause = 1800) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    let timeout
    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed)
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setIndex((i) => i + 1)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return text
}

function Hero({ onResumeClick }) {
  const typed = useTypewriter(ROLES)

  return (
    <section id="home" className="hero">
      {/* Ambient glow background */}
      <div className="hero__glow hero__glow--left" aria-hidden="true" />
      <div className="hero__glow hero__glow--right" aria-hidden="true" />

      <div className="container hero__row">
        <div className="hero__content">
          <div className="hero__eyebrow-row">
            <span className="hero__dot" aria-hidden="true" />
            <p className="eyebrow">Available for opportunities · 2026</p>
          </div>
          <h1 className="hero__title">
            Hi, I&apos;m<br />
            <span className="hero__name">Chandana YS</span>
          </h1>
          <div className="hero__role">
            <span className="hero__role-prefix">—&nbsp;</span>
            <span>{typed}</span>
            <span className="hero__cursor" aria-hidden="true" />
          </div>
          <p className="hero__tagline">
            4+ years delivering mission-critical mainframe solutions at <strong>Morgan Stanley</strong> — Natural, Adabas, JCL &amp; enterprise batch processing.
          </p>
          <div className="hero__actions">
            <button onClick={onResumeClick} className="btn btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              View Resume
            </button>
            <a href="#contact" className="btn btn-outline"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Contact Me
            </a>
          </div>
          <div className="hero__socials">
            <a href="https://github.com/chandanays" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.94 3.2 9.13 7.65 10.6.56.1.76-.24.76-.54 0-.27-.01-1.16-.02-2.1-3.11.68-3.77-1.32-3.77-1.32-.51-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.24.93.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.3-2.62 5.25-5.11 5.52.4.35.76 1.04.76 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.65.76.54a11.26 11.26 0 0 0 7.64-10.6C23.25 5.48 18.27.5 12 .5Z" /></svg>
            </a>
            <a href="https://linkedin.com/in/chandana-ys" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34V10.1H5.67v8.24h2.67ZM7 9a1.54 1.54 0 1 0 0-3.08A1.54 1.54 0 0 0 7 9Zm11.34 9.34v-4.53c0-2.43-1.3-3.56-3.03-3.56-1.4 0-2.02.77-2.37 1.31v-1.46H10.3c.04.79 0 8.24 0 8.24h2.64v-4.6c0-.25.02-.5.1-.68.21-.5.68-1.04 1.48-1.04 1.05 0 1.47.8 1.47 1.96v4.36h2.65Z" /></svg>
            </a>
            <a href="mailto:chandanays181999@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6.5 12 13l9-6.5M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>

        {/* Photo */}
        <div className="hero__visual">
          <div className="hero__ring" aria-hidden="true" />
          <div className="hero__ring hero__ring--alt" aria-hidden="true" />
          <div className="hero__avatar">
            <img src={`${import.meta.env.BASE_URL}avatar.png`} alt="Chandana YS — Senior Mainframe Developer" className="hero__photo" />
          </div>
          <div className="hero__badge hero__badge--top glass">
            <strong>4+</strong>
            <span>Years Exp.</span>
          </div>
          <div className="hero__badge hero__badge--bottom glass">
            <strong>4×</strong>
            <span>Client Awards</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}

export default Hero
