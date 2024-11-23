import { Box, Container } from '@mui/material'
import { useState } from 'react'
import GradientTypography from '../components/GradientTypography'
import ExhibitCard from '../components/ExhibitCard'
import FeedbackForm from '../components/FeedbackForm'
import { Link } from '@tanstack/react-router'
import { useExhibits } from '../api/queries';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function ExhibitsPage() {
  const { data: exhibits = [], isLoading, error } = useExhibits();
  const [selectedExhibit, setSelectedExhibit] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  const handleSubmitFeedback = () => {
    console.log({ exhibitId: selectedExhibit, rating, feedback });
    setRating(null);
    setFeedback('');
    setSelectedExhibit(null);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <GradientTypography sx={{ mb: 6 }}>
          Interactive Exhibits
        </GradientTypography>

        <Box sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center'
        }}>
          {exhibits.map((exhibit) => (
            <Box key={exhibit.id} sx={{ width: { xs: '100%', md: 'calc(50% - 16px)' } }}>
              <Link to="/exhibit/$exhibitId" params={{ exhibitId: exhibit.id.toString() }} style={{ textDecoration: 'none' }}>
                <ExhibitCard
                  exhibit={exhibit}
                  onClick={() => setSelectedExhibit(exhibit.id)}
                />
              </Link>
            </Box>
          ))}
        </Box>

        {selectedExhibit && (
          <FeedbackForm
            rating={rating}
            setRating={setRating}
            feedback={feedback}
            setFeedback={setFeedback}
            onSubmit={handleSubmitFeedback}
          />
        )}
      </Container>
    </Box>
  );
}
