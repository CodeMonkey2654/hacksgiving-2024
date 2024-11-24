import { Paper, Typography, Box } from '@mui/material';
import ComplexitySlider from './ComplexitySlider';
import { useState, useEffect } from 'react';

const ComplexityControl: React.FC = () => {
  const [complexity, setComplexity] = useState(() => {
    const saved = localStorage.getItem('complexity');
    return saved ? parseInt(saved) : 50;
  });

  useEffect(() => {
    localStorage.setItem('complexity', complexity.toString());
  }, [complexity]);

  return (
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
};

export default ComplexityControl;