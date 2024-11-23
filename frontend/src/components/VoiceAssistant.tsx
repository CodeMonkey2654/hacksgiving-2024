import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  BarVisualizer,
  useVoiceAssistant
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useEffect, useState } from "react";
import { AccessToken } from 'livekit-server-sdk';

const LIVEKIT_API_KEY = "APIPdt7brNQ5fhi";
const LIVEKIT_API_SECRET = "VtgAfVCvldWCMlKkcBPvZcOf0sO0AiGppu9MGzjCnZU";
const LIVEKIT_URL = "wss://hackathon-f4yb1eyf.livekit.cloud";

function SimpleVoiceAssistant() {
    const { state, audioTrack } = useVoiceAssistant();
    return <BarVisualizer state={state} trackRef={audioTrack} />;
}

function VoiceAssistant() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
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

    generateToken();
  }, []);

  if (!token) return null;

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: '100vh' }}
    >
      <RoomAudioRenderer />
      <SimpleVoiceAssistant />
    </LiveKitRoom>
  );
}

export default VoiceAssistant;