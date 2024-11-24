import { v4 as uuidv4 } from 'uuid';
import { useCreateUser, useTopics } from '../api/queries';

export const USER_ID_KEY = 'user_id';
export const SESSION_ID_KEY = 'session_id';

export function useUserManagement() {
  const createUser = useCreateUser();
  const { data: topics = [] } = useTopics()
  const initialTopicInterests = topics.reduce((acc: Record<string, number>, topic: any) => {
    acc[topic.id] = 50;
    return acc;
  }, {});
  localStorage.setItem('topicInterests', JSON.stringify(initialTopicInterests));
  
  const initializeUser = async () => {
    // Check for existing user ID
    let userId = localStorage.getItem(USER_ID_KEY);
    const language = localStorage.getItem('language') || 'en';
    const interests = localStorage.getItem('topicInterests');
    const complexity = localStorage.getItem('complexity') || '50';
    
    const newUser = {
      id: uuidv4(),
      interests: interests ? JSON.parse(interests) : {},
      language: language,
      reading_level: complexity,
      created_at: new Date().toISOString()
    };
    
    await createUser.mutateAsync(newUser);
    userId = newUser.id;
    localStorage.setItem(USER_ID_KEY, userId);
    
    // Always create new session ID
    const sessionId = uuidv4();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
    
    return { userId, sessionId };
  };

  return { initializeUser };
}