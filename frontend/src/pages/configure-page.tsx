import * as React from 'react'
import { Box, Container, Typography, Paper, Stack } from '@mui/material'
import ComplexitySlider from '../components/ComplexitySlider'
import TopicSlider from '../components/TopicSlider'
import GradientTypography from '../components/GradientTypography'
import StartJourneyButton from '../components/StartJourneyButton'
import { useTopics } from '../api/queries'
import ComplexityControl from '../components/ComplexityControl'
import TopicInterests from '../components/TopicInterests'

export default function ConfigurePage() {

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
          <ComplexityControl />
          <TopicInterests />
          <StartJourneyButton />
        </Paper>
      </Container>
    </Box>
  );
}
