import WhatsAppIcon from '../icons/WhatsAppIcon'
import s from './CtaSection.module.css'

export default function CtaSection({ onCtaClick }) {
  return (
    <section className={s.section}>
      <div className="container">
        <h2 className={s.title}>
          Entra. Connecta. <span className={s.accent}>Creix.</span>
        </h2>
        <p className={s.subtitle}>Gratuït per a membres PIMEC</p>
        <button type="button" className="btn-whatsapp" onClick={onCtaClick}>
          <WhatsAppIcon />
          Unir-me a la comunitat
        </button>
      </div>
    </section>
  )
}
