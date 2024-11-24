import {
  LiveKitRoom,
  RoomAudioRenderer,
  BarVisualizer,
  useVoiceAssistant,
  ControlBar
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useEffect, useState } from "react";
import { AccessToken } from 'livekit-server-sdk';
import { Box, IconButton, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

const LIVEKIT_API_KEY = 'APIPdt7brNQ5fhi';
const LIVEKIT_API_SECRET = 'VtgAfVCvldWCMlKkcBPvZcOf0sO0AiGppu9MGzjCnZU';
const LIVEKIT_URL = 'wss://hackathon-f4yb1eyf.livekit.cloud';


function SimpleVoiceAssistant() {
    const { state, audioTrack } = useVoiceAssistant();
    return <BarVisualizer state={state} trackRef={audioTrack} />;
}

function VoiceAssistant() {
  const [token, setToken] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  const generateToken = async () => {
    try {
      const roomName = 'voice-assistant-room';
      const participantName = 'user-' + Math.random().toString(36).substring(7);

      const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
        identity: participantName,
      });
      at.addGrant({ roomJoin: true, room: roomName });

      const token = await at.toJwt();
      setToken(token);
    } catch (error) {
      console.error("Failed to generate token:", error);
    }
  };

  const handleConnect = () => {
    if (!connected) {
      generateToken();
      setConnected(true);
    } else {
      setToken("");
      setConnected(false);
    }
  };

  useEffect(() => {
    generateToken();
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: connected ? '425px' : '150px',
        background: 'var(--paper-bg)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--paper-border)',
        transition: 'all 0.3s ease',
        padding: '32px', // Increased from 24px
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        }
      }}
    >
      
      <Box
        sx={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          right: '24px',
          bottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}
      >
        <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>Voice Assistant</Typography>
        <IconButton
          onClick={handleConnect}
          sx={{
            width: '60px',
            height: '60px',
            background: connected ? 'var(--secondary)' : 'var(--primary)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: connected ? 'var(--secondary-dark)' : 'var(--primary-dark)',
              transform: 'scale(1.1)'
            }
          }}
        >
          <MicIcon sx={{ color: '#fff', fontSize: '2rem' }} />
        </IconButton>

        {connected && token && (
          <LiveKitRoom
            audio={true}
            token={token}
            serverUrl={LIVEKIT_URL}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <RoomAudioRenderer />
              <SimpleVoiceAssistant />
              <ControlBar variation="minimal"/>
            </Box>
          </LiveKitRoom>
        )}
      </Box>
    </Box>
  );
}

export default VoiceAssistant;