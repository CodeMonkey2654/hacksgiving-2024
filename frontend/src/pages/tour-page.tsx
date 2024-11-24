import {
  Box,  
  Stack,
  Container,
  CircularProgress,
  Typography,
  Fade
} from '@mui/material'
import { useState, useEffect } from 'react'
import ExhibitDetails from '../components/ExhibitDetails'
import ComplexityControl from '../components/ComplexityControl'
import TopicInterests from '../components/TopicInterests'
import ChatWindow from '../components/ChatWindow'
import RecommendedExhibits from '../components/RecommendedExhibits'
import FeedbackSection from '../components/FeedbackSection'
import VoiceAssistant from '../components/VoiceAssistant'
import { useExhibit, useRecommendations, useChatWithExhibit, useExhibitDescription, useRecordVisit } from '../api/queries'
import CogSpinner from '../components/CogSpinner'

interface TourPageProps {
  exhibitId: string;
  userId: string;
}

export default function TourPage({ exhibitId, userId }: TourPageProps) {
  const { data: exhibit, isLoading: isExhibitLoading } = useExhibit(exhibitId)
  const { data: exhibitDescription, isLoading: isDescriptionLoading } = useExhibitDescription(exhibitId)
  const { data: recommendedExhibits } = useRecommendations(userId)
  const chatMutation = useChatWithExhibit()
  const recordVisit = useRecordVisit();

  const [messages, setMessages] = useState([
    {
      text: exhibit ? `Welcome to the ${exhibit.title} exhibit! I'm Dr. Sarah, your guide. I'll explain everything at a high school level by default, but you can adjust the complexity using the slider above. What would you like to know about ${exhibit.title.toLowerCase()}?` : '',
      isBot: true,
    },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [rating, setRating] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [complexity, setComplexity] = useState(() => {
    return Number(localStorage.getItem('complexity')) || 50
  })
  const [topicInterests, setTopicInterests] = useState<Record<string, number>>(() => {
    const savedInterests = localStorage.getItem('topicInterests')
    return savedInterests ? JSON.parse(savedInterests) : {
      physics: 50,
      chemistry: 50,
      biology: 50,
      astronomy: 50
    }
  })

  useEffect(() => {
    localStorage.setItem('complexity', complexity.toString())
  }, [complexity])

  useEffect(() => {
    localStorage.setItem('topicInterests', JSON.stringify(topicInterests))
  }, [topicInterests])

  const handleInterestChange = (topic: string, value: number) => {
    setTopicInterests(prev => ({
      ...prev,
      [topic]: value
    }))
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setMessages([...messages, { text: newMessage, isBot: false }]);
    setNewMessage('');

    try {
      const response = await chatMutation.mutateAsync({
        message: newMessage,
        sessionId: exhibitId,
        interests: topicInterests,
        complexity: complexity,
        language: localStorage.getItem('language') || 'en'
      });

      setMessages(prev => [...prev, {
        text: response.data.response,
        isBot: true
      }]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleSubmitFeedback = () => {
    console.log({ exhibitId, rating, feedback })
    setRating(null)
    setFeedback('')
  }

  if (isExhibitLoading || isDescriptionLoading) {
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

  if (!exhibit || !exhibitDescription) return null

  const enrichedExhibit = {
    ...exhibit,
    details: exhibitDescription.description
  }

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mt: 4 }}>
          {/* Main Content */}
          <Box sx={{ flex: '2 1 auto', minWidth: 0, p: 2 }}>
            <ExhibitDetails 
              exhibit={enrichedExhibit}
            />
            <RecommendedExhibits exhibits={recommendedExhibits || []} />
          </Box>

          {/* Chat & Recommendations */}
          <Box sx={{ flex: '1 1 auto', minWidth: { xs: '100%', md: '350px' }, maxWidth: { md: '400px' } }}>
            <Stack spacing={4}>
              <ComplexityControl 
                complexity={complexity}
                setComplexity={setComplexity}
              />

              <TopicInterests
                topicInterests={topicInterests}
                handleInterestChange={handleInterestChange}
              />

              <ChatWindow
                messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
                complexity={complexity}
                interests={topicInterests}
                language={localStorage.getItem('language') || 'en'}
              />

              <VoiceAssistant />

              <FeedbackSection
                rating={rating}
                setRating={setRating}
                feedback={feedback}
                setFeedback={setFeedback}
                handleSubmitFeedback={handleSubmitFeedback}
              />
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}