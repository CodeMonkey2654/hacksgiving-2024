import { Paper, Box, Stack, TextField, Button } from '@mui/material';
import ChatMessage from './ChatMessage';
import { useChatWithExhibit } from '../api/queries';
import { useState } from 'react';

interface Message {
  text: string;
  isBot: boolean;
}

interface ChatWindowProps {
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  complexity: number;
  interests: Record<string, number>;
  language: string;
}

const ChatWindow = ({ 
  messages, 
  newMessage, 
  setNewMessage, 
  handleSendMessage,
  complexity,
  interests,
  language
}: ChatWindowProps) => {
  const chatMutation = useChatWithExhibit();

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