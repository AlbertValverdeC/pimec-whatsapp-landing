import { PERKS } from '../data/content'
import s from './Benefits.module.css'

export default function Benefits() {
  return (
    <section className={s.section} id="benefits">
      <div className={s.track}>
        {PERKS.map((p, i) => (
          <div className={s.item} key={i}>
            <span className={s.emoji}>{p.emoji}</span>
            <span className={s.label}>{p.title}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
