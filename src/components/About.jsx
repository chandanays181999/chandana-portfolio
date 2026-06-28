import { useRef } from 'react'
import useReveal from '../utils/useReveal.js'
import useCountUp from '../utils/useCountUp.js'
import '../styles/About.css'

const STATS = [
  { end: 4, suffix: '+', label: 'Years Experience' },
  { end: 30, suffix: '+', label: 'Abends Resolved' },
  { end: 4, suffix: '', label: 'Client Awards' },
]

function StatCard({ end, suffix, label }) {
  const [ref, count] = useCountUp(end)
  const [revealRef, visible] = useReveal()

  const setRef = (node) => {
    ref.current = node
    revealRef.current = node
  }

  return (
    <div ref={setRef} className={`about__stat glass reveal-scale ${visible ? 'is-visible' : ''}`}>
      <span className="about__stat-number">{count}{suffix}</span>
      <span className="about__stat-label">{label}</span>
    </div>
  )
}

function About() {
  const [sectionRef, sectionVisible] = useReveal(0.05)
  const [cardRef, cardVisible] = useReveal()
  const [statsRef, statsVisible] = useReveal()

  return (
    <section id="about" className="section about" ref={sectionRef}>
      <div className="about__parallax-bg" aria-hidden="true" />
      <div className="container">
        <div className={`section-head reveal ${sectionVisible ? 'is-visible' : ''}`}>
          <p className="section-counter">About</p>
          <p className="eyebrow">The person behind the code</p>
          <h2 className="section-title">Built for <em>high stakes</em> systems</h2>
        </div>

        <div className="about__grid">
          <div ref={cardRef} className={`about__card glass reveal-left ${cardVisible ? 'is-visible' : ''}`}>
            <p>
              Mainframe Developer with <strong>4+ years of experience</strong> at <strong>Morgan Stanley</strong> in Natural/Adabas development, enterprise batch processing, production support, and system stabilization for global financial clients.
            </p>
            <p>
              Skilled in handling high-severity production incidents, debugging Natural programs, optimizing JCL workflows, and ensuring SLA compliance in mission-critical banking environments. Proven expertise with CICS, VSAM, DB2, IBM MQ, and the full IBM mainframe ecosystem.
            </p>
            <p>
              Recognized with <strong>4 On-the-Spot Client Awards</strong> from Morgan Stanley for exceptional ownership, reliability, and production stability. Based in Bengaluru with a notice period of 60 days.
            </p>
            <div className="about__links">
              <a href="https://linkedin.com/in/chandana-ys" target="_blank" rel="noreferrer" className="about__link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34V10.1H5.67v8.24h2.67ZM7 9a1.54 1.54 0 1 0 0-3.08A1.54 1.54 0 0 0 7 9Zm11.34 9.34v-4.53c0-2.43-1.3-3.56-3.03-3.56-1.4 0-2.02.77-2.37 1.31v-1.46H10.3c.04.79 0 8.24 0 8.24h2.64v-4.6c0-.25.02-.5.1-.68.21-.5.68-1.04 1.48-1.04 1.05 0 1.47.8 1.47 1.96v4.36h2.65Z" /></svg>
                linkedin.com/in/chandana-ys
              </a>
              <a href="https://github.com/chandanays" target="_blank" rel="noreferrer" className="about__link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.94 3.2 9.13 7.65 10.6.56.1.76-.24.76-.54 0-.27-.01-1.16-.02-2.1-3.11.68-3.77-1.32-3.77-1.32-.51-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.24.93.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.3-2.62 5.25-5.11 5.52.4.35.76 1.04.76 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.65.76.54a11.26 11.26 0 0 0 7.64-10.6C23.25 5.48 18.27.5 12 .5Z" /></svg>
                github.com/chandanays
              </a>
            </div>
          </div>

          <div ref={statsRef} className={`about__stats reveal-stagger ${statsVisible ? 'is-visible' : ''}`}>
            {STATS.map(s => <StatCard key={s.label} {...s} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
