import { Paper, Typography, Stack, Box } from '@mui/material';
import TopicSlider from './TopicSlider';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTopics } from '../api/queries';

const TopicInterests: React.FC = () => {
  const { data: topics } = useTopics();
  const [topicInterests, setTopicInterests] = useState<Record<string, number>>(
    JSON.parse(localStorage.getItem('topicInterests') || '{}')
  );

  useEffect(() => {
    localStorage.setItem('topicInterests', JSON.stringify(topicInterests));
  }, [topicInterests]);

  const handleInterestChange = (topicId: string, value: number) => {
    setTopicInterests(prev => ({ ...prev, [topicId]: value }));
  };

  return (
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
        {topics?.map((topic: Topic) => (
          <Box key={topic.id}>
            <TopicSlider
              topic={topic}
              value={topicInterests[topic.id] || 0}
              onChange={handleInterestChange}
            />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default TopicInterests;