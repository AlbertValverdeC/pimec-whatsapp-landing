import WhatsAppIcon from '../icons/WhatsAppIcon'
import { STATS } from '../data/content'
import s from './Hero.module.css'

export default function Hero() {
  return (
    <section className={s.hero}>
      <img src="/hero.jpg" alt="" className={s.bg} />
      <div className={s.overlay} />

      <div className={`container ${s.content}`}>
        <div className={s.badge}>
          <WhatsAppIcon size={14} />
          Comunitat WhatsApp
        </div>

        <h1 className={s.title}>
          La teva <span className={s.accent}>xarxa</span> d'empresaris
        </h1>

        <p className={s.subtitle}>
          Networking real. Esdeveniments cada mes. Empresaris que es
          converteixen en amics.
        </p>

        <a href="#topics" className={s.cta}>
          <WhatsAppIcon />
          Vull entrar
        </a>

        <div className={s.stats}>
          {STATS.map((stat) => (
            <div key={stat.label} className={s.stat}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
