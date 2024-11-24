import * as React from 'react'
import { Box, Container, Typography, Paper, Stack } from '@mui/material'
import ComplexitySlider from '../components/ComplexitySlider'
import TopicSlider from '../components/TopicSlider'
import GradientTypography from '../components/GradientTypography'
import StartJourneyButton from '../components/StartJourneyButton'
import { useTopics } from '../api/queries'

export default function ConfigurePage() {
  const { data: topics = [] } = useTopics();

  const [complexity, setComplexity] = React.useState(() => {
    return Number(localStorage.getItem('complexity')) || 50
  });

  const [topicInterests, setTopicInterests] = React.useState<Record<string, number>>(() => {
    const savedInterests = localStorage.getItem('topicInterests')
    return savedInterests ? JSON.parse(savedInterests) : {}
  });

  React.useEffect(() => {
    localStorage.setItem('complexity', complexity.toString())
  }, [complexity]);

  React.useEffect(() => {
    localStorage.setItem('topicInterests', JSON.stringify(topicInterests))
  }, [topicInterests]);

  const handleInterestChange = (topic: string, value: number) => {
    setTopicInterests(prev => ({
      ...prev,
      [topic]: value
    }));
  };

  return (
    <Box
      sx={{
        minHeight: '90vh',
        background: 'var(--background-gradient)',
        padding: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={24}
          sx={{
            padding: 6,
            background: 'var(--paper-bg)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            border: '1px solid var(--paper-border)',
            boxShadow: '0 0 40px rgba(138, 43, 226, 0.2)',
          }}
        >
          <GradientTypography sx={{ mb: 4 }}>Configure Your Journey</GradientTypography>

          <ComplexitySlider complexity={complexity} setComplexity={setComplexity} />

          <Box>
            <Typography variant="h6" sx={{ color: 'var(--text-color)', mb: 3 }}>
              Topics of Interest
            </Typography>
            <Stack spacing={3}>
              {topics.map(topic => (
                <TopicSlider
                  key={topic.id}
                  topic={topic}
                  value={topicInterests[topic.id] ?? 50}
                  onChange={handleInterestChange}
                />
              ))}
            </Stack>
          </Box>

          <StartJourneyButton />
        </Paper>
      </Container>
    </Box>
  );
}
