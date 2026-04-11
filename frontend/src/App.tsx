import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/auth.store'
import { useGeoLanguage } from './hooks/useGeoLanguage'
import { useEffect } from 'react'
// Pages
import LandingPage        from './pages/LandingPage'
import AuthPage           from './pages/auth/AuthPage'
import DashboardPage      from './pages/dashboard/DashboardPage'
import NewAnalysisPage    from './pages/analysis/NewAnalysisPage'
import AnalysisDetailPage from './pages/analysis/AnalysisDetailPage'
import AdminPage          from './pages/admin/AdminPage'
import ProfilePage        from './pages/settings/ProfilePage'
import TermsPage          from './pages/legal/TermsPage'
import PrivacyPage        from './pages/legal/PrivacyPage'
import RodoPage           from './pages/legal/RodoPage'
import InstructionsPage from './pages/legal/InstructionsPage'

// Route guards
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore(s => s.user)
  return user ? <>{children}</> : <Navigate to="/auth" replace />
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore(s => s.user)
  if (!user) return <Navigate to="/auth" replace />
  if (user.role !== 'ADMIN') return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

export default function App() {
  useGeoLanguage()
  const { user, fetchMe, accessToken } = useAuthStore()

  useEffect(() => {
    if (accessToken) fetchMe()
  }, [])

  return (
    <Routes>
      <Route path="/"       element={<LandingPage />} />
      <Route path="/auth"   element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
      <Route path="/terms"  element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/rodo"   element={<RodoPage />} />
      <Route path="/instructions" element={<InstructionsPage />} />

      <Route path="/dashboard"      element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/analysis/new"   element={<PrivateRoute><NewAnalysisPage /></PrivateRoute>} />
      <Route path="/analysis/:id/edit" element={<PrivateRoute><NewAnalysisPage /></PrivateRoute>} />
      <Route path="/analysis/:id"   element={<PrivateRoute><AnalysisDetailPage /></PrivateRoute>} />
      <Route path="/settings/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/admin"          element={<AdminRoute><AdminPage /></AdminRoute>} />

      {/* Wildcard ZAWSZE na końcu */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

