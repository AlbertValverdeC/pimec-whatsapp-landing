import { QRCodeSVG } from 'qrcode.react'
import s from './DesktopGate.module.css'

const SITE_URL = 'https://pimec-joves-community.netlify.app'

export default function DesktopGate() {
  return (
    <div className={s.gate}>
      <div className={s.phone}>
        <div className={s.notch} />
        <div className={s.screen}>
          <div className={s.logo}>pimec</div>
          <p className={s.text}>joves</p>
        </div>
      </div>
      <h1 className={s.title}>Obre això des del mòbil</h1>
      <p className={s.subtitle}>
        Aquesta experiència està dissenyada per a mòbil.<br />
        Escaneja el QR o obre el link al teu telèfon.
      </p>
      <div className={s.qr}>
        <QRCodeSVG
          value={SITE_URL}
          size={180}
          bgColor="transparent"
          fgColor="#FFFFFF"
          level="M"
        />
      </div>
      <div className={s.url}>{SITE_URL}</div>
    </div>
  )
}
