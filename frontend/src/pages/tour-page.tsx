import {
  Box,  
  Stack,
  Container
} from '@mui/material'
import { useState, useEffect } from 'react'
import ExhibitDetails from '../components/ExhibitDetails'
import ComplexityControl from '../components/ComplexityControl'
import TopicInterests from '../components/TopicInterests'
import ChatWindow from '../components/ChatWindow'
import RecommendedExhibits from '../components/RecommendedExhibits'
import FeedbackSection from '../components/FeedbackSection'

// Define types to match the exhibit data structure from the route loader
interface ExhibitDetails {
  elementary: string;
  'middle-school': string;
  'high-school': string;
  college: string;
  expert: string;
}

interface Exhibit {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  details: ExhibitDetails;
}

interface TourPageProps {
  exhibit: Exhibit;
}
export default function TourPage({ exhibit }: TourPageProps) {
  console.log({ exhibit })
  const [messages, setMessages] = useState([
    {
      text: `Welcome to the ${exhibit.title} exhibit! I'm Dr. Sarah, your ${exhibit.category.toLowerCase()} guide. I'll explain everything at a high school level by default, but you can adjust the complexity using the slider above. What would you like to know about ${exhibit.title.toLowerCase()}?`,
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

  const getComplexityLevel = (value: number) => {
    if (value <= 20) return 'elementary'
    if (value <= 40) return 'middle-school'
    if (value <= 60) return 'high-school'
    if (value <= 80) return 'college'
    return 'expert'
  }
  const recommendedExhibits = [
    {
      id: "2",
      title: 'Chemical Reactions Lab',
      description: 'Witness spectacular chemical transformations',
      image: '🧪',
      category: 'Chemistry',
    },
    {
      id: "3", 
      title: 'DNA & Life',
      description: 'Discover the building blocks of life',
      image: '🧬',
      category: 'Biology',
    },
  ]

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

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    setMessages([...messages, { text: newMessage, isBot: false }])
    setNewMessage('')

    // Simulate bot response based on complexity
    setTimeout(() => {
      const responses = {
        'elementary': "That's a great question! Think of quantum particles like tiny magical marbles that can be in two places at once until we look at them!",
        'middle-school': "Great question! Quantum particles are like mysterious objects that don't follow the normal rules we see in everyday life. They can do things that seem impossible!",
        'high-school': "That's a great question about quantum mechanics! The fascinating thing about quantum particles is that they can exist in multiple states simultaneously until observed.",
        'college': "Excellent inquiry! This relates to the principle of quantum superposition, where particles exist in all possible eigenstates until a measurement collapses the wave function.",
        'expert': "Intriguing question! This phenomenon demonstrates the Copenhagen interpretation's measurement problem, where quantum superposition persists until interaction with a classical measuring apparatus causes decoherence."
      }
      
      setMessages(prev => [...prev, {
        text: responses[getComplexityLevel(complexity)],
        isBot: true
      }])
    }, 1000)
  }
  const handleSubmitFeedback = () => {
    console.log({ exhibitId: exhibit.id, rating, feedback })
    setRating(null)
    setFeedback('')
  }

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mt: 4 }}>
          {/* Main Content */}
          <Box sx={{ flex: '2 1 auto', minWidth: 0 }}>
            <ExhibitDetails 
              exhibit={exhibit} 
              complexityLevel={getComplexityLevel(complexity)} 
            />
            <RecommendedExhibits exhibits={recommendedExhibits} />
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
              />

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