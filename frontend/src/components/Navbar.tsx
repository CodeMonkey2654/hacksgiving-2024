import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle.tsx'

const Navbar = () => {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'var(--paper-bg)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--paper-border)',
        boxShadow: 'var(--card-shadow)',
        zIndex: 1000
      }}
    >
      <Toolbar>
        <Button 
          component={Link} 
          variant="contained"
          to="/"
          sx={{ 
            textColor: 'var(--text-color)',
            color: 'var(--secondary)',
            '&:hover': {
              background: 'var(--hover-bg)'
            }
          }}
        >
          Home
        </Button>

        <Box sx={{ flexGrow: 1 }} />
        
        <ThemeToggle />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/exhibits"
            variant="contained"
            sx={{ 
              color: 'var(--text-color)',
              '&:hover': {
                background: 'var(--hover-bg)'
              }
            }}
          >
            Exhibits
          </Button>

          <Button
            component={Link}
            to="/configure"
            variant="contained"
          >
            Configure
          </Button>

          <Button
            component={Link}
            to="/admin"
            variant="contained"
          >
            Admin
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar 