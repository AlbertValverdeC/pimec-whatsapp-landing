import { TESTIMONIALS } from '../data/content'
import SectionHeader from './SectionHeader'
import s from './Testimonials.module.css'

export default function Testimonials() {
  return (
    <section className={s.section}>
      <div className="container">
        <SectionHeader
          className={s.header}
          label="La comunitat parla"
          title="El que diuen els nostres membres"
        />

        <div className={s.grid}>
          {TESTIMONIALS.map((t) => (
            <div className={s.card} key={t.initials}>
              <p className={s.quote}>{t.quote}</p>
              <div className={s.author}>
                <div className={s.avatar}>{t.initials}</div>
                <div>
                  <div className={s.name}>{t.name}</div>
                  <div className={s.role}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
