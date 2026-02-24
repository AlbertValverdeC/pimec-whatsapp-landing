import { useRef, useState, useEffect, useCallback } from 'react'
import { EVENTS, AGENDA_FILTER_URL } from '../data/content'
import s from './EventsCarousel.module.css'

export default function EventsCarousel() {
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll])

  const scroll = (dir) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }

  return (
    <section className={s.section}>
      <div className="container">
        <div className={s.header}>
          <div>
            <h2 className={s.title}>Pròxims esdeveniments</h2>
            <p className={s.subtitle}>Exclusius per a la comunitat</p>
          </div>
          <div className={s.arrows}>
            <button
              className={s.arrow}
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              className={s.arrow}
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              aria-label="Següent"
            >
              →
            </button>
          </div>
        </div>

        <div className={s.track} ref={trackRef}>
          {EVENTS.map((ev, i) => (
            <a
              key={i}
              href={ev.url}
              target="_blank"
              rel="noopener noreferrer"
              className={s.card}
            >
              <span className={s.tag} style={{ background: ev.color }}>
                {ev.tag}
              </span>
              <div className={s.date}>{ev.date}</div>
              <h3 className={s.cardTitle}>{ev.title}</h3>
              <div className={s.meta}>
                <span>{ev.time}</span>
                <span>{ev.location}</span>
              </div>
            </a>
          ))}
        </div>

        <div className={s.viewAll}>
          <a href={AGENDA_FILTER_URL} target="_blank" rel="noopener noreferrer" className={s.link}>
            Veure tota l'agenda →
          </a>
        </div>
      </div>
    </section>
  )
}
