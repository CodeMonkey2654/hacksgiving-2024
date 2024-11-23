import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './config';

// Topics
export const useTopics = () => {
  return useQuery({
    queryKey: ['topics'],
    queryFn: () => apiClient.get('/topics').then(res => res.data)
  });
};

export const useCreateTopic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (topic: TopicCreate) => apiClient.post('/topics', topic),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    }
  });
};

export const useUpdateTopic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, topic }: { id: string, topic: TopicCreate }) => 
      apiClient.put(`/topics/${id}`, topic),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    }
  });
};

export const useDeleteTopic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/topics/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    }
  });
};

// Exhibits
export const useExhibits = () => {
  return useQuery({
    queryKey: ['exhibits'],
    queryFn: () => apiClient.get('/exhibits').then(res => res.data)
  });
};

export const useExhibit = (id: string) => {
  return useQuery({
    queryKey: ['exhibits', id],
    queryFn: () => apiClient.get(`/exhibits/${id}`).then(res => res.data),
    enabled: !!id
  });
};

export const useCreateExhibit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (exhibit: ExhibitCreate) => apiClient.post('/exhibits', exhibit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exhibits'] });
    }
  });
};

export const useUpdateExhibit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, exhibit }: { id: string, exhibit: ExhibitCreate }) => 
      apiClient.put(`/exhibits/${id}`, exhibit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exhibits'] });
    }
  });
};

export const useDeleteExhibit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/exhibits/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exhibits'] });
    }
  });
};

// Users
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.get('/users').then(res => res.data)
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => apiClient.get(`/users/${id}`).then(res => res.data),
    enabled: !!id
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: UserCreate) => apiClient.post('/users', user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};

// Visits
export const useRecordVisit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (visit: VisitCreate) => apiClient.post('/visits', visit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] });
    }
  });
};

export const useUserVisits = (userId: string) => {
  return useQuery({
    queryKey: ['visits', 'user', userId],
    queryFn: () => apiClient.get(`/visits/users/${userId}`).then(res => res.data),
    enabled: !!userId
  });
};

export const useExhibitVisits = (exhibitId: string) => {
  return useQuery({
    queryKey: ['visits', 'exhibit', exhibitId],
    queryFn: () => apiClient.get(`/visits/exhibits/${exhibitId}`).then(res => res.data),
    enabled: !!exhibitId
  });
};

// Recommendations
export const useRecommendations = (userId: string, k: number = 3) => {
  return useQuery({
    queryKey: ['recommendations', userId],
    queryFn: () => apiClient.get(`/recommendations/user/${userId}?k=${k}`).then(res => res.data),
    enabled: !!userId
  });
};

// Chat
export const useSendMessage = () => {
  return useMutation({
    mutationFn: (message: { session_id: string, user_input: string, language: string }) => 
      apiClient.post('/chat/message', message)
  });
};