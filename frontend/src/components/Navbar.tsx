import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from '@tanstack/react-router';
import ThemeToggle from './ThemeToggle.tsx';
import LanguageSelector from '../components/LanguageSelector'; // Import LanguageSelector

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'var(--paper-bg)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--paper-border)',
        boxShadow: 'var(--card-shadow)',
        zIndex: 1000,
      }}
    >
      <Toolbar>
        {/* Home Button */}
        <Button
          component={Link}
          variant="contained"
          to="/"
          sx={{
            textColor: 'var(--text-color)',
            color: 'var(--secondary)',
            '&:hover': {
              background: 'var(--hover-bg)',
            },
          }}
        >
          Home
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <ThemeToggle />

        {/* Buttons (Exhibits, Configure, Admin) */}
        <Box sx={{ display: 'flex', gap: 2, marginLeft: 2 }}>
          <LanguageSelector />
          <Button
            component={Link}
            to="/exhibits"
            variant="contained"
            sx={{
              color: 'var(--text-color)',
              '&:hover': {
                background: 'var(--hover-bg)',
              },
            }}
          >
            Exhibits
          </Button>

          <Button component={Link} to="/configure" variant="contained">
            Configure
          </Button>

          <Button component={Link} to="/admin" variant="contained">
            Admin
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
