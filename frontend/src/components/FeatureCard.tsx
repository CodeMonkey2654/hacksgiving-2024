import { Paper, Stack, IconButton, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  bgColor: string;
  hoverBgColor: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isMobile: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  bgColor,
  hoverBgColor,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  isMobile
}) => (
  <Paper
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    sx={{
      p: { xs: 2, sm: 3 },
      background: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
      transition: 'all 0.3s ease',
      transform: isHovered ? 'translateY(-4px)' : 'none',
    }}
  >
    <Stack
      direction={isMobile ? 'column' : 'row'}
      spacing={2}
      alignItems={isMobile ? 'flex-start' : 'center'}
    >
      <IconButton sx={{ background: bgColor, '&:hover': { background: hoverBgColor } }}>
        {icon}
      </IconButton>
      <Box>
        <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          {description}
        </Typography>
      </Box>
    </Stack>
  </Paper>
);

export default FeatureCard;