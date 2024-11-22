import { Paper, Typography, Stack, Rating, TextField, Button } from '@mui/material';

interface FeedbackFormProps {
  rating: number | null;
  setRating: (value: number | null) => void;
  feedback: string;
  setFeedback: (value: string) => void;
  onSubmit: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  rating,
  setRating,
  feedback,
  setFeedback,
  onSubmit
}) => (
  <Paper
    elevation={24}
    sx={{
      mt: 6,
      p: 4,
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: 4,
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }}
  >
    <Typography
      variant="h5"
      sx={{
        color: 'white',
        mb: 3,
        textAlign: 'center',
      }}
    >
      Share Your Experience
    </Typography>
    <Stack spacing={3} alignItems="center">
      <Rating
        value={rating}
        onChange={(_, value) => setRating(value)}
        sx={{
          '& .MuiRating-iconFilled': {
            color: '#C084FC',
          },
        }}
        size="large"
      />
      <TextField
        multiline
        rows={4}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Share your thoughts about this exhibit..."
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#C084FC',
            },
          },
        }}
      />
      <Button
        variant="contained"
        onClick={onSubmit}
        sx={{
          background: 'linear-gradient(45deg, #60A5FA, #C084FC)',
          boxShadow: '0 0 20px rgba(192, 132, 252, 0.3)',
          '&:hover': {
            background: 'linear-gradient(45deg, #3B82F6, #A855F7)',
            transform: 'translateY(-2px)',
            boxShadow: '0 0 30px rgba(192, 132, 252, 0.5)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        Submit Feedback
      </Button>
    </Stack>
  </Paper>
);

export default FeedbackForm;