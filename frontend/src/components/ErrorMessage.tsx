import { Box, Container, Typography } from '@mui/material';
import GradientTypography from './GradientTypography';

interface ErrorMessageProps {
  error: Error;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <GradientTypography sx={{ mb: 4 }}>
          Oops! Something went wrong
        </GradientTypography>
        <Typography color="error" sx={{ mb: 2 }}>
          {error.message}
        </Typography>
        <Typography color="text.secondary">
          Please try refreshing the page or come back later.
        </Typography>
      </Container>
    </Box>
  );
};

export default ErrorMessage;
