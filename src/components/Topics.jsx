import { useState } from 'react'
import WhatsAppIcon from '../icons/WhatsAppIcon'
import CheckIcon from '../icons/CheckIcon'
import { TOPICS, WHATSAPP_LINK } from '../data/content'
import SectionHeader from './SectionHeader'
import s from './Topics.module.css'

export default function Topics() {
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
        <SectionHeader
          className={s.header}
          label="Personalitza la teva experiència"
          title="Quins temes t'interessen?"
          subtitle="Selecciona els tòpics que més t'interessen i t'afegirem als grups de WhatsApp corresponents."
        />

        <div className={s.grid}>
          {TOPICS.map((topic) => (
            <div
              key={topic.id}
              className={`${s.card} ${selected.includes(topic.id) ? s.selected : ''}`}
              onClick={() => toggle(topic.id)}
            >
              <div className={s.check}>
                <CheckIcon />
              </div>
              <div className={s.emoji}>{topic.emoji}</div>
              <div className={s.info}>
                <h4>{topic.name}</h4>
                <p>{topic.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={s.action}>
          <p className={s.count}>
            {hasSelection ? (
              <>
                Has seleccionat <strong>{selected.length}</strong>{' '}
                {selected.length === 1 ? 'tema' : 'temes'}
              </>
            ) : (
              'Selecciona almenys un tema per continuar'
            )}
          </p>
          <a
            href={hasSelection ? WHATSAPP_LINK : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            onClick={(e) => !hasSelection && e.preventDefault()}
            style={!hasSelection ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
          >
            <WhatsAppIcon />
            {hasSelection
              ? 'Unir-me a la comunitat WhatsApp'
              : 'Selecciona els teus temes'}
          </a>
        </div>
      </div>
    </section>
  )
}
