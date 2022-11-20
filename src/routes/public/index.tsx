// Components
import { PublicLayout } from '../../components/layouts/public'
import { Routes, Route, Navigate } from 'react-router-dom'

// Pages
import { Login } from '../../pages/public/login'
import { Register } from '../../pages/public/register'

export const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </PublicLayout>
  )
}
