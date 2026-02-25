import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import './admin.css'

export default function AdminLayout() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const isSuperadmin = profile?.role === 'superadmin'

  async function handleSignOut() {
    await signOut()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="admin-layout">
      <nav className="admin-nav">
        <div className="admin-nav-brand">
          <strong>PIMEC Joves</strong>
          <span className="admin-nav-role">
            {isSuperadmin ? 'Super Admin' : profile?.full_name || 'President'}
          </span>
        </div>
        <div className="admin-nav-links">
          <NavLink to="/admin" end className={({ isActive }) => isActive ? 'active' : ''}>
            Registres
          </NavLink>
          <NavLink to="/admin/territories" className={({ isActive }) => isActive ? 'active' : ''}>
            Territoris
          </NavLink>
          {isSuperadmin && (
            <NavLink to="/admin/presidents" className={({ isActive }) => isActive ? 'active' : ''}>
              Presidents
            </NavLink>
          )}
        </div>
        <button className="admin-nav-logout" onClick={handleSignOut}>
          Tancar sessió
        </button>
      </nav>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
