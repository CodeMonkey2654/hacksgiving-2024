import { Paper, Typography, Stack, Button, Fade, Box } from '@mui/material';
import { Link } from '@tanstack/react-router';
import RecommendedExhibit from './RecommendedExhibit';
import { useRecommendations } from '../api/queries';
import CogSpinner from './CogSpinner';


interface RecommendedExhibitsProps {
  userId: string;
}

const RecommendedExhibits: React.FC<RecommendedExhibitsProps> = ({ userId }) => {
  const { data: recommendedExhibits, isLoading: isRecommendationsLoading } = useRecommendations(userId || '') 
  if (isRecommendationsLoading) {
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
  if (!recommendedExhibits) return null
  return (
  <Paper
    sx={{
      p: 3,
      mt: 2,
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: 4,
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}
  >
    <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
      Recommended Exhibits
    </Typography>
    <Stack spacing={2}>
      {recommendedExhibits.map((exhibit) => (
        <RecommendedExhibit 
          key={exhibit.exhibit_id} 
          exhibit={exhibit}
        />
      ))}
    </Stack>
    <Button
      component={Link}
      to="/exhibits"
      sx={{
        mt: 2,
        width: '100%',
        textColor: 'var(--text-color)',
        color: '#C084FC',
        borderColor: '#C084FC',
        '&:hover': {
          borderColor: '#9c5cfa',
          color: '#9c5cfa'
        }
      }}
      variant="contained"
    >
      See All Exhibits
    </Button>
    </Paper>
  )
}

export default RecommendedExhibits;