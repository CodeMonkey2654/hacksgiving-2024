import { Paper, Typography, Stack } from '@mui/material';

interface Exhibit {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface ExhibitCardProps {
  exhibit: Exhibit;
  onClick: () => void;
}

const ExhibitCard: React.FC<ExhibitCardProps> = ({ exhibit, onClick }) => (
  <Paper
    elevation={24}
    onClick={onClick}
    sx={{
      p: 4,
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: 4,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        background: 'rgba(255, 255, 255, 0.08)',
        boxShadow: '0 0 40px rgba(138, 43, 226, 0.2)',
      },
    }}
  >
    <Stack spacing={2}>
      <Typography sx={{ fontSize: '48px', textAlign: 'center' }}>
        {exhibit.image}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: 'white',
          textAlign: 'center',
          fontWeight: 600,
        }}
      >
        {exhibit.title}
      </Typography>
      <Typography
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          textAlign: 'center',
        }}
      >
        {exhibit.description}
      </Typography>
      <Typography
        sx={{
          color: '#C084FC',
          textAlign: 'center',
          fontWeight: 500,
        }}
      >
        {exhibit.category}
      </Typography>
    </Stack>
  </Paper>
);

export default ExhibitCard;