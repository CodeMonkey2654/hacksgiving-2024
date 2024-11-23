import { Stack, Paper, Avatar, Typography } from '@mui/material';

const ChatMessage = ({ message }) => (
    <Stack
      direction="row"
      spacing={2}
      sx={{ mb: 2, justifyContent: message.isBot ? 'flex-start' : 'flex-end' }}
    >
      {message.isBot && (
        <Avatar sx={{ bgcolor: '#C084FC' }}>DR</Avatar>
      )}
      <Paper
        sx={{
          p: 2,
          maxWidth: '80%',
          background: message.isBot ? 'rgba(192, 132, 252, 0.1)' : 'rgba(96, 165, 250, 0.1)',
          borderRadius: 2,
        }}
      >
        <Typography sx={{ color: 'white' }}>{message.text}</Typography>
      </Paper>
    </Stack>
  )

export default ChatMessage;