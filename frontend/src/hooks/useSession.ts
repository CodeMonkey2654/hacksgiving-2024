import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useSession = () => {
  const [userId, setUserId] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Get or create user ID
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      storedUserId = `user_${uuidv4()}`;
      localStorage.setItem('userId', storedUserId);
    }
    setUserId(storedUserId);

    // Create new session ID
    const newSessionId = `session_${uuidv4()}`;
    localStorage.setItem('currentSessionId', newSessionId);
    setSessionId(newSessionId);

    // Record session start
    const sessionStart = new Date().toISOString();
    localStorage.setItem('sessionStart', sessionStart);

    // Cleanup on unmount
    return () => {
      const sessionEnd = new Date().toISOString();
      localStorage.setItem('lastSessionEnd', sessionEnd);
    };
  }, []);

  return { userId, sessionId };
}; 