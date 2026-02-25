import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './AuthProvider'
import ProtectedRoute from './ProtectedRoute'
import AdminLayout from './AdminLayout'
import AdminDashboard from './AdminDashboard'
import AdminTerritories from './AdminTerritories'
import AdminPresidents from './AdminPresidents'

export default function AdminShell() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="territories" element={<AdminTerritories />} />
            <Route path="presidents" element={<AdminPresidents />} />
          </Route>
        </Routes>
      </ProtectedRoute>
    </AuthProvider>
  )
}
