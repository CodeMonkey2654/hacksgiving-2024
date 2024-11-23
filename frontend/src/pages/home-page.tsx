import { Box, Container, Typography, Button, Paper, Stack } from '@mui/material'
import { Settings, Explore } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { useMediaQuery, useTheme } from '@mui/material'
import LanguageSelector from '../components/LanguageSelector'
import FeatureCard from '../components/FeatureCard'


export default function HomePage() {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLanguageChange = (e: { target: { value: string } }) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language]);

  const features = [
    {
      icon: <Settings sx={{ color: 'var(--secondary)' }} />,
      title: 'Personalized Experience',
      description: 'Your journey will be tailored to your interests and preferences',
      bgColor: 'var(--card-bg)',
      hoverBgColor: 'var(--hover-bg)',
      iconColor: 'var(--secondary)'
    },
    {
      icon: <Explore sx={{ color: 'var(--secondary)' }} />,
      title: 'Guided Discovery',
      description: 'Interactive tours help you explore and learn at your own pace',
      bgColor: 'var(--card-bg)',
      hoverBgColor: 'var(--hover-bg)',
      iconColor: 'var(--secondary)'
    }
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        height: '75vh',
        background: 'var(--background-gradient)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: 2, sm: 3, md: 4 },
        overflow: 'auto',
      }}
    >
      

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, mt: 22.5}}>
        <Paper
          elevation={24}
          sx={{
            padding: { xs: 3, sm: 4, md: 6 },
            background: 'var(--paper-bg)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            border: '1px solid var(--paper-border)',
            boxShadow: '0 0 40px rgba(138, 43, 226, 0.2)',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              background: 'linear-gradient(45deg, #60A5FA, #C084FC, #F472B6)',
              backgroundClip: 'text',
              color: 'transparent',
              mb: 3,
              mt: 3,
              fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
            }}
          >
            Discovery World
          </Typography>

          <Typography
            variant={isMobile ? 'body1' : 'h6'}
            sx={{
              textAlign: 'center',
              color: 'var(--text-color)',
              opacity: 0.8,
              mb: { xs: 4, sm: 5, md: 6 },
              px: 2,
            }}
          >
            Embark on a personalized journey through knowledge and wonder
          </Typography>

          <Stack spacing={3} >
            {features.map((item, index) => (
              <FeatureCard
                key={index}
                {...item}
                isHovered={isHovered === index}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
                isMobile={isMobile}
              />
            ))}
          </Stack>

          <Button
            href="/configure"
            variant="contained"
            size={isMobile ? 'medium' : 'large'}
            sx={{
              mt: { xs: 4, sm: 5, md: 6 },
              display: 'block',
              mx: 'auto',
              width: { xs: '100%', sm: 'auto' },
              background: 'linear-gradient(45deg, #60A5FA, #C084FC)',
              boxShadow: '0 0 20px rgba(192, 132, 252, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #3B82F6, #A855F7)',
                transform: 'translateY(-2px)',
                boxShadow: '0 0 30px rgba(192, 132, 252, 0.5)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Get Started
          </Button>
        </Paper>
      </Container>
    </Box>
  )
}