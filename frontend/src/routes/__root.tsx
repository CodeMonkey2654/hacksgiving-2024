import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'

export const Route = createRootRoute({
  component: () => (
    <>
        <Navbar />
        <Box sx={{ pt: 3 }}>
          <Outlet />
        </Box>
    </>
  ),
})