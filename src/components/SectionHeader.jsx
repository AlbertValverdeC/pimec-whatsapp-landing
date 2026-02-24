import s from './SectionHeader.module.css'

export default function SectionHeader({ label, title, subtitle, className = '' }) {
  return (
    <div className={`${s.centered} ${className}`}>
      <span className={s.label}>{label}</span>
      <h2 className={s.title}>{title}</h2>
      {subtitle && <p className={s.subtitle}>{subtitle}</p>}
    </div>
  )
}
