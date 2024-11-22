import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import AdminPage from '../pages/admin-page'
export const Route = createLazyFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AdminPage />
}


