import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Container, Box } from '@mui/material'

export const Route = createRootRoute({
  component: () => (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f1642 0%, #2a1650 50%, #3a1357 100%)',
        }}
      >
        <Container>
          <Box sx={{ pt: 3 }}>
            <Outlet />
          </Box>
        </Container>
      </Box>
      <TanStackRouterDevtools />
    </>
  ),
})