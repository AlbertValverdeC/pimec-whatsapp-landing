export function sendOtp(phone) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[Mock] OTP sent to ${phone}`)
      resolve({ success: true })
    }, 800)
  })
}

export function verifyOtp(phone, code) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (/^\d{6}$/.test(code)) {
        console.log(`[Mock] OTP verified for ${phone}: ${code}`)
        resolve({ success: true })
      } else {
        reject(new Error('Codi no vàlid'))
      }
    }, 600)
  })
}
