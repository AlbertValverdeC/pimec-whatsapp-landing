import { useState, useEffect, useMemo } from 'react'
import { db } from '../services/mockDb'

export default function AdminPresidents() {
  const [presidents, setPresidents] = useState([])
  const [territories, setTerritories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Form per crear/editar
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ full_name: '', email: '', territory_id: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const [pres, ters] = await Promise.all([
          db.presidents.getAll(),
          db.territories.getAll(),
        ])
        setPresidents(pres)
        setTerritories(ters)
      } catch (err) {
        setError(err.message)
      }
      setLoading(false)
    }
    load()
  }, [])

  const territoryMap = useMemo(() => {
    const m = {}
    territories.forEach((t) => (m[t.id] = t.name))
    return m
  }, [territories])

  // Territoris que encara no tenen president (per al dropdown)
  const availableTerritories = useMemo(() => {
    const assigned = new Set(presidents.map((p) => p.territory_id))
    // Si estem editant, el territori actual del president queda disponible
    if (editingId) {
      const current = presidents.find((p) => p.id === editingId)
      if (current) assigned.delete(current.territory_id)
    }
    return territories.filter((t) => !assigned.has(t.id))
  }, [territories, presidents, editingId])

  function openCreate() {
    setEditingId(null)
    setForm({ full_name: '', email: '', territory_id: '' })
    setError(null)
    setShowForm(true)
  }

  function openEdit(president) {
    setEditingId(president.id)
    setForm({
      full_name: president.full_name,
      email: president.email,
      territory_id: president.territory_id,
    })
    setError(null)
    setShowForm(true)
  }

  function cancelForm() {
    setShowForm(false)
    setEditingId(null)
    setError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.full_name.trim() || !form.email.trim() || !form.territory_id) return
    setSaving(true)
    setError(null)

    try {
      if (editingId) {
        const updated = await db.presidents.update(editingId, form)
        setPresidents((prev) => prev.map((p) => (p.id === editingId ? updated : p)))
      } else {
        const created = await db.presidents.create(form)
        setPresidents((prev) => [...prev, created])
      }
      setShowForm(false)
      setEditingId(null)
    } catch (err) {
      setError(err.message)
    }
    setSaving(false)
  }

  async function handleRemove(id, name) {
    if (!confirm(`Segur que vols eliminar ${name}?`)) return
    setError(null)
    try {
      await db.presidents.remove(id)
      setPresidents((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p className="admin-loading">Carregant presidents...</p>

  return (
    <div className="admin-presidents">
      <div className="admin-presidents-header">
        <div>
          <h2>Presidents de Territori</h2>
          <p className="admin-subtitle">Gestiona els comptes dels presidents de cada territori.</p>
        </div>
        {!showForm && (
          <button onClick={openCreate} className="admin-btn">
            + Afegir president
          </button>
        )}
      </div>

      {error && <div className="admin-error">{error}</div>}

      {showForm && (
        <form className="admin-president-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Editar president' : 'Nou president'}</h3>
          <div className="admin-president-form-grid">
            <div className="admin-form-field">
              <label htmlFor="pres-name">Nom complet</label>
              <input
                id="pres-name"
                type="text"
                value={form.full_name}
                onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
                placeholder="Pere Sala"
                required
                autoFocus
              />
            </div>
            <div className="admin-form-field">
              <label htmlFor="pres-email">Email</label>
              <input
                id="pres-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="pere@pimec.org"
                required
              />
            </div>
            <div className="admin-form-field">
              <label htmlFor="pres-territory">Territori</label>
              <select
                id="pres-territory"
                value={form.territory_id}
                onChange={(e) => setForm((f) => ({ ...f, territory_id: e.target.value }))}
                required
              >
                <option value="">Selecciona territori</option>
                {availableTerritories.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
                {/* Mostrar el territori actual si estem editant */}
                {editingId && form.territory_id && !availableTerritories.find((t) => t.id === form.territory_id) && (
                  <option value={form.territory_id}>{territoryMap[form.territory_id]}</option>
                )}
              </select>
            </div>
          </div>
          <div className="admin-president-form-actions">
            <button type="submit" disabled={saving} className="admin-btn">
              {saving ? 'Guardant...' : editingId ? 'Guardar canvis' : 'Crear president'}
            </button>
            <button type="button" onClick={cancelForm} className="admin-btn admin-btn-ghost">
              Cancel·lar
            </button>
          </div>
        </form>
      )}

      {presidents.length === 0 ? (
        <p className="admin-empty">No hi ha presidents assignats.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Territori</th>
                <th>Data creació</th>
                <th>Accions</th>
              </tr>
            </thead>
            <tbody>
              {presidents.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.full_name}</strong></td>
                  <td>{p.email}</td>
                  <td>{territoryMap[p.territory_id] || '—'}</td>
                  <td>{new Date(p.created_at).toLocaleDateString('ca-ES')}</td>
                  <td>
                    <span className="admin-actions">
                      <button onClick={() => openEdit(p)} className="admin-btn admin-btn-sm">
                        Editar
                      </button>
                      <button
                        onClick={() => handleRemove(p.id, p.full_name)}
                        className="admin-btn admin-btn-sm admin-btn-danger"
                      >
                        Eliminar
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="admin-demo-hint" style={{ marginTop: '1.5rem' }}>
        <p><strong>Demo:</strong> Tots els presidents tenen contrasenya "demo"</p>
      </div>
    </div>
  )
}
