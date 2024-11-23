import { Box, Stack, Typography, Slider } from '@mui/material';

interface Topic {
  id: 'physics' | 'chemistry' | 'biology' | 'astronomy';
  label: string;
  icon: string;
  color: string;
}

interface TopicSliderProps {
  topic: Topic;
  value: number;
  onChange: (topicId: Topic['id'], value: number) => void;
}

const TopicSlider: React.FC<TopicSliderProps> = ({ topic, value, onChange }) => (
  <Box>
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
      <Typography sx={{ fontSize: '24px' }}>{topic.icon}</Typography>
      <Typography sx={{ color: 'white', minWidth: 100 }}>{topic.label}</Typography>
      <Slider
        value={value}
        onChange={(_, newValue) => onChange(topic.id, newValue as number)}
        sx={{
          color: topic.color,
          '& .MuiSlider-thumb': {
            backgroundColor: '#fff'
          }
        }}
      />
    </Stack>
  </Box>
);

export default TopicSlider;