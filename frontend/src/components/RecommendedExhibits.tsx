import { Paper, Typography, Stack, Button } from '@mui/material';
import { Link } from '@tanstack/react-router';
import RecommendedExhibit from './RecommendedExhibit';

interface Exhibit {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface RecommendedExhibitsProps {
  exhibits: Exhibit[];
}

const RecommendedExhibits: React.FC<RecommendedExhibitsProps> = ({ exhibits }) => (
  <Paper
    sx={{
      p: 3,
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
      {exhibits.map((exhibit) => (
        <RecommendedExhibit key={exhibit.id} exhibit={exhibit} />
      ))}
    </Stack>
    <Button
      component={Link}
      to="/exhibits"
      sx={{
        mt: 2,
        width: '100%',
        color: '#C084FC',
        borderColor: '#C084FC',
        '&:hover': {
          borderColor: '#9c5cfa',
          color: '#9c5cfa'
        }
      }}
      variant="outlined"
    >
      See All Exhibits
    </Button>
  </Paper>
);

export default RecommendedExhibits;