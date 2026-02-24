import { useState } from 'react'
import { TERRITORIES } from '../data/content'
import s from './RegistrationForm.module.css'

export default function RegistrationForm({ initialData, isSubmitting, error, onSubmit }) {
  const [form, setForm] = useState(initialData)
  const [accepted, setAccepted] = useState(false)
  const [errors, setErrors] = useState({})

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Obligatori'
    if (!form.company.trim()) e.company = 'Obligatori'
    if (!form.territory) e.territory = 'Obligatori'
    if (!/^\+?\d{9,15}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Telèfon no vàlid'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email no vàlid'
    if (!accepted) e.accepted = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) onSubmit(form)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit} noValidate>
      <h3 className={s.title}>Uneix-te a la comunitat</h3>

      {error && <div className={s.apiError}>{error}</div>}

      <div className={s.field}>
        <label htmlFor="reg-name">Nom</label>
        <input
          id="reg-name"
          type="text"
          placeholder="El teu nom"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          autoFocus
        />
        {errors.name && <span className={s.error}>{errors.name}</span>}
      </div>

      <div className={s.field}>
        <label htmlFor="reg-company">Empresa</label>
        <input
          id="reg-company"
          type="text"
          placeholder="La teva empresa"
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
        />
        {errors.company && <span className={s.error}>{errors.company}</span>}
      </div>

      <div className={s.field}>
        <label htmlFor="reg-territory">Territori</label>
        <select
          id="reg-territory"
          value={form.territory}
          onChange={(e) => update('territory', e.target.value)}
          className={!form.territory ? s.placeholder : ''}
        >
          <option value="">Selecciona el teu territori</option>
          {TERRITORIES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.territory && <span className={s.error}>{errors.territory}</span>}
      </div>

      <div className={s.field}>
        <label htmlFor="reg-phone">Telèfon</label>
        <input
          id="reg-phone"
          type="tel"
          placeholder="+34 612 345 678"
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          inputMode="tel"
        />
        {errors.phone && <span className={s.error}>{errors.phone}</span>}
      </div>

      <div className={s.field}>
        <label htmlFor="reg-email">Email</label>
        <input
          id="reg-email"
          type="email"
          placeholder="nom@empresa.cat"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          inputMode="email"
        />
        {errors.email && <span className={s.error}>{errors.email}</span>}
      </div>

      <label className={`${s.consent} ${errors.accepted ? s.consentError : ''}`}>
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => {
            setAccepted(e.target.checked)
            if (errors.accepted) setErrors((prev) => ({ ...prev, accepted: null }))
          }}
        />
        <span>Accepto rebre comunicacions de la comunitat PIMEC Joves via WhatsApp.</span>
      </label>

      <button type="submit" className={s.submit} disabled={isSubmitting}>
        {isSubmitting ? 'Enviant...' : 'Continuar'}
      </button>
    </form>
  )
}
