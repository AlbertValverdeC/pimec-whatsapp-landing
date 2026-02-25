import { useState, useEffect } from 'react'
import { db } from '../services/mockDb'
import { useAuth } from './AuthProvider'

export default function AdminTerritories() {
  const { profile } = useAuth()
  const [territories, setTerritories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const data = await db.territories.getAll()
        setTerritories(data)
      } catch (err) {
        setError(err.message)
      }
      setLoading(false)
    }
    load()
  }, [])

  function startEdit(territory) {
    setEditingId(territory.id)
    setEditValue(territory.whatsapp_link || '')
    setError(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditValue('')
  }

  async function saveLink(id) {
    setSaving(true)
    setError(null)
    try {
      const updated = await db.territories.updateLink(id, editValue.trim())
      setTerritories((prev) =>
        prev.map((t) => (t.id === id ? { ...t, whatsapp_link: updated.whatsapp_link } : t))
      )
      setEditingId(null)
    } catch (err) {
      setError(err.message)
    }
    setSaving(false)
  }

  function canEdit(territory) {
    if (profile?.role === 'superadmin') return true
    if (profile?.role === 'president' && profile?.territory_id === territory.id) return true
    return false
  }

  if (loading) return <p className="admin-loading">Carregant territoris...</p>

  return (
    <div className="admin-territories">
      <h2>Territoris</h2>
      <p className="admin-subtitle">Gestiona els links de WhatsApp de cada territori.</p>

      {error && <div className="admin-error">{error}</div>}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Territori</th>
              <th>Link WhatsApp</th>
              <th>Accions</th>
            </tr>
          </thead>
          <tbody>
            {territories.map((t) => (
              <tr key={t.id}>
                <td><strong>{t.name}</strong></td>
                <td>
                  {editingId === t.id ? (
                    <input
                      type="url"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      placeholder="https://chat.whatsapp.com/..."
                      className="admin-input-inline"
                      autoFocus
                    />
                  ) : (
                    t.whatsapp_link ? (
                      <a href={t.whatsapp_link} target="_blank" rel="noopener noreferrer" className="admin-link">
                        {t.whatsapp_link}
                      </a>
                    ) : (
                      <span className="admin-no-link">Sense link</span>
                    )
                  )}
                </td>
                <td>
                  {canEdit(t) && (
                    editingId === t.id ? (
                      <span className="admin-actions">
                        <button onClick={() => saveLink(t.id)} disabled={saving} className="admin-btn admin-btn-sm">
                          {saving ? 'Guardant...' : 'Guardar'}
                        </button>
                        <button onClick={cancelEdit} className="admin-btn admin-btn-sm admin-btn-ghost">
                          Cancel·lar
                        </button>
                      </span>
                    ) : (
                      <button onClick={() => startEdit(t)} className="admin-btn admin-btn-sm">
                        Editar
                      </button>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
