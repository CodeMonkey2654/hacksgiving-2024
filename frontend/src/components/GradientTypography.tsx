import { Typography, TypographyProps } from '@mui/material';
import { ReactNode } from 'react';

interface GradientTypographyProps {
  children: ReactNode;
  variant?: TypographyProps['variant'];
  sx?: TypographyProps['sx'];
}

const GradientTypography = ({
  children,
  variant = 'h3',
  sx = {}
}: GradientTypographyProps) => (
  <Typography
    variant={variant}
    sx={{
      textAlign: 'center',
      fontWeight: 700,
      background: 'linear-gradient(45deg, #60A5FA, #C084FC, #F472B6)',
      backgroundClip: 'text',
      color: 'transparent',
      ...sx
    }}
  >
    {children}
  </Typography>
);

export default GradientTypography;