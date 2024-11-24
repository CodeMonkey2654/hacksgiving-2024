import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from '@tanstack/react-router';
import ThemeToggle from './ThemeToggle.tsx';
import LanguageSelector from '../components/LanguageSelector'; 
import HomeIconLight from '../assets/aha_light.svg';
import HomeIconDark from '../assets/aha_dark.svg';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { isDarkMode } = useTheme();

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
        <Link
          to="/"
          style={{
            display: 'inline-block',
            color: 'var(--text-color)',
            textDecoration: 'none',
          }}
        >
          <img
            src={isDarkMode ? HomeIconDark : HomeIconLight}
            alt="Home"
            style={{
              width: '100px',
              height: '32px',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </Link>

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
