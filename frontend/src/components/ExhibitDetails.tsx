import { Paper, Box, Typography, Fade } from '@mui/material';
import GradientTypography from './GradientTypography';
import ReactMarkdown from 'react-markdown';
import { useExhibit, useExhibitDescription } from '../api/queries';
import CogSpinner from './CogSpinner';

interface Exhibit {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  details: string;
}

interface ExhibitDetailsProps {
  exhibit: Exhibit;
}

const ExhibitDetails: React.FC<ExhibitDetailsProps> = ({ exhibit }) => {
  const { data: exhibitDescription, isLoading: isDescriptionLoading } = useExhibitDescription(exhibit.id);
  if (isDescriptionLoading) {
    return (
      <Box 
        sx={{ 
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--background-gradient)'
        }}
      >
        <Fade in={true}>
          <Box sx={{ textAlign: 'center' }}>
            <CogSpinner />
            <Typography
              variant="h5"
              sx={{
                color: 'var(--text-color)',
                fontWeight: 500,
                mt: 3
              }}
            >
              Preparing Your Exhibition Experience...
            </Typography>
          </Box>
        </Fade>
      </Box>
    )
  }
  if (!exhibit || !exhibitDescription) {
    return null;
  }
  const enrichedExhibit = {
    ...exhibit,
    details: exhibitDescription.description
  }

  return (
  <Paper
    elevation={24}
    sx={{
      p: 6,
      background: 'var(--paper-bg)',
      backdropFilter: 'blur(10px)',
      borderRadius: 4,
      border: '1px solid var(--paper-border)',
      boxShadow: '0 0 40px rgba(138, 43, 226, 0.2)',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}
  >
    <div style={{ fontSize: '64px', textAlign: 'center', marginBottom: '16px' }}>
      {enrichedExhibit.image}
    </div>
    <GradientTypography>{enrichedExhibit.title}</GradientTypography>
    <div
      style={{
        color: '#C084FC',
        textAlign: 'center',
        fontWeight: 500,
        marginBottom: '32px',
        letterSpacing: '0.02em',
      }}
    >
      {enrichedExhibit.category}
    </div>
    <div
      style={{
        textAlign: 'center',
        fontSize: '1.1rem',
        lineHeight: 1.6,
        marginBottom: '48px',
        color: 'var(--text-color)',
      }}
    >
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p style={{ 
              margin: '1em 0', 
              color: 'var(--text-color)',
              lineHeight: 1.6,
              letterSpacing: '0.01em'
            }}>{children}</p>
          ),
          h1: ({ children }) => (
            <h1 style={{ 
              margin: '0.8em 0', 
              color: 'var(--text-color)',
              fontWeight: 600,
              letterSpacing: '-0.02em'
            }}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 style={{ 
              margin: '0.7em 0', 
              color: 'var(--text-color)',
              fontWeight: 600,
              letterSpacing: '-0.01em'
            }}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ 
              margin: '0.6em 0', 
              color: 'var(--text-color)',
              fontWeight: 600
            }}>{children}</h3>
          ),
          ul: ({ children }) => (
            <ul style={{ 
              textAlign: 'left', 
              marginLeft: '2em', 
              color: 'var(--text-color)',
              lineHeight: 1.6
            }}>{children}</ul>
          ),
          ol: ({ children }) => (
            <ol style={{ 
              textAlign: 'left', 
              marginLeft: '2em', 
              color: 'var(--text-color)',
              lineHeight: 1.6
            }}>{children}</ol>
          ),
          li: ({ children }) => (
            <li style={{ 
              margin: '0.5em 0', 
              color: 'var(--text-color)',
              lineHeight: 1.6
            }}>{children}</li>
          ),
        }}
      >
        {enrichedExhibit.details}
      </ReactMarkdown>
    </div>
    </Paper>
  )
}

export default ExhibitDetails;