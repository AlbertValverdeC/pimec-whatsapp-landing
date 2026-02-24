import { useState } from 'react'
import WhatsAppIcon from '../icons/WhatsAppIcon'
import CheckIcon from '../icons/CheckIcon'
import { TOPICS } from '../data/content'
import s from './Topics.module.css'

export default function Topics({ onCtaClick }) {
  const [selected, setSelected] = useState([])

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  const hasSelection = selected.length > 0

  return (
    <section className={s.section} id="topics">
      <div className="container">
        <h2 className={s.title}>Què t'interessa?</h2>
        <p className={s.subtitle}>Escull i t'afegirem als grups</p>

        <div className={s.grid}>
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              type="button"
              className={`${s.chip} ${selected.includes(topic.id) ? s.selected : ''}`}
              onClick={() => toggle(topic.id)}
            >
              <span className={s.check}>
                <CheckIcon />
              </span>
              <span className={s.emoji}>{topic.emoji}</span>
              {topic.name}
            </button>
          ))}
        </div>

        <div className={s.action}>
          {hasSelection && (
            <p className={s.count}>
              <strong>{selected.length}</strong> {selected.length === 1 ? 'tema' : 'temes'}
            </p>
          )}
          <button
            type="button"
            className="btn-whatsapp"
            onClick={() => hasSelection && onCtaClick(selected)}
            style={!hasSelection ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
          >
            <WhatsAppIcon />
            {hasSelection ? 'Unir-me ara' : 'Escull almenys un tema'}
          </button>
        </div>
      </div>
    </section>
  )
}
