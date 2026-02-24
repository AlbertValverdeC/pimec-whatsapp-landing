import { useRef, useState, useEffect, useCallback } from 'react'
import { EVENTS, AGENDA_FILTER_URL } from '../data/content'
import s from './EventsCarousel.module.css'

const INTERVAL = 3000 // ms between auto-advances

export default function EventsCarousel() {
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const timerRef = useRef(null)

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

  const scrollByCard = useCallback((dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    if (!card) return
    const cardWidth = card.offsetWidth + 16 // card width + gap
    el.scrollBy({ left: dir * cardWidth, behavior: 'smooth' })
  }, [])

  const startAutoPlay = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      const el = trackRef.current
      if (!el) return
      const maxScroll = el.scrollWidth - el.clientWidth
      if (el.scrollLeft >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scrollByCard(1)
      }
    }, INTERVAL)
  }, [scrollByCard])

  const stopAutoPlay = useCallback(() => {
    clearInterval(timerRef.current)
  }, [])

  const restartAutoPlay = useCallback(() => {
    stopAutoPlay()
    setTimeout(startAutoPlay, 3000)
  }, [stopAutoPlay, startAutoPlay])

  // Start auto-play on mount
  useEffect(() => {
    startAutoPlay()
    return stopAutoPlay
  }, [startAutoPlay, stopAutoPlay])

  const handleManualScroll = (dir) => {
    stopAutoPlay()
    scrollByCard(dir)
    restartAutoPlay()
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
              onClick={() => handleManualScroll(-1)}
              disabled={!canScrollLeft}
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              className={s.arrow}
              onClick={() => handleManualScroll(1)}
              disabled={!canScrollRight}
              aria-label="Següent"
            >
              →
            </button>
          </div>
        </div>

        <div
          className={s.track}
          ref={trackRef}
          onTouchStart={stopAutoPlay}
          onTouchEnd={restartAutoPlay}
        >
          {EVENTS.map((ev, i) => (
            <a
              key={i}
              href={ev.url}
              target="_blank"
              rel="noopener noreferrer"
              className={s.card}
              data-card
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
