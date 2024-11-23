import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Exhibit {
  exhibit_id: string;
  title: string;
  description: string;
  image_url: string;
  topic: string[];
}

interface UserPreferences {
  interests: string[];
  experience_level: string;
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