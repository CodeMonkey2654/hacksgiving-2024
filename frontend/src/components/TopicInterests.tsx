import { Paper, Typography, Stack, Box } from '@mui/material';
import TopicSlider from './TopicSlider';

type Topic = {
  id: 'history' | 'science' | 'nature' | 'engineering' | 'arts' | 'interactive';
  label: string;
  icon: string; 
  color: string;
};

const TOPICS = [
  { id: 'history', label: 'History & Culture', icon: '🏺', color: '#60A5FA' },
  { id: 'science', label: 'Science & Technology', icon: '🔬', color: '#C084FC' },
  { id: 'nature', label: 'Nature & Environment', icon: '🌿', color: '#F472B6' },
  { id: 'engineering', label: 'Engineering & Machines', icon: '⚙️', color: '#818CF8' },
  { id: 'arts', label: 'Arts & Music', icon: '🎨', color: '#34D399' },
  { id: 'interactive', label: 'Interactive Activities', icon: '🤝', color: '#FBBF24' },
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