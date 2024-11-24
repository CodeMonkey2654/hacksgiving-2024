import { Paper, Box, Stack, TextField, Button } from '@mui/material';
import ChatMessage from './ChatMessage';
import { useChatWithExhibit } from '../api/queries';
import { useState } from 'react';

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
  const chatMutation = useChatWithExhibit();
  const [messages, setMessages] = useState([
    {
      text: exhibit ? `Welcome to the ${exhibit.title} exhibit! I'm Dr. Sarah, your guide. I'll explain everything at a high school level by default, but you can adjust the complexity using the slider above. What would you like to know about ${exhibit.title.toLowerCase()}?` : '',
      isBot: true,
    },
  ])
  const [newMessage, setNewMessage] = useState('')
  const topicInterests = localStorage.getItem('topicInterests')
  const complexity = localStorage.getItem('complexity')
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