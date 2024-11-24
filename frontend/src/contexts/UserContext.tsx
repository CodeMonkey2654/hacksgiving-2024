import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUserManagement } from '../services/userService';

interface UserContextType {
  userId: string | null;
  sessionId: string | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  sessionId: null,
  isLoading: true
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { initializeUser } = useUserManagement();

  useEffect(() => {
    const initialize = async () => {
      const { userId, sessionId } = await initializeUser();
      setUserId(userId);
      setSessionId(sessionId);
      setIsLoading(false);
    };

    initialize();
  }, []);

  return (
    <UserContext.Provider value={{ userId, sessionId, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);