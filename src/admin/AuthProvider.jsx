import { createContext, useContext, useState, useCallback } from 'react'
import { db } from '../services/mockDb'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const stored = db.auth.getSession()
  const [profile, setProfile] = useState(stored)
  const [loading] = useState(false)

  const signIn = useCallback(async (email, password) => {
    const { profile } = await db.auth.signIn(email, password)
    setProfile(profile)
    return profile
  }, [])

  const signOut = useCallback(() => {
    db.auth.signOut()
    setProfile(null)
  }, [])

  return (
    <AuthContext.Provider value={{ profile, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
