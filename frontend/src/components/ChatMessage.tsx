import React from 'react';
import { Stack, Paper, Avatar, Typography, List, ListItem } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import '../styles/global.css';

interface Message {
  text: string;
  isBot: boolean;
}

const ChatMessage = ({ message }: { message: Message }) => {

  return (
    <Stack
      id={`message-${message.text}`}
      direction="row" 
      spacing={2}
      sx={{ mb: 2, justifyContent: message.isBot ? 'flex-start' : 'flex-end' }}
    >
      {message.isBot && (
        <Avatar sx={{ bgcolor: '#C084FC' }}>AL</Avatar>
      )}
      <Paper
        sx={{
          p: 2,
          maxWidth: '80%',
          background: message.isBot ? 'rgba(192, 132, 252, 0.1)' : 'rgba(96, 165, 250, 0.1)', 
          borderRadius: 2,
        }}
      >
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <Typography 
                sx={{ 
                  my: 0.5,
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '1rem',
                  lineHeight: 1.6
                }}
              >
                {children}
              </Typography>
            ),
            h1: ({ children }) => (
              <Typography 
                variant="h4" 
                sx={{ 
                  my: 0.5,
                  fontFamily: '"Roboto", sans-serif',
                  fontWeight: 600,
                  letterSpacing: '-0.02em'
                }}
              >
                {children}
              </Typography>
            ),
            h2: ({ children }) => (
              <Typography 
                variant="h5" 
                sx={{ 
                  my: 0.5,
                  fontFamily: '"Roboto", sans-serif', 
                  fontWeight: 600,
                  letterSpacing: '-0.01em'
                }}
              >
                {children}
              </Typography>
            ),
            h3: ({ children }) => (
              <Typography 
                variant="h6" 
                sx={{ 
                  my: 0.5,
                  fontFamily: '"Roboto", sans-serif',
                  fontWeight: 600
                }}
              >
                {children}
              </Typography>
            ),
            ul: ({ children }) => (
              <List sx={{ 
                ml: 3,
                my: 0.5,
                listStyleType: 'disc',
                '& .MuiListItem-root': {
                  display: 'list-item',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'inherit'
                }
              }}>
                {children}
              </List>
            ),
            ol: ({ children }) => (
              <List sx={{ 
                ml: 3,
                my: 0.5,
                listStyleType: 'decimal',
                '& .MuiListItem-root': {
                  display: 'list-item',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'inherit'
                }
              }}>
                {children}
              </List>
            ),
            li: ({ children }) => (
              <ListItem sx={{ my: 0.25, p: 0 }}>
                {children}
              </ListItem>
            ),
          }}
        >
          {message.text}
        </ReactMarkdown>
      </Paper>
    </Stack>
  );
}

export default ChatMessage;