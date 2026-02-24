import WhatsAppIcon from '../icons/WhatsAppIcon'
import { STEPS, WHATSAPP_LINK } from '../data/content'
import s from './CtaSection.module.css'

export default function CtaSection() {
  return (
    <section className={s.section}>
      <div className="container">
        <span className={s.label}>Com funciona?</span>
        <h2 className={s.title}>En 3 passos hi ets</h2>
        <p className={s.subtitle}>
          Unir-te és fàcil, ràpid i gratuït per a membres de PIMEC.
        </p>

        <div className={s.steps}>
          {STEPS.map((step) => (
            <div className={s.step} key={step.number}>
              <div className={s.number}>{step.number}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          <WhatsAppIcon />
          Unir-me ara a PIMEC WhatsApp
        </a>
      </div>
    </section>
  )
}
