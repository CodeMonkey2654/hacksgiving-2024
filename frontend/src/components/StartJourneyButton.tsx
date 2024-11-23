import { Button } from '@mui/material';

const StartJourneyButton: React.FC = () => (
  <Button
    variant="contained"
    size="large"
    sx={{
      mt: 6,
      display: 'block',
      mx: 'auto',
      background: 'linear-gradient(45deg, #60A5FA, #C084FC)',
      boxShadow: '0 0 20px rgba(192, 132, 252, 0.3)',
      '&:hover': {
        background: 'linear-gradient(45deg, #3B82F6, #A855F7)',
        transform: 'translateY(-2px)',
        boxShadow: '0 0 30px rgba(192, 132, 252, 0.5)'
      },
      transition: 'all 0.3s ease'
    }}
    href="/exhibit/1"
  >
    Start Your Journey
  </Button>
);

export default StartJourneyButton;