import { Paper, Typography } from '@mui/material';
import GradientTypography from './GradientTypography';

interface Exhibit {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  details: string;
}

interface ExhibitDetailsProps {
  exhibit: Exhibit;
}

const ExhibitDetails: React.FC<ExhibitDetailsProps> = ({ exhibit }) => (
  <Paper
    elevation={24}
    sx={{
      p: 6,
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: 4,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 0 40px rgba(138, 43, 226, 0.2)',
    }}
  >
    <Typography sx={{ fontSize: '64px', textAlign: 'center', mb: 2 }}>
      {exhibit.image}
    </Typography>
    <GradientTypography>{exhibit.title}</GradientTypography>
    <Typography
      sx={{
        color: '#C084FC',
        textAlign: 'center',
        fontWeight: 500,
        mb: 4,
      }}
    >
      {exhibit.category}
    </Typography>
    <Typography
      sx={{
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        fontSize: '1.2rem',
        mb: 6,
      }}
    >
      {exhibit.details}
    </Typography>
  </Paper>
);

export default ExhibitDetails;