import { Box, Stack, Typography, Slider } from '@mui/material';
import { ChangeEvent } from 'react';

interface ComplexitySliderProps {
  complexity: number;
  setComplexity: (value: number) => void;
}

const ComplexitySlider: React.FC<ComplexitySliderProps> = ({ complexity, setComplexity }) => {
  const handleChange = (_: Event | ChangeEvent<unknown>, value: number | number[]): void => {
    setComplexity(value as number);
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
        Tour Complexity
      </Typography>
      <Stack spacing={2} direction="row" alignItems="center">
        <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>Basic</Typography>
        <Slider
          value={complexity}
          onChange={handleChange}
          min={0}
          max={100}
          sx={{
            color: '#C084FC',
            '& .MuiSlider-thumb': {
              backgroundColor: '#fff'
            }
          }}
        />
        <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>Advanced</Typography>
      </Stack>
    </Box>
  );
};

export default ComplexitySlider;