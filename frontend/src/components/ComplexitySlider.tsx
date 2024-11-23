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

  const marks = [
    { value: 0, label: 'Elementary' },
    { value: 25, label: 'Middle' },
    { value: 50, label: 'High' },
    { value: 75, label: 'College' },
    { value: 100, label: 'Graduate' },
  ];

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
        Tour Complexity
      </Typography>
      <Stack spacing={2} direction="row" alignItems="center">
        <Slider
          value={complexity}
          onChange={handleChange}
          min={0}
          max={100}
          step={25}
          marks={marks}
          sx={{
            color: '#C084FC',
            '& .MuiSlider-thumb': {
              width: 21, 
              height: 20, 
              backgroundColor: 'var(--text-color)',
              border: '2px solid #C084FC',
            },
            '& .MuiSlider-mark': {
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              backgroundColor: '#C084FC',
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default ComplexitySlider;
