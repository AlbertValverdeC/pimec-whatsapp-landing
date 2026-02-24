import { useState, useCallback, useRef } from 'react'
import { sendOtp, verifyOtp } from '../services/mockOtp'

function lockBody() {
  const scrollY = window.scrollY
  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollY}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.overflow = 'hidden'
}

function unlockBody() {
  const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10))
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.overflow = ''
  window.scrollTo(0, scrollY)
}

export default function useRegistrationFlow() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState('form')
  const [formData, setFormData] = useState({ name: '', company: '', territory: '', phone: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const selectedTopicsRef = useRef([])

  const openModal = useCallback((topics = []) => {
    selectedTopicsRef.current = topics
    setStep('form')
    setError(null)
    setIsOpen(true)
    lockBody()
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    unlockBody()
    setTimeout(() => {
      setStep('form')
      setFormData({ name: '', company: '', territory: '', phone: '', email: '' })
      setError(null)
    }, 300)
  }, [])

  const submitForm = useCallback(async (data) => {
    setIsSubmitting(true)
    setError(null)
    setFormData(data)
    try {
      await sendOtp(data.phone)
      setStep('otp')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  // Returns a promise that rejects on error — OtpInput handles the error UI itself
  const submitOtp = useCallback(async (code) => {
    await verifyOtp(formData.phone, code)
    setStep('success')
  }, [formData.phone])

  const resendOtp = useCallback(async () => {
    await sendOtp(formData.phone)
  }, [formData.phone])

  return {
    isOpen, step, formData, isSubmitting, error,
    openModal, closeModal, submitForm, submitOtp, resendOtp,
  }
}
