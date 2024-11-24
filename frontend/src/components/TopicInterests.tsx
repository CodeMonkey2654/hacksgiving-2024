import { Paper, Typography, Stack, Box } from '@mui/material';
import TopicSlider from './TopicSlider';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTopics } from '../api/queries';

interface Topic {
  id: string;
  label: string;
  icon: string;
  color: string;
}

const TopicInterests: React.FC = () => {
  const { data: topics } = useTopics();
  const [topicInterests, setTopicInterests] = useState<Record<string, number>>({});

  // Load initial values from localStorage or set to 50
  useEffect(() => {
    const savedInterests = localStorage.getItem('topicInterests');
    if (savedInterests && topics) {
      try {
        const parsed = JSON.parse(savedInterests);
        // Ensure we have values for all topics
        const updatedInterests = topics.reduce((acc: Record<string, number>, topic: Topic) => ({
          ...acc,
          [topic.id]: parsed[topic.id] ?? 50
        }), {});
        setTopicInterests(updatedInterests);
      } catch (e) {
        console.error('Failed to parse saved interests:', e);
        // Set default values if parsing fails
        if (topics) {
          const defaults = topics.reduce((acc: Record<string, number>, topic: Topic) => ({
            ...acc,
            [topic.id]: 50
          }), {});
          setTopicInterests(defaults);
          localStorage.setItem('topicInterests', JSON.stringify(defaults));
        }
      }
    } else if (topics) {
      // Set default values if no saved interests
      const defaults = topics.reduce((acc: Record<string, number>, topic: Topic) => ({
        ...acc,
        [topic.id]: 50
      }), {});
      setTopicInterests(defaults);
      localStorage.setItem('topicInterests', JSON.stringify(defaults));
    }
  }, [topics]);

  const handleInterestChange = (topicId: string, value: number) => {
    const newInterests = { ...topicInterests, [topicId]: value };
    setTopicInterests(newInterests);
    localStorage.setItem('topicInterests', JSON.stringify(newInterests));
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
              value={topicInterests[topic.id] || 50}
              onChange={handleInterestChange}
            />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default TopicInterests;