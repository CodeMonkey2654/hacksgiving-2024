import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

// Topics
export const useTopics = () => {
  return useQuery({
    queryKey: ['topics'],
    queryFn: () => axios.get(`${API_URL}/topics`).then(res => res.data)
  })
}

export const useCreateTopic = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (topic) => axios.post(`${API_URL}/topics`, topic),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] })
    }
  })
}

export const useUpdateTopic = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (topic) => axios.put(`${API_URL}/topics/${topic.id}`, topic),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] })
    }
  })
}

export const useDeleteTopic = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => axios.delete(`${API_URL}/topics/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] })
    }
  })
}

// Exhibits
export const useExhibits = () => {
  return useQuery({
    queryKey: ['exhibits'],
    queryFn: () => axios.get(`${API_URL}/exhibits`).then(res => res.data)
  })
}

export const useExhibit = (id: string) => {
  return useQuery({
    queryKey: ['exhibits', id],
    queryFn: () => axios.get(`${API_URL}/exhibits/${id}`).then(res => res.data)
  })
}

export const useCreateExhibit = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (exhibit) => axios.post(`${API_URL}/exhibits`, exhibit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exhibits'] })
    }
  })
}

export const useUpdateExhibit = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (exhibit) => axios.put(`${API_URL}/exhibits/${exhibit.id}`, exhibit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exhibits'] })
    }
  })
}

export const useDeleteExhibit = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => axios.delete(`${API_URL}/exhibits/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exhibits'] })
    }
  })
}