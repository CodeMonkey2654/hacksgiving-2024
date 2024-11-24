import { Box, Fade, Typography } from "@mui/material";
import CogSpinner from "./CogSpinner";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const funFacts = [
        "The human brain can store up to 2.5 petabytes of data!",
        "Honey never spoils - archaeologists found 3000-year-old honey still edible!",
        "A day on Venus is longer than its year!",
        "Bananas are berries, but strawberries aren't!",
        "Octopuses have three hearts!",
        "A bolt of lightning is five times hotter than the sun's surface!",
        "DNA is like a twisted ladder that could stretch to Pluto and back!",
        "The first computer programmer was a woman - Ada Lovelace!",
        "There are more possible chess games than atoms in the universe!",
        "Quantum computers can theoretically process more calculations than atoms in the universe!"
    ];

    const [factIndex, setFactIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFactIndex(Math.floor(Math.random() * funFacts.length));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box 
          sx={{ 
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--background-gradient)'
          }}
        >
          <Fade in={true}>
            <Box sx={{ textAlign: 'center' }}>
              <CogSpinner />
              <Typography
                variant="h5"
                sx={{
                  color: 'var(--text-color)',
                  fontWeight: 500,
                  mt: 3,
                  maxWidth: '600px'
                }}
              >
                {funFacts[factIndex]}
              </Typography>
            </Box>
          </Fade>
        </Box>
    )
}