import WhatsAppIcon from '../icons/WhatsAppIcon'
import { STATS } from '../data/content'
import s from './Hero.module.css'

export default function Hero() {
  return (
    <section className={s.hero}>
      <div className={`container ${s.content}`}>
        <div className={s.badge}>
          <WhatsAppIcon size={16} />
          Comunitat WhatsApp
        </div>

        <h1 className={s.title}>
          La xarxa que et fa <span className={s.accent}>créixer</span> com a
          empresari
        </h1>

        <p className={s.subtitle}>
          Uneix-te a la comunitat de PIMEC per a joves empresaris, emprenedors i
          relleu generacional. Connecta, aprèn i creix amb qui t'entén.
        </p>

        <a href="#topics" className={s.cta}>
          <WhatsAppIcon />
          Vull unir-me a la comunitat
        </a>

        <div className={s.stats}>
          {STATS.map((stat) => (
            <div key={stat.label}>
              <strong className={s.statValue}>{stat.value}</strong>
              <span className={s.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
