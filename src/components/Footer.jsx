import '../styles/Footer.css'

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__top-inner">

          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__avatar">
              <img src={`${import.meta.env.BASE_URL}avatar.png`} alt="Chandana YS" />
            </div>
            <div className="footer__brand-text">
              <p className="footer__name">Chandana <em>YS</em></p>
              <p className="footer__role">Mainframe Developer · Morgan Stanley</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="footer__nav">
            <p className="footer__nav-label">Quick Links</p>
            <ul>
              {NAV_LINKS.map(link => (
                <li key={link.id}>
                  <button onClick={() => scrollTo(link.id)} className="footer__nav-link">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </div>

      {/* Bottom bar */}
      
       
    </footer>
  )
}

export default Footer
