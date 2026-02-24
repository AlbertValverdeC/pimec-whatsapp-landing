import WhatsAppIcon from '../icons/WhatsAppIcon'
import s from './Header.module.css'

export default function Header() {
  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.inner}>
          <div className={s.logo}>pimec</div>
          <a href="#topics" className={s.cta}>
            <WhatsAppIcon size={16} />
            Uneix-te
          </a>
        </div>
      </div>
    </header>
  )
}
