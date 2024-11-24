import { Paper, Box, Stack, TextField, Button, Typography, Fade, CircularProgress } from '@mui/material';
import ChatMessage from './ChatMessage';
import { useChatWithExhibit } from '../api/queries';
import { useState, useEffect } from 'react';
import CogSpinner from './CogSpinner';

interface Message {
  text: string;
  isBot: boolean;
}

interface ChatWindowProps {
  sessionId: string;
  exhibit: Exhibit;
}

const ChatWindow = ({ 
  sessionId,
  exhibit,
}: ChatWindowProps) => {
  const funFacts = [
    "The human brain can store up to 2.5 petabytes of data!",
    "Honey never spoils - archaeologists found 3000-year-old honey still edible!",
    "A day on Venus is longer than its year!",
    "Bananas are berries, but strawberries aren't!",
    "Octopuses have three hearts!",
    "A bolt of lightning is five times hotter than the sun's surface!",
    "DNA is like a twisted ladder that could stretch to Pluto and back!",
    "The first computer programmer was a woman - Ada Lovelace!",
    "There are more possible chess games than atoms in the universe!",
    "Quantum computers can theoretically process more calculations than atoms in the universe!"
  ];

  const chatMutation = useChatWithExhibit();
  const topicInterests = localStorage.getItem('topicInterests')
  const complexity = localStorage.getItem('complexity')
  const complexityLevels = {
    0: "Elementary school",
    25: "Middle school",
    50: "High school",
    75: "College",
    100: "Graduate school",
  }
  const [messages, setMessages] = useState([
    {
      text: exhibit ? `Greetings! I am Ada Lovelace, the world's first computer programmer and your personal guide to the ${exhibit.title} exhibit. I'll be explaining concepts at a ${complexityLevels[parseInt(complexity || '50')]} level, which you can adjust using the slider above. What would you like to learn about ${exhibit.title.toLowerCase()}?` : '',
      isBot: true,
    },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    if (chatMutation.isPending) {
      const interval = setInterval(() => {
        setFactIndex(Math.floor(Math.random() * funFacts.length));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [chatMutation.isPending]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setMessages([...messages, { text: newMessage, isBot: false }]);
    setNewMessage('');

    try {
      const response = await chatMutation.mutateAsync({
        message: newMessage,
        sessionId: sessionId,
        interests: topicInterests ? JSON.parse(topicInterests) : {},
        complexity: complexity ? parseInt(complexity) : 50,
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
  return (
    <Paper
      sx={{
        p: 3,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: 4,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        height: '400px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {chatMutation.isPending && (
          <Fade in={true} timeout={500}>
            <Stack 
              direction="row" 
              spacing={2} 
              sx={{ 
                mb: 2,
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  maxWidth: '80%',
                  background: 'rgba(192, 132, 252, 0.1)', 
                  borderRadius: 2,
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(192, 132, 252, 0.2)',
                  transition: 'all 0.3s ease'
                }}
              >
                <Stack 
                  direction="row" 
                  spacing={1.5}
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      color: 'var(--text-color)',
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      flex: 1
                    }}
                  >
                    <span><CircularProgress size={16} sx={{ mr: 1, color: 'var(--secondary-color)' }} /></span>{funFacts[factIndex]}
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Fade>
        )}
      </Box>
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          disabled={chatMutation.isPending}
          sx={{
            background: 'linear-gradient(45deg, #60A5FA, #C084FC)',
            '&:hover': {
              background: 'linear-gradient(45deg, #3B82F6, #A855F7)',
            },
          }}
        >
          Send
        </Button>
      </Stack>
    </Paper>
  );
};

export default ChatWindow;