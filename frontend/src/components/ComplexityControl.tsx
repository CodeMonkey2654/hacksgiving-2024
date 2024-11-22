import { Paper, Typography, Box } from '@mui/material';
import ComplexitySlider from './ComplexitySlider';

interface ComplexityControlProps {
  complexity: number;
  setComplexity: (complexity: number) => void;
}

const ComplexityControl: React.FC<ComplexityControlProps> = ({ complexity, setComplexity }) => (
  <Paper
    sx={{
      p: 3,
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: 4,
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}
  >
    <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
      Complexity Level
    </Typography>
    <Box sx={{ width: '100%' }}>
      <ComplexitySlider
        complexity={complexity}
        setComplexity={setComplexity}
      />
    </Box>
  </Paper>
);

export default ComplexityControl;