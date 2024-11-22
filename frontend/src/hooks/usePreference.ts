import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface UserPreferences {
  interests: string[];
  experience_level: string;
}

export const usePreferences = () => {
  const queryClient = useQueryClient();

  // Query to fetch initial preferences
  const { data: preferences = { interests: [], experience_level: 'beginner' } } = useQuery({
    queryKey: ['preferences'],
    queryFn: async () => {
      const { data } = await axios.get<UserPreferences>('/api/preferences');
      return data;
    },
  });

  const { mutate: savePreferences, isPending: saving, error } = useMutation({
    mutationFn: async (newPreferences: UserPreferences) => {
      const { data } = await axios.post<UserPreferences>('/api/preferences', newPreferences);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferences'] });
    }
  });

  return {
    preferences,
    saving,
    error: error ? (error instanceof Error ? error.message : 'Failed to save preferences') : null,
    savePreferences,
  };
};