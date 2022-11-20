// Router
import { Routes, Route, Navigate } from 'react-router-dom'

// Pages
import { Dasboard } from '../../pages/private/dashboard'

// Layout
import { PrivateLayout } from '../../components/layouts/private'

// Components
import React from 'react'

export const PrivateRoutes = () => {
  return (
    <PrivateLayout>
      <Routes>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dasboard />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </PrivateLayout>
  )
}
