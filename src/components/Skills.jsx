import { useEffect, useRef, useState } from 'react'
import useReveal from '../utils/useReveal.js'
import '../styles/Skills.css'

const SKILLS = [
  { name: 'Natural', level: 95, category: 'Programming' },
  { name: 'JCL', level: 92, category: 'Programming' },
  { name: 'COBOL', level: 78, category: 'Programming' },
  { name: 'REXX', level: 75, category: 'Programming' },
  { name: 'Adabas', level: 90, category: 'Database' },
  { name: 'DB2', level: 80, category: 'Database' },
  { name: 'VSAM', level: 85, category: 'Database' },
  { name: 'CICS', level: 88, category: 'Mainframe' },
  { name: 'ISPF / SPUFI', level: 90, category: 'Mainframe' },
  { name: 'Xpediter', level: 82, category: 'Mainframe' },
  { name: 'File-AID', level: 84, category: 'Mainframe' },
  { name: 'DFSORT', level: 88, category: 'Utilities' },
  { name: 'SYNCSORT', level: 86, category: 'Utilities' },
  { name: 'Abend-Aid', level: 85, category: 'Utilities' },
  { name: 'IBM MQ', level: 80, category: 'Middleware' },
  { name: 'Control-M', level: 78, category: 'Middleware' },
  { name: 'TOM / DFSMs', level: 80, category: 'Middleware' },
  { name: 'Endevor', level: 82, category: 'DevOps' },
  { name: 'JIRA', level: 88, category: 'DevOps' },
  { name: 'ServiceNow', level: 85, category: 'DevOps' },
]

const CATEGORIES = ['All', ...Array.from(new Set(SKILLS.map(s => s.category)))]
const MARQUEE = [ 'Problem Solving',
  'Analytical Thinking',
  'Critical Thinking',
  'Communication',
  'Team Collaboration',
  'Time Management',
  'Adaptability',
  'Attention to Detail',
  'Troubleshooting',
  'Learning Agility',
  'Ownership',
  'Stakeholder Management']

function SkillBar({ name, level, delay, visible }) {
  return (
    <div className="skill-bar" style={{ animationDelay: `${delay}ms` }}>
      <div className="skill-bar__header">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__level">{visible ? level : 0}%</span>
      </div>
      <div className="skill-bar__track">
        <div className="skill-bar__fill" style={{ width: visible ? `${level}%` : '0%', transitionDelay: `${delay}ms` }} />
      </div>
    </div>
  )
}

function Skills() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [visible, setVisible] = useState(false)
  const [headRef, headVisible] = useReveal(0.05)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filtered = activeCategory === 'All' ? SKILLS : SKILLS.filter(s => s.category === activeCategory)

  return (
    <section id="skills" className="section skills" ref={sectionRef}>
      <div className="skills__parallax-bg" aria-hidden="true" />
      <div className="container">
        <div ref={headRef} className={`section-head reveal-blur ${headVisible ? 'is-visible' : ''}`}>
          <p className="section-counter">Skills</p>
          <p className="eyebrow">Technical Expertise</p>
          <h2 className="section-title">Tools I use to <em>build well</em></h2>
          <p className="section-sub">Specialized in IBM Mainframe ecosystem — Natural, Adabas, JCL and enterprise tooling.</p>
        </div>

        <div className="skills__tabs">
          {CATEGORIES.map(cat => (
            <button key={cat} className={`skills__tab ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="skills__grid">
          {filtered.map((skill, i) => (
            <SkillBar key={skill.name} {...skill} delay={i * 55} visible={visible} />
          ))}
        </div>

        <div className="skills__marquee">
          <div className="skills__marquee-track">
            {[...MARQUEE, ...MARQUEE].map((s, i) => (
              <span key={i} className="skills__marquee-item">
                {s} <span className="skills__marquee-dot" aria-hidden="true">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
