import { Paper, Typography, Stack, Rating, TextField, Button } from '@mui/material';
import { useState } from 'react';

const FeedbackSection: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

  const handleSubmitFeedback = () => {
    console.log({ rating, feedback });
    setRating(null);
    setFeedback('');
  };
  
  return (
  <Paper
    sx={{
      p: 3,
      mt: 2,
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)', 
      borderRadius: 4,
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}
  >
    <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
      Leave Feedback
    </Typography>
    <Stack spacing={2}>
      <Rating
        value={rating}
        onChange={(_, value) => setRating(value)}
        sx={{ '& .MuiRating-iconFilled': { color: 'var(--text-color)' } }}
      />
      <TextField
        multiline
        rows={3}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Share your thoughts..."
        sx={{
          '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' }
          }
        }}
      />
      <Button
        variant="contained"
        onClick={handleSubmitFeedback}
        sx={{
          background: 'linear-gradient(45deg, #60A5FA, #C084FC)'
        }}
      >
        Submit Feedback
      </Button>
    </Stack>
    </Paper>
  );
};

export default FeedbackSection;