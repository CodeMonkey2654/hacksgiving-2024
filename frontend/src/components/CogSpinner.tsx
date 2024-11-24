import { Box } from '@mui/material';
import cog from '../assets/cog.png';

export default function CogSpinner() {
  return (
    // In this case, I decided not to use React because the spinner is a static image
    // and doesn't need to be interactive. I used the Box component from MUI to center
    // the spinner on the screen.
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%', 
      width: '90%'
    }}>
      <div className="loader">
        <div className="cog-top">
          <img className="loader_cogs_top" src={cog} />
        </div>
        <div className="cog-left">
          <img className="loader_cogs_left" src={cog} />
        </div>
        <div className="cog-bottom">
          <img className="loader_cogs_bottom" src={cog} />
        </div>
      </div>
    </Box>
  );
} 