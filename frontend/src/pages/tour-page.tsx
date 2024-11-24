import {
  Box,  
  Stack,
  Container,
  Typography,
  Fade
} from '@mui/material'
import ExhibitDetails from '../components/ExhibitDetails'
import ComplexityControl from '../components/ComplexityControl'
import TopicInterests from '../components/TopicInterests'
import ChatWindow from '../components/ChatWindow'
import RecommendedExhibits from '../components/RecommendedExhibits'
import FeedbackSection from '../components/FeedbackSection'
import VoiceAssistant from '../components/VoiceAssistant'
import { useExhibit } from '../api/queries'
import CogSpinner from '../components/CogSpinner'

interface TourPageProps {
  exhibitId: string;
  userId: string | null;
}

export default function TourPage({ exhibitId, userId }: TourPageProps) {
  const { data: exhibit, isLoading: isExhibitLoading } = useExhibit(exhibitId)

  if (isExhibitLoading) {
    return (
      <Box 
        sx={{ 
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--background-gradient)'
        }}
      >
        <Fade in={true}>
          <Box sx={{ textAlign: 'center' }}>
            <CogSpinner />
            <Typography
              variant="h5"
              sx={{
                color: 'var(--text-color)',
                fontWeight: 500,
                mt: 3
              }}
            >
              Preparing Your Exhibition Experience...
            </Typography>
          </Box>
        </Fade>
      </Box>
    )
  }

  if (!exhibit) return null

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mt: 4 }}>
          {/* Main Content */}
          <Box sx={{ flex: '2 1 auto', minWidth: 0 }}>
            <ExhibitDetails 
              exhibit={exhibit}
            />
            <RecommendedExhibits userId={userId || ''} />
            <FeedbackSection />
          </Box>

          {/* Chat & Recommendations */}
          <Box sx={{ flex: '1 1 auto', minWidth: { xs: '100%', md: '350px' }, maxWidth: { md: '400px' } }}>
            <Stack spacing={4}>
              <VoiceAssistant />
              <ChatWindow
                sessionId={exhibitId}
                exhibit={exhibit}
              />
              <ComplexityControl />
              <TopicInterests />   

            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}