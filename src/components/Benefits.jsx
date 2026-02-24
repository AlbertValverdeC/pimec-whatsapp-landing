import { BENEFITS } from '../data/content'
import SectionHeader from './SectionHeader'
import s from './Benefits.module.css'

export default function Benefits() {
  return (
    <section className={s.section} id="benefits">
      <div className="container">
        <SectionHeader
          className={s.header}
          label="Per què unir-te?"
          title="Tot el que et dóna la comunitat"
          subtitle="Més que un grup de WhatsApp: una xarxa de suport real per a empresaris que volen fer grans les seves pimes."
        />

        <div className={s.grid}>
          {BENEFITS.map((b, i) => (
            <div className={s.card} key={i}>
              <div className={s.icon}>{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
