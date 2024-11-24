import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Exhibit {
  exhibit_id: string;
  title: string;
  description: string;
  image_url: string;
  topic: string[];
  score?: number;
}

interface UserPreferences {
  interests: Record<string, number>;
  visited_exhibits?: string[];
}

export const useFetchExhibits = (preferences: UserPreferences) => {
  return useQuery({
    queryKey: ['recommendations', preferences],
    queryFn: async () => {
      const response = await axios.post<Exhibit[]>('/api/recommendations', preferences);
      return response.data;
    },
    enabled: !!preferences,
  });
};