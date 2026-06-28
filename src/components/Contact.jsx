import useReveal from '../utils/useReveal.js'
import '../styles/Contact.css'

const CONTACT_INFO = [
  {
    label: 'Email',
    value: 'chandanays181999@gmail.com',
    href: 'mailto:chandanays181999@gmail.com',
    icon: (
      <path d="M3 6.5 12 13l9-6.5M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: 'Phone',
    value: '+91 8105412325',
    href: 'tel:+918105412325',
    icon: (
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/chandana-ys',
    href: 'https://linkedin.com/in/chandana-ys',
    icon: (
      <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34V10.1H5.67v8.24h2.67ZM7 9a1.54 1.54 0 1 0 0-3.08A1.54 1.54 0 0 0 7 9Zm11.34 9.34v-4.53c0-2.43-1.3-3.56-3.03-3.56-1.4 0-2.02.77-2.37 1.31v-1.46H10.3c.04.79 0 8.24 0 8.24h2.64v-4.6c0-.25.02-.5.1-.68.21-.5.68-1.04 1.48-1.04 1.05 0 1.47.8 1.47 1.96v4.36h2.65Z" />
    ),
  },
  {
    label: 'Location',
    value: 'Bengaluru, India',
    href: null,
    icon: (
      <>
        <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="9.5" r="2.4" />
      </>
    ),
  },
]

function Contact() {
  const [headRef, headVisible] = useReveal()
  const [cardsRef, cardsVisible] = useReveal()

  return (
    <section id="contact" className="section contact">
      <div className="contact__parallax-bg" aria-hidden="true" />
      <div className="container">

        <div ref={headRef} className={`section-head reveal ${headVisible ? 'is-visible' : ''}`}>
          <p className="section-counter">Contact</p>
          <p className="eyebrow">Get in touch</p>
          <h2 className="section-title">Let&apos;s build <em>something great</em></h2>
          <p className="section-sub">
            Open to new opportunities and collaborations. Reach out through any of the channels below.
          </p>
        </div>

        <div
          ref={cardsRef}
          className={`contact__cards reveal-stagger ${cardsVisible ? 'is-visible' : ''}`}
        >
          {CONTACT_INFO.map((item) => {
            const Tag = item.href ? 'a' : 'div'
            return (
              <Tag
                key={item.label}
                href={item.href || undefined}
                target={item.href?.startsWith('http') ? '_blank' : undefined}
                rel={item.href?.startsWith('http') ? 'noreferrer' : undefined}
                className={`contact__card glass${item.href ? ' contact__card--link' : ''}`}
                aria-label={item.href ? `${item.label}: ${item.value}` : undefined}
              >
                <span className="contact__card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    {item.icon}
                  </svg>
                </span>
                <span className="contact__card-label">{item.label}</span>
                <span className="contact__card-value">{item.value}</span>
                {item.href && (
                  <span className="contact__card-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </Tag>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Contact
