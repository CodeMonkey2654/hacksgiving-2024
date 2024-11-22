import { Box, Container } from '@mui/material'
import { useState } from 'react'
import GradientTypography from '../components/GradientTypography'
import ExhibitCard from '../components/ExhibitCard'
import FeedbackForm from '../components/FeedbackForm'
import { Link } from '@tanstack/react-router'

export default function ExhibitsPage() {
  const [selectedExhibit, setSelectedExhibit] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

  const exhibits = [
    {
      id: 1,
      title: 'Quantum Mysteries',
      description: 'Explore the fascinating world of quantum mechanics through interactive demonstrations',
      image: '⚛️',
      category: 'Physics'
    },
    {
      id: 2, 
      title: 'Chemical Reactions Lab',
      description: 'Witness spectacular chemical transformations and understand the principles behind them',
      image: '🧪',
      category: 'Chemistry'
    },
    {
      id: 3,
      title: 'DNA & Life',
      description: 'Discover the building blocks of life and how genetics shapes our world',
      image: '🧬',
      category: 'Biology'
    },
    {
      id: 4,
      title: 'Cosmic Journey',
      description: 'Travel through space and time to explore the wonders of our universe',
      image: '🔭',
      category: 'Astronomy'
    }
  ];

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
