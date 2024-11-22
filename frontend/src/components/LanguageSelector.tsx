import { Box, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Language } from '@mui/icons-material';

interface LanguageSelectorProps {
  language: string;
  handleLanguageChange: (event: SelectChangeEvent<string>) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, handleLanguageChange }) => (
  <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
    <FormControl
      size="small"
      sx={{
        minWidth: 120,
        '& .MuiOutlinedInput-root': {
          color: 'white',
          '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
          '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' }
        },
        '& .MuiSelect-icon': { color: 'white' }
      }}
    >
      <Select
        value={language}
        onChange={handleLanguageChange}
        startAdornment={<Language sx={{ mr: 1, color: 'white' }} />}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Español</MenuItem>
        <MenuItem value="fr">Français</MenuItem>
        <MenuItem value="de">Deutsch</MenuItem>
        <MenuItem value="zh">中文</MenuItem>
      </Select>
    </FormControl>
  </Box>
);

export default LanguageSelector;