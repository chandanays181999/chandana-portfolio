import { useEffect, useState } from 'react'
import '../styles/ResumeModal.css'

const EXPERIENCE_ITEMS = [
  'Resolved 30+ concurrent production abends during critical batch cycles, ensuring zero downtime for global banking operations.',
  'Executed comprehensive Root Cause Analysis (RCA) and deployed permanent code fixes, significantly reducing recurring production incidents.',
  'Engineered and enhanced complex Natural programs to seamlessly support evolving financial business logic and operational requirements.',
  'Designed, modified, and optimized JCL workflows, accelerating batch execution and improving overall enterprise reliability.',
  'Managed high-volume financial transaction data using Adabas databases and VSAM files, guaranteeing strict data integrity and security compliance.',
  'Streamlined end-to-end release management, conducting rigorous deployment validation and deep-dive impact analysis across environments.',
  'Boosted batch processing efficiency and data manipulation speeds by leveraging DFSORT and SYNCSORT utilities for massive datasets.',
  'Collaborated effectively with cross-functional global teams and business stakeholders during major production releases and critical incident triage.',
  'Ensured rock-solid stability of mission-critical trading applications while strictly maintaining 100% adherence to Service Level Agreements (SLAs).',
  'Mentored junior engineers and led comprehensive knowledge transition workshops to establish best practices in Mainframe operations.',
]

const SKILLS_DATA = [
  { label: 'Languages', value: 'Natural, COBOL, JCL, REXX' },
  { label: 'Databases', value: 'Adabas, DB2, VSAM' },
  { label: 'Mainframe Tools', value: 'CICS, ISPF, SPUFI, QMF, File-AID, Xpediter' },
  { label: 'Utilities', value: 'DFSORT, SYNCSORT, Abend-Aid' },
  { label: 'Middleware & Scheduling', value: 'IBM MQ, Control-M, TOM, DFSMs' },
  { label: 'DevOps & Platforms', value: 'Endevor, JIRA, ServiceNow, Linux, Windows' },
]

const COMPETENCIES = [
  'High-Severity Incident Management',
  'Batch Cycle Optimization',
  'Root Cause Analysis (RCA)',
  'Cross-Functional Collaboration',
  'End-to-End Release Management',
  'SLA Adherence',
  'Technical Debt Reduction',
  'Legacy System Stabilization',
]

const TABS = [
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'awards', label: 'Awards' },
  { id: 'education', label: 'Education' },
]

function ResumeModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('summary')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className={`resume-overlay ${mounted ? 'is-mounted' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Resume"
    >
      <div className="resume-modal">

        {/* Sidebar */}
        <aside className="resume-sidebar">
          <div className="resume-sidebar__profile">
            <div className="resume-sidebar__avatar">
              <img src={`${import.meta.env.BASE_URL}avatar.png`} alt="Chandana YS" />
            </div>
            <div className="resume-sidebar__info">
              <h2 className="resume-sidebar__name">Chandana Y S</h2>
              <p className="resume-sidebar__role">Senior Mainframe Developer</p>
              <p className="resume-sidebar__company">@ Morgan Stanley</p>
            </div>
            <a href={`${import.meta.env.BASE_URL}resume.pdf`} download="Chandana_YS_Resume.pdf" className="resume-download-btn resume-download-btn--mobile">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              PDF
            </a>
          </div>

          <nav className="resume-sidebar__nav">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`resume-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="resume-sidebar__meta">
            {[
              { label: 'Experience', val: '4+ Yrs' },
              { label: 'Notice', val: '60 Days' },
              { label: 'Location', val: 'Bengaluru' },
            ].map(m => (
              <div key={m.label} className="resume-meta-pill">
                <span className="resume-meta-pill__label">{m.label}</span>
                <span className="resume-meta-pill__val">{m.val}</span>
              </div>
            ))}
          </div>

          <a href={`${import.meta.env.BASE_URL}resume.pdf`} download="Chandana_YS_Resume.pdf" className="resume-download-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download PDF
          </a>
        </aside>

        {/* Main content */}
        <div className="resume-content">
          <div className="resume-content__header">
            <div className="resume-contact-row">
              {[
                { icon: 'location', text: 'Bengaluru, India', href: null },
                { icon: 'phone', text: '+91 8105412325', href: 'tel:+918105412325' },
                { icon: 'email', text: 'chandanays181999@gmail.com', href: 'mailto:chandanays181999@gmail.com' },
              ].map(item => (
                item.href
                  ? <a key={item.text} href={item.href} className="resume-contact-item">{item.text}</a>
                  : <span key={item.text} className="resume-contact-item">{item.text}</span>
              ))}
            </div>
            <button className="resume-modal__close" onClick={onClose} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="resume-content__body">

            {activeTab === 'summary' && (
              <div className="resume-panel">
                <p className="resume-panel__label">Professional Profile</p>
                <p className="resume-panel__text">
                  Results-driven Senior Mainframe Developer with 4+ years of comprehensive expertise in Natural/Adabas architecture, enterprise batch processing, and 24/7 production support for global financial operations. Proven track record of resolving critical high-severity incidents, architecting efficient JCL workflows, and guaranteeing 99.9% availability for mission-critical trading and ledger systems. Adept at driving cross-functional collaboration, performing rigorous root cause analysis, and implementing proactive system stabilization strategies.
                </p>

                <div className="resume-stats">
                  {[
                    { num: '4+', label: 'Years at Morgan Stanley' },
                    { num: '30+', label: 'Abends Resolved' },
                    { num: '4×', label: 'Client Awards' },
                    { num: '100%', label: 'SLA Adherence' },
                  ].map(s => (
                    <div key={s.label} className="resume-stat">
                      <span className="resume-stat__num">{s.num}</span>
                      <span className="resume-stat__label">{s.label}</span>
                    </div>
                  ))}
                </div>

                <p className="resume-panel__label" style={{ marginTop: '32px' }}>Key Competencies</p>
                <div className="resume-competencies">
                  {COMPETENCIES.map(c => <span key={c}>{c}</span>)}
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="resume-panel">
                <p className="resume-panel__label">Professional Experience</p>
                <div className="resume-exp-block">
                  <div className="resume-exp-top">
                    <div>
                      <h4 className="resume-exp-role">Senior Mainframe Developer</h4>
                      <p className="resume-exp-company">Morgan Stanley · Bengaluru, India</p>
                    </div>
                    <span className="resume-exp-period">2021 – Present</span>
                  </div>
                  <ul className="resume-exp-list">
                    {EXPERIENCE_ITEMS.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="resume-panel">
                <p className="resume-panel__label">Technical Skills</p>
                <div className="resume-skills-list">
                  {SKILLS_DATA.map((s) => (
                    <div key={s.label} className="resume-skill-row">
                      <span className="resume-skill-label">{s.label}</span>
                      <span className="resume-skill-value">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'awards' && (
              <div className="resume-panel">
                <p className="resume-panel__label">Awards & Recognition</p>
                <div className="resume-award-block">
                  <div className="resume-award-icon">🏆</div>
                  <div>
                    <p className="resume-award-title">4× On-the-Spot Client Excellence Awards</p>
                    <p className="resume-award-org">Morgan Stanley · 2021 – Present</p>
                    <p className="resume-award-desc">Honored four times for exceptional ownership, rapid incident response, zero-defect deployments, and continuous production stabilization in mission-critical global banking environments.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="resume-panel">
                <p className="resume-panel__label">Education</p>
                <div className="resume-edu-block">
                  <div>
                    <h4 className="resume-exp-role">Bachelor of Engineering (B.E.)</h4>
                    <p className="resume-exp-company">Electronics and Communication · UBDT College of Engineering, Davangere</p>
                  </div>
                  <span className="resume-exp-period">Graduated 2021</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeModal
