import { useState, useEffect, useMemo } from 'react'
import { db } from '../services/mockDb'
import { useAuth } from './AuthProvider'

export default function AdminDashboard() {
  const { profile } = useAuth()
  const [registrations, setRegistrations] = useState([])
  const [territories, setTerritories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterTerritory, setFilterTerritory] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const [regs, ters] = await Promise.all([
          db.registrations.getAll(),
          db.territories.getAll(),
        ])
        // President només veu el seu territori
        if (profile?.role === 'president' && profile?.territory_id) {
          setRegistrations(regs.filter((r) => r.territory_id === profile.territory_id))
        } else {
          setRegistrations(regs)
        }
        setTerritories(ters)
      } catch (err) {
        setError(err.message)
      }
      setLoading(false)
    }
    load()
  }, [profile])

  const territoryMap = useMemo(() => {
    const m = {}
    territories.forEach((t) => (m[t.id] = t.name))
    return m
  }, [territories])

  const filtered = useMemo(() => {
    let list = registrations
    if (filterTerritory) {
      list = list.filter((r) => r.territory_id === filterTerritory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.company.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q)
      )
    }
    return list
  }, [registrations, filterTerritory, search])

  const stats = useMemo(() => {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    return {
      total: registrations.length,
      week: registrations.filter((r) => new Date(r.created_at) >= weekAgo).length,
      month: registrations.filter((r) => new Date(r.created_at) >= monthStart).length,
    }
  }, [registrations])

  function downloadCsv() {
    const headers = ['Nom', 'Empresa', 'Territori', 'Telèfon', 'Email', 'Temes', 'Data']
    const rows = filtered.map((r) => [
      r.name,
      r.company,
      territoryMap[r.territory_id] || '',
      r.phone,
      r.email,
      (r.topics || []).join('; '),
      new Date(r.created_at).toLocaleDateString('ca-ES'),
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `registres-pimec-joves-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) return <p className="admin-loading">Carregant registres...</p>
  if (error) return <div className="admin-error">{error}</div>

  return (
    <div className="admin-dashboard">
      <h2>Registres</h2>

      <div className="admin-stats">
        <div className="admin-stat">
          <span className="admin-stat-value">{stats.total}</span>
          <span className="admin-stat-label">Total</span>
        </div>
        <div className="admin-stat">
          <span className="admin-stat-value">{stats.week}</span>
          <span className="admin-stat-label">Aquesta setmana</span>
        </div>
        <div className="admin-stat">
          <span className="admin-stat-value">{stats.month}</span>
          <span className="admin-stat-label">Aquest mes</span>
        </div>
      </div>

      <div className="admin-filters">
        <input
          type="text"
          placeholder="Cercar per nom, empresa o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-search"
        />
        {profile?.role === 'superadmin' && (
          <select
            value={filterTerritory}
            onChange={(e) => setFilterTerritory(e.target.value)}
            className="admin-select"
          >
            <option value="">Tots els territoris</option>
            {territories.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        )}
        <button onClick={downloadCsv} className="admin-btn">
          Descarregar CSV
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="admin-empty">No hi ha registres.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Empresa</th>
                <th>Territori</th>
                <th>Telèfon</th>
                <th>Email</th>
                <th>Temes</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.company}</td>
                  <td>{territoryMap[r.territory_id] || '—'}</td>
                  <td>{r.phone}</td>
                  <td>{r.email}</td>
                  <td>{(r.topics || []).join(', ')}</td>
                  <td>{new Date(r.created_at).toLocaleDateString('ca-ES')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
