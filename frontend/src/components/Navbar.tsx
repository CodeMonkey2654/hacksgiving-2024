import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { Link } from '@tanstack/react-router'

const Navbar = () => {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 1000
      }}
    >
      <Toolbar>
        <Button 
          component={Link} 
          to="/"
          sx={{ 
            color: 'white',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          Home
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/exhibits"
            sx={{ 
              color: 'white',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Exhibits
          </Button>

          <Button
            component={Link}
            to="/configure"
            sx={{ 
              color: 'white',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Configure
          </Button>

          <Button
            component={Link}
            to="/admin"
            sx={{ 
              color: 'white',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Admin
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar 