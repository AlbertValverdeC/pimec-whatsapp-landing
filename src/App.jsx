import { useState } from 'react'
import './App.css'

const BENEFITS = [
  {
    icon: '🤝',
    title: 'Networking real',
    description: 'Connecta directament amb empresaris que entenen els teus reptes. Sense filtres, sense intermediaris.',
  },
  {
    icon: '🧭',
    title: 'Mentoria entre iguals',
    description: 'Accedeix a l\'experiència d\'empresaris que ja han passat pel que estàs vivint. Consells pràctics i honestos.',
  },
  {
    icon: '🚀',
    title: 'Oportunitats exclusives',
    description: 'Accés prioritari a esdeveniments, formacions i recursos de PIMEC pensats per a tu.',
  },
  {
    icon: '💡',
    title: 'Idees i inspiració',
    description: 'Un espai on compartir idees i rebre feedback de persones que pensen en gran com tu.',
  },
  {
    icon: '🔄',
    title: 'Relleu generacional',
    description: 'Si estàs agafant el relleu familiar o traspassant el teu negoci, aquí trobaràs qui t\'entén.',
  },
  {
    icon: '📈',
    title: 'Creixement conjunt',
    description: 'Fer grans les pimes junts. Compartim recursos, contactes i aprenentatges per créixer.',
  },
]

const TOPICS = [
  { id: 'networking', emoji: '🤝', name: 'Networking', desc: 'Trobades i contactes' },
  { id: 'relleu', emoji: '🔄', name: 'Relleu Generacional', desc: 'Successió empresarial' },
  { id: 'financament', emoji: '💰', name: 'Finançament', desc: 'Subvencions i ajuts' },
  { id: 'innovacio', emoji: '💡', name: 'Innovació', desc: 'Tendències i tecnologia' },
  { id: 'legal', emoji: '⚖️', name: 'Legal i Fiscal', desc: 'Normativa i assessorament' },
  { id: 'marketing', emoji: '📣', name: 'Màrqueting', desc: 'Estratègia i vendes' },
  { id: 'lideratge', emoji: '🎯', name: 'Lideratge', desc: 'Gestió d\'equips' },
  { id: 'sostenibilitat', emoji: '🌱', name: 'Sostenibilitat', desc: 'RSC i impacte social' },
  { id: 'internacionalitzacio', emoji: '🌍', name: 'Internacionalització', desc: 'Expansió global' },
  { id: 'digital', emoji: '🖥️', name: 'Transformació Digital', desc: 'IA, dades i eines' },
  { id: 'wellbeing', emoji: '🧠', name: 'Benestar Empresarial', desc: 'Equilibri i salut' },
  { id: 'events', emoji: '📅', name: 'Esdeveniments', desc: 'Fires i jornades' },
]

const TESTIMONIALS = [
  {
    quote: 'Gràcies a la comunitat vaig trobar un mentor que m\'ha ajudat a reestructurar el meu negoci familiar. El millor pas que he fet.',
    name: 'Marta Puig',
    role: 'CEO, Puig Textils — Relleu generacional',
    initials: 'MP',
  },
  {
    quote: 'Com a emprenedor, et sents sol moltes vegades. Aquí he trobat gent que entén les meves preocupacions i m\'aporta solucions reals.',
    name: 'Jordi Mas',
    role: 'Founder, TechBcn Solutions',
    initials: 'JM',
  },
  {
    quote: 'En 3 mesos he aconseguit més contactes útils que en 3 anys anant a fires. La comunitat és or pur.',
    name: 'Laura Vidal',
    role: 'Directora, Vidal & Associats',
    initials: 'LV',
  },
]

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function App() {
  const [selectedTopics, setSelectedTopics] = useState([])

  const toggleTopic = (id) => {
    setSelectedTopics(prev =>
      prev.includes(id)
        ? prev.filter(t => t !== id)
        : [...prev, id]
    )
  }

  const whatsappLink = 'https://chat.whatsapp.com/EXAMPLE_LINK'

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-logo">pimec</div>
          <a href="#topics" className="header-cta">
            <WhatsAppIcon />
            Uneix-te
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">
            <WhatsAppIcon /> Comunitat WhatsApp
          </div>
          <h1>
            La xarxa que et fa{' '}
            <span className="accent">créixer</span> com a empresari
          </h1>
          <p className="hero-subtitle">
            Uneix-te a la comunitat de PIMEC per a joves empresaris,
            emprenedors i relleu generacional. Connecta, aprèn i creix amb
            qui t'entén.
          </p>
          <a href="#topics" className="hero-cta">
            <WhatsAppIcon />
            Vull unir-me a la comunitat
          </a>
          <div className="hero-stats">
            <div className="hero-stat">
              <strong>500+</strong>
              <span>Empresaris connectats</span>
            </div>
            <div className="hero-stat">
              <strong>12</strong>
              <span>Grups temàtics</span>
            </div>
            <div className="hero-stat">
              <strong>98%</strong>
              <span>Repetirien l'experiència</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits" id="benefits">
        <div className="container">
          <div className="benefits-header">
            <span className="section-label">Per què unir-te?</span>
            <h2 className="section-title">Tot el que et dóna la comunitat</h2>
            <p className="section-subtitle">
              Més que un grup de WhatsApp: una xarxa de suport real per a
              empresaris que volen fer grans les seves pimes.
            </p>
          </div>
          <div className="benefits-grid">
            {BENEFITS.map((b, i) => (
              <div className="benefit-card" key={i}>
                <div className="benefit-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="topics" id="topics">
        <div className="container">
          <div className="topics-header">
            <span className="section-label">Personalitza la teva experiència</span>
            <h2 className="section-title">Quins temes t'interessen?</h2>
            <p className="section-subtitle">
              Selecciona els tòpics que més t'interessen i t'afegirem als grups
              de WhatsApp corresponents.
            </p>
          </div>
          <div className="topics-grid">
            {TOPICS.map(topic => (
              <div
                key={topic.id}
                className={`topic-card ${selectedTopics.includes(topic.id) ? 'selected' : ''}`}
                onClick={() => toggleTopic(topic.id)}
              >
                <div className="topic-check">
                  <CheckIcon />
                </div>
                <div className="topic-emoji">{topic.emoji}</div>
                <div className="topic-info">
                  <h4>{topic.name}</h4>
                  <p>{topic.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="topics-action">
            <p className="topics-count">
              {selectedTopics.length === 0
                ? 'Selecciona almenys un tema per continuar'
                : <>Has seleccionat <strong>{selectedTopics.length}</strong> {selectedTopics.length === 1 ? 'tema' : 'temes'}</>
              }
            </p>
            <a
              href={selectedTopics.length > 0 ? whatsappLink : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              onClick={e => selectedTopics.length === 0 && e.preventDefault()}
              style={selectedTopics.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              <WhatsAppIcon />
              {selectedTopics.length === 0
                ? 'Selecciona els teus temes'
                : 'Unir-me a la comunitat WhatsApp'
              }
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="testimonials-header">
            <span className="section-label">La comunitat parla</span>
            <h2 className="section-title">El que diuen els nostres membres</h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <span className="section-label">Com funciona?</span>
          <h2 className="section-title">En 3 passos hi ets</h2>
          <p className="section-subtitle">
            Unir-te és fàcil, ràpid i gratuït per a membres de PIMEC.
          </p>
          <div className="cta-steps">
            <div className="cta-step">
              <div className="step-number">1</div>
              <h4>Escull els temes</h4>
              <p>Selecciona què t'interessa</p>
            </div>
            <div className="cta-step">
              <div className="step-number">2</div>
              <h4>Uneix-te al grup</h4>
              <p>Accedeix via WhatsApp</p>
            </div>
            <div className="cta-step">
              <div className="step-number">3</div>
              <h4>Connecta i creix</h4>
              <p>Comença a fer xarxa</p>
            </div>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <WhatsAppIcon />
            Unir-me ara a PIMEC WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>
            <strong>pimec</strong> — Micro, petita i mitjana empresa de Catalunya
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            Fer grans les pimes
          </p>
          <div className="footer-links">
            <a href="https://pimec.org" target="_blank" rel="noopener noreferrer">pimec.org</a>
            <a href="https://pimec.org/ca/politica-de-privacitat" target="_blank" rel="noopener noreferrer">Política de privacitat</a>
            <a href="https://pimec.org/ca/avis-legal" target="_blank" rel="noopener noreferrer">Avís legal</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
