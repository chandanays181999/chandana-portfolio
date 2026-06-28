import { useRef, useState, useEffect, useCallback } from 'react'
import '../styles/Projects.css'

const PROJECTS = [
  {
    title: 'Production Abend Resolution',
    description: 'Resolved 30+ concurrent production abends during critical batch cycles, ensuring zero downtime for global banking operations at Morgan Stanley. Performed deep-dive root cause analysis and deployed permanent code fixes, significantly reducing recurring incidents.',
    tech: ['Natural', 'Adabas', 'JCL', 'Abend-Aid'],
    category: 'Production Support',
    number: '01',
    metric: '30+',
    metricLabel: 'Abends Resolved',
    link: null,
  },
  {
    title: 'Batch Processing Optimization',
    description: 'Designed, modified, and optimized JCL workflows for reliable batch execution. Leveraged DFSORT and SYNCSORT utilities to boost batch processing efficiency and data manipulation speeds across massive financial datasets, reducing cycle time significantly.',
    tech: ['JCL', 'DFSORT', 'SYNCSORT', 'DFSMs'],
    category: 'Performance',
    number: '02',
    metric: '40%',
    metricLabel: 'Cycle Time Reduced',
    link: null,
  },
  {
    title: 'Natural Program Development',
    description: 'Engineered and enhanced complex Natural programs to seamlessly support evolving financial business logic. Worked extensively with Adabas databases and VSAM files for high-volume financial data processing with strict data integrity and security compliance.',
    tech: ['Natural', 'Adabas', 'VSAM', 'CICS'],
    category: 'Development',
    number: '03',
    metric: '99.9%',
    metricLabel: 'System Availability',
    link: null,
  },
  {
    title: 'Release Management & Deployment',
    description: 'Streamlined end-to-end release management, conducting rigorous deployment validation and deep-dive impact analysis across critical mainframe systems. Ensured zero-defect deployments in mission-critical banking environments across multiple production releases.',
    tech: ['ISPF', 'JIRA', 'ServiceNow', 'QMF'],
    category: 'Release Mgmt',
    number: '04',
    metric: '0',
    metricLabel: 'Defects in Production',
    link: null,
  },
  {
    title: 'IBM MQ Middleware Support',
    description: 'Monitored and maintained IBM MQ QMGR for high-volume financial message processing. Ensured reliable message delivery and uptime across distributed banking systems, supporting real-time trade confirmations and ledger updates.',
    tech: ['IBM MQ', 'QMGR', 'TOM', 'Linux'],
    category: 'Middleware',
    number: '05',
    metric: '24/7',
    metricLabel: 'System Uptime',
    link: null,
  },
  {
    title: 'SLA Compliance & Stabilization',
    description: 'Maintained rock-solid SLA adherence across mission-critical applications while driving system stabilization initiatives. Mentored junior engineers and led knowledge transition workshops to establish best practices in Mainframe operations across the team.',
    tech: ['Natural', 'JCL', 'SPUFI', 'ServiceNow'],
    category: 'Stability',
    number: '06',
    metric: '100%',
    metricLabel: 'SLA Adherence',
    link: null,
  },
]

function ProjectCard({ project, isActive }) {
  return (
    <article className={`project-card glass ${isActive ? 'is-active' : ''}`}>
      <div className="project-card__header">
        <div className="project-card__meta">
          <span className="project-card__number">{project.number}</span>
          <span className="project-card__category">{project.category}</span>
        </div>
        {project.link && (
          <a href={project.link} target="_blank" rel="noreferrer" className="project-card__link-btn" aria-label="View project">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        )}
      </div>

      <div className="project-card__body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>

      <div className="project-card__footer">
        <div className="project-card__metric">
          <span className="project-card__metric-num">{project.metric}</span>
          <span className="project-card__metric-label">{project.metricLabel}</span>
        </div>
        <div className="project-card__tech">
          {project.tech.map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>
    </article>
  )
}

function Projects() {
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragDelta, setDragDelta] = useState(0)
  const trackRef = useRef(null)
  const autoRef = useRef(null)
  const currentRef = useRef(current)
  const total = PROJECTS.length

  // Keep ref in sync with state for use inside interval
  useEffect(() => { currentRef.current = current }, [current])

  const goTo = useCallback((idx) => {
    setCurrent((idx + total) % total)
  }, [total])

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total)
  }, [total])

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, 3500)
  }, [total])

  // Auto-advance — stable, no dependency on `next`
  useEffect(() => {
    startAuto()
    return () => clearInterval(autoRef.current)
  }, [startAuto])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') { next(); startAuto() }
      if (e.key === 'ArrowLeft')  { prev(); startAuto() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev, startAuto])

  // Drag / swipe handlers
  const onDragStart = (e) => {
    setDragging(true)
    setDragStart(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX)
    setDragDelta(0)
    clearInterval(autoRef.current)
  }

  const onDragMove = (e) => {
    if (!dragging) return
    const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX
    setDragDelta(x - dragStart)
  }

  const onDragEnd = () => {
    if (!dragging) return
    setDragging(false)
    if (dragDelta < -60)      { next(); startAuto() }
    else if (dragDelta > 60)  { prev(); startAuto() }
    else startAuto()
    setDragDelta(0)
  }

  const offset = dragging ? Math.max(-80, Math.min(80, dragDelta)) : 0

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-head projects__head">
          <div>
            <p className="section-counter">Projects</p>
            <p className="eyebrow">Experience Highlights</p>
            <h2 className="section-title">Projects worth <em>a closer look</em></h2>
            <p className="section-sub">Key contributions from 4+ years at Morgan Stanley across production support, development, and optimization.</p>
          </div>
          <div className="projects__controls">
            <button className="projects__arrow" onClick={() => { prev(); startAuto() }} aria-label="Previous project">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="projects__counter">{String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
            <button className="projects__arrow" onClick={() => { next(); startAuto() }} aria-label="Next project">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel viewport */}
        <div
          className="projects__viewport"
          ref={trackRef}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
          style={{ cursor: dragging ? 'grabbing' : 'grab' }}
          role="region"
          aria-label="Projects carousel"
        >
          <div
            className="projects__track"
            style={{ transform: `translateX(${offset}px)`, transition: dragging ? 'none' : undefined }}
          >
            {PROJECTS.map((project, i) => {
              const diff = i - current
              const normalizedDiff = ((diff + total) % total) > total / 2 ? diff - total : diff
              return (
                <div
                  key={project.title}
                  className="projects__slide"
                  data-pos={normalizedDiff}
                  style={{
                    '--pos': normalizedDiff,
                    pointerEvents: normalizedDiff === 0 ? 'auto' : 'none',
                  }}
                  onClick={() => { if (normalizedDiff !== 0) { goTo(i); startAuto() } }}
                >
                  <ProjectCard project={project} isActive={normalizedDiff === 0} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="projects__dots" role="tablist" aria-label="Project navigation">
          {PROJECTS.map((p, i) => (
            <button
              key={p.title}
              role="tab"
              aria-selected={i === current}
              className={`projects__dot ${i === current ? 'is-active' : ''}`}
              onClick={() => { goTo(i); startAuto() }}
              aria-label={`Go to project ${i + 1}: ${p.title}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="projects__progress" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total}>
          <div className="projects__progress-fill" style={{ width: `${((current + 1) / total) * 100}%` }} />
        </div>
      </div>
    </section>
  )
}

export default Projects
