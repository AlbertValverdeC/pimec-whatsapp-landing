import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import RegistrationForm from './RegistrationForm'
import OtpInput from './OtpInput'
import WhatsAppIcon from '../icons/WhatsAppIcon'
import s from './RegistrationModal.module.css'

export default function RegistrationModal({
  isOpen, step, formData, isSubmitting, error, whatsappLink,
  closeModal, submitForm, submitOtp, resendOtp,
}) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => e.key === 'Escape' && closeModal()
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, closeModal])

  useEffect(() => {
    if (step !== 'success' || !whatsappLink) return
    const t = setTimeout(() => {
      window.location.href = whatsappLink
    }, 1800)
    return () => clearTimeout(t)
  }, [step, whatsappLink])

  if (!isOpen) return null

  return createPortal(
    <div
      className={s.overlay}
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && closeModal()}
    >
      <div className={s.modal} role="dialog" aria-modal="true">
        <div className={s.handle} />
        <button className={s.close} onClick={closeModal} aria-label="Tancar">
          ×
        </button>

        <div className={s.dots}>
          <div className={`${s.dot} ${step === 'form' ? s.active : s.done}`} />
          <div className={s.line} />
          <div className={`${s.dot} ${step === 'otp' ? s.active : step === 'success' ? s.done : ''}`} />
        </div>

        {step === 'form' && (
          <RegistrationForm
            initialData={formData}
            isSubmitting={isSubmitting}
            error={error}
            onSubmit={submitForm}
          />
        )}

        {step === 'otp' && (
          <OtpInput
            phone={formData.phone}
            onSubmit={submitOtp}
            onResend={resendOtp}
          />
        )}

        {step === 'success' && (
          <div className={s.success}>
            <div className={s.successIcon}>
              <WhatsAppIcon size={32} />
            </div>
            <h3>Verificat!</h3>
            {whatsappLink ? (
              <p>Redirigint al grup de WhatsApp...</p>
            ) : (
              <p>Registre completat! El teu territori encara no té grup configurat.</p>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
