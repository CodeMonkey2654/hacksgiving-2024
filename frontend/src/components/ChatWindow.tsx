import { Paper, Box, Stack, TextField, Button } from '@mui/material';
import ChatMessage from './ChatMessage';
const ChatWindow = ({ messages, newMessage, setNewMessage, handleSendMessage }) => (
    <Paper
      sx={{
        p: 3,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: 4,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
      </Box>
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Ask about the exhibit..."
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={{
            background: 'linear-gradient(45deg, #60A5FA, #C084FC)',
            minWidth: '100px',
          }}
        >
          Send
        </Button>
      </Stack>
    </Paper>
  )

export default ChatWindow;