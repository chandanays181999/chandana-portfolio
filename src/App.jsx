import { useState, Component } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ResumeModal from './components/ResumeModal.jsx'
import Particles from './components/Particles.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import './styles/App.css'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ background:'#0b0b0b', color:'#fff', padding:'40px', fontFamily:'monospace', minHeight:'100vh' }}>
          <h2 style={{ color:'#ff6b6b', marginBottom:'16px' }}>⚠ Runtime Error</h2>
          <pre style={{ whiteSpace:'pre-wrap', color:'#aaa', fontSize:'13px' }}>{this.state.error.toString()}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <ErrorBoundary>
      <div className="app">
        <Particles count={35} />
        <ScrollProgress />
        <Navbar onResumeClick={() => setResumeOpen(true)} />
        <main>
          <Hero onResumeClick={() => setResumeOpen(true)} />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
        {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
      </div>
    </ErrorBoundary>
  )
}

export default App
