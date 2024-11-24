import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'
import { useSession } from '../hooks/useSession'
import { createContext } from 'react'

export const SessionContext = createContext<{
  userId: string;
  sessionId: string;
}>({ userId: '', sessionId: '' });

export const Route = createRootRoute({
  component: () => {
    const { userId, sessionId } = useSession();
    
    return (
      <SessionContext.Provider value={{ userId, sessionId }}>
        <Navbar />
        <Box sx={{ pt: 2 }}>
          <Outlet />
        </Box>
      </SessionContext.Provider>
    );
  },
});