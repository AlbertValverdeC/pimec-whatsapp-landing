import s from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className="container">
        <p>
          <strong>pimec</strong> — Micro, petita i mitjana empresa de Catalunya
        </p>
        <p className={s.tagline}>Fer grans les pimes</p>
        <div className={s.links}>
          <a href="https://pimec.org" target="_blank" rel="noopener noreferrer">
            pimec.org
          </a>
          <a
            href="https://pimec.org/ca/politica-de-privacitat"
            target="_blank"
            rel="noopener noreferrer"
          >
            Política de privacitat
          </a>
          <a
            href="https://pimec.org/ca/avis-legal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Avís legal
          </a>
        </div>
      </div>
    </footer>
  )
}
