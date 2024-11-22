import { Paper, Typography, Stack, Box } from '@mui/material';
import TopicSlider from './TopicSlider';

type Topic = {
  id: 'physics' | 'chemistry' | 'biology' | 'astronomy';
  label: string;
  icon: string;
  color: string;
};

const TOPICS = [
  { id: 'physics', label: 'Physics', icon: '⚛️', color: '#60A5FA' },
  { id: 'chemistry', label: 'Chemistry', icon: '🧪', color: '#C084FC' },
  { id: 'biology', label: 'Biology', icon: '🧬', color: '#F472B6' },
  { id: 'astronomy', label: 'Astronomy', icon: '🔭', color: '#818CF8' },
] as const;

interface TopicInterestsProps {
  topicInterests: Record<Topic['id'], number>;
  handleInterestChange: (topic: Topic['id'], value: number) => void;
}

const TopicInterests: React.FC<TopicInterestsProps> = ({ topicInterests, handleInterestChange }) => (
  <Paper
    sx={{
      p: 3,
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: 4,
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }}
  >
    <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
      Topics of Interest
    </Typography>
    <Stack spacing={3}>
      {TOPICS.map(topic => (
        <Box key={topic.id}>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
            {topic.icon} {topic.label}
          </Typography>
          <TopicSlider
            topic={topic}
            value={topicInterests[topic.id]}
            onChange={handleInterestChange}
          />
        </Box>
      ))}
    </Stack>
  </Paper>
);

export default TopicInterests;