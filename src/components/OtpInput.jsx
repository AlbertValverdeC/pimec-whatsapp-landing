import { useState, useRef, useEffect, useCallback } from 'react'
import s from './OtpInput.module.css'

const LENGTH = 6

export default function OtpInput({ phone, onSubmit, onResend }) {
  const [digits, setDigits] = useState(Array(LENGTH).fill(''))
  const [active, setActive] = useState(0)
  const [shake, setShake] = useState(false)
  const [cooldown, setCooldown] = useState(30)
  const [status, setStatus] = useState('idle') // idle | verifying | error
  const [errorMsg, setErrorMsg] = useState(null)
  const refs = useRef([])
  const submitted = useRef(false)

  useEffect(() => { refs.current[0]?.focus() }, [])

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  const triggerShake = useCallback(() => {
    setShake(true)
    setDigits(Array(LENGTH).fill(''))
    submitted.current = false
    setTimeout(() => {
      setShake(false)
      refs.current[0]?.focus()
    }, 500)
  }, [])

  const trySubmit = useCallback(async (code) => {
    if (submitted.current) return
    submitted.current = true
    setStatus('verifying')
    setErrorMsg(null)
    try {
      await onSubmit(code)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err?.message || 'Codi no vàlid')
      triggerShake()
    }
  }, [onSubmit, triggerShake])

  const focus = (i) => {
    const idx = Math.max(0, Math.min(i, LENGTH - 1))
    refs.current[idx]?.focus()
    setActive(idx)
  }

  const handleChange = (i, val) => {
    const d = val.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = d
    setDigits(next)

    if (d && i < LENGTH - 1) {
      focus(i + 1)
    }

    // Auto-submit when all filled
    if (d && i === LENGTH - 1 && next.every(Boolean)) {
      trySubmit(next.join(''))
    }
  }

  const handleKey = (i, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (digits[i]) {
        const next = [...digits]; next[i] = ''; setDigits(next)
      } else if (i > 0) {
        const next = [...digits]; next[i - 1] = ''; setDigits(next); focus(i - 1)
      }
    } else if (e.key === 'ArrowLeft' && i > 0) {
      e.preventDefault(); focus(i - 1)
    } else if (e.key === 'ArrowRight' && i < LENGTH - 1) {
      e.preventDefault(); focus(i + 1)
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, LENGTH)
    if (!pasted) return
    const next = Array(LENGTH).fill('')
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i]
    setDigits(next)
    focus(Math.min(pasted.length, LENGTH - 1))

    if (pasted.length === LENGTH) {
      trySubmit(pasted)
    }
  }

  const handleResend = () => {
    if (cooldown > 0) return
    onResend()
    setCooldown(30)
    setErrorMsg(null)
    setStatus('idle')
  }

  const masked = phone ? phone.replace(/.(?=.{3})/g, '·') : ''

  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>Verifica el teu telèfon</h3>
      <p className={s.subtitle}>
        Codi enviat a <strong>{masked}</strong>
      </p>
      <p className={s.testHint}>Mode test: introdueix qualsevol 6 dígits</p>

      {errorMsg && <div className={s.error}>{errorMsg}</div>}

      <div className={`${s.row} ${shake ? s.shake : ''}`} onPaste={handlePaste}>
        {digits.map((d, i) => (
          <div key={i} className={`${s.box} ${d ? s.filled : ''} ${active === i ? s.focused : ''}`}>
            <input
              ref={(el) => (refs.current[i] = el)}
              type="text"
              inputMode="numeric"
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKey(i, e)}
              onFocus={() => setActive(i)}
              className={s.input}
              disabled={status === 'verifying'}
              aria-label={`Dígit ${i + 1}`}
            />
            {!d && active === i && status !== 'verifying' && <div className={s.cursor} />}
          </div>
        ))}
      </div>

      {status === 'verifying' && <p className={s.verifying}>Verificant...</p>}

      <button
        type="button"
        className={s.resend}
        onClick={handleResend}
        disabled={cooldown > 0}
      >
        {cooldown > 0 ? `Reenviar codi (${cooldown}s)` : 'Reenviar codi'}
      </button>
    </div>
  )
}
