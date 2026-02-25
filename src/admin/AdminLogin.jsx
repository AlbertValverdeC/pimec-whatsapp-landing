import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../services/mockDb'
import './admin.css'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Redirect si ja hi ha sessió
  if (db.auth.getSession()) {
    navigate('/admin', { replace: true })
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await db.auth.signIn(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h1>PIMEC Joves Admin</h1>
        <p>Accés reservat per a presidents de territori</p>

        {error && <div className="admin-error">{error}</div>}

        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nom@pimec.org"
          required
          autoFocus
        />

        <label htmlFor="login-password">Contrasenya</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Entrant...' : 'Entrar'}
        </button>

        <div className="admin-demo-hint">
          <p><strong>Demo:</strong> admin@pimec.org / admin</p>
          <p>President: barcelona@pimec.org / demo</p>
        </div>
      </form>
    </div>
  )
}
