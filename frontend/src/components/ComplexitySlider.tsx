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
    { value: 0, label: 'Elem' },
    { value: 25, label: 'Middle' },
    { value: 50, label: 'High' },
    { value: 75, label: 'College' },
    { value: 100, label: 'Grad' },
  ];

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h6" sx={{ color: 'var(--text-color)', mb: 2 }}>
        Education Level
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
            color: 'var(--secondary)',
            '& .MuiSlider-thumb': {
              width: 24,
              height: 24,
              backgroundColor: 'var(--secondary)',
              border: '2px solid var(--primary)',
            },
            '& .MuiSlider-markLabel': {
              color: 'var(--text-secondary)', 
              fontSize: '0.91rem', 
            },
            '& .MuiSlider-mark': {
              backgroundColor: 'var(--secondary)',
              width: 11,
              height: 11,
              borderRadius: '50%',
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default ComplexitySlider;
