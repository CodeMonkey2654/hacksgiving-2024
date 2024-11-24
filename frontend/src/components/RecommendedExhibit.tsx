import { Card, Stack, CardContent, CardActionArea, Typography, Box } from '@mui/material';
import { Link } from '@tanstack/react-router';

  interface Exhibit {
    image: string;
    title: string;
    description: string;
    id: string;
  }

interface RecommendedExhibitProps {
  exhibit: Exhibit;
}

const RecommendedExhibit: React.FC<RecommendedExhibitProps> = ({ exhibit }) => (
  <Card
    sx={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
    }}
  >
    <CardActionArea component={Link} to={`/exhibit/${exhibit.id}`}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography sx={{ fontSize: '2rem' }}>{exhibit.image}</Typography>
          <Box>
            <Typography sx={{ color: 'white' }}>{exhibit.title}</Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
              {exhibit.description}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default RecommendedExhibit;