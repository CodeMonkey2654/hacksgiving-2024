import { useState } from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Stack,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material'
import { Delete, Edit, Save, Cancel } from '@mui/icons-material'
import { useTopics, useCreateTopic, useExhibits, useCreateExhibit, useUpdateTopic, useUpdateExhibit, useDeleteTopic, useDeleteExhibit } from '../api/queries'

interface Topic {
  id: string
  label: string
  icon: string
  color: string
}

interface Exhibit {
  id: string
  title: string
  description: string
  image: string
  category: string
  details: {
    elementary: string
    'middle-school': string
    'high-school': string
    college: string
    expert: string
  }
}

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState(0)
    const [editingId, setEditingId] = useState<string | null>(null)
    
    const { data: topics = [] } = useTopics()
    const { data: exhibits = [] } = useExhibits()
    const createTopic = useCreateTopic()
    const updateTopic = useUpdateTopic()
    const deleteTopic = useDeleteTopic()
    const createExhibit = useCreateExhibit()
    const updateExhibit = useUpdateExhibit()
    const deleteExhibit = useDeleteExhibit()
    
    const [newTopic, setNewTopic] = useState<Topic>({
      id: '',
      label: '',
      icon: '',
      color: '#000000'
    })
    
    const [newExhibit, setNewExhibit] = useState<Exhibit>({
      id: '',
      title: '',
      description: '',
      image: '',
      category: '',
      details: {
        elementary: '',
        'middle-school': '',
        'high-school': '',
        college: '',
        expert: ''
      }
    })
  
    const handleSaveTopic = () => {
      if (editingId) {
        updateTopic.mutate({ id: editingId, ...newTopic })
      } else {
        createTopic.mutate(newTopic)
      }
      setNewTopic({ id: '', label: '', icon: '', color: '#000000' })
      setEditingId(null)
    }
  
    const handleSaveExhibit = () => {
      if (editingId) {
        updateExhibit.mutate({ id: editingId, ...newExhibit })
      } else {
        createExhibit.mutate(newExhibit)
      }
      setNewExhibit({
        id: '',
        title: '',
        description: '',
        image: '',
        category: '',
        details: {
          elementary: '',
          'middle-school': '',
          'high-school': '',
          college: '',
          expert: ''
        }
      })
      setEditingId(null)
    }

    const handleDelete = (type: 'topic' | 'exhibit', id: string) => {
      if (type === 'topic') {
        deleteTopic.mutate(id)
      } else {
        deleteExhibit.mutate(id)
      }
    }
  
    const handleEdit = (type: 'topic' | 'exhibit', id: string) => {
      setEditingId(id)
      if (type === 'topic') {
        const topic = topics.find((t: Topic) => t.id === id)
        if (topic) setNewTopic(topic)
      } else {
        const exhibit = exhibits.find((e: Exhibit) => e.id === id)
        if (exhibit) setNewExhibit(exhibit)
      }
    }
  
    return (
      <Box sx={{ 
        py: 4, 
        minHeight: '100vh', 
        background: 'var(--background-gradient)' 
      }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ color: 'var(--text-color)', mb: 4 }}>
            Admin Dashboard
          </Typography>
  
          <Paper sx={{ 
            p: 3, 
            background: 'var(--paper-bg)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            border: '1px solid var(--paper-border)'
          }}>
            <Tabs 
              value={activeTab} 
              onChange={(_, newValue) => setActiveTab(newValue)}
              sx={{ mb: 3 }}
            >
              <Tab label="Topics" sx={{ color: 'var(--text-color)' }} />
              <Tab label="Exhibits" sx={{ color: 'var(--text-color)' }} />
            </Tabs>
  
            {activeTab === 0 && (
              <Box>
                <Stack spacing={2} sx={{ mb: 4 }}>
                  <TextField
                    label="Label"
                    value={newTopic.label}
                    onChange={(e) => setNewTopic({...newTopic, label: e.target.value})}
                    sx={{ 
                      input: { color: 'var(--text-color)' }, 
                      label: { color: 'var(--text-color)' } 
                    }}
                  />
                  <TextField
                    label="Icon"
                    value={newTopic.icon}
                    onChange={(e) => setNewTopic({...newTopic, icon: e.target.value})}
                    sx={{ 
                      input: { color: 'var(--text-color)' }, 
                      label: { color: 'var(--text-color)' } 
                    }}
                  />
                  <TextField
                    label="Color"
                    type="color"
                    value={newTopic.color}
                    onChange={(e) => setNewTopic({...newTopic, color: e.target.value})}
                    sx={{ 
                      input: { color: 'var(--text-color)' }, 
                      label: { color: 'var(--text-color)' } 
                    }}
                  />
                  <Button variant="contained" onClick={handleSaveTopic}>
                    {editingId ? 'Update Topic' : 'Add Topic'}
                  </Button>
                </Stack>
  
                <List>
                  {topics.map((topic: Topic) => (
                    <ListItem 
                      key={topic.id}
                      sx={{ 
                        bgcolor: 'var(--paper-bg)',
                        mb: 1,
                        borderRadius: 1
                      }}
                    >
                      <ListItemText 
                        primary={`${topic.icon} ${topic.label}`}
                        sx={{ color: 'var(--text-color)' }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          onClick={() => handleEdit('topic', topic.id)} 
                          sx={{ color: 'var(--text-color)' }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDelete('topic', topic.id)} 
                          sx={{ color: 'var(--text-color)' }}
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
  
            {activeTab === 1 && (
              <Box>
                <Stack spacing={2} sx={{ mb: 4 }}>
                  <TextField
                    label="Title"
                    value={newExhibit.title}
                    onChange={(e) => setNewExhibit({...newExhibit, title: e.target.value})}
                    sx={{ 
                      input: { color: 'var(--text-color)' }, 
                      label: { color: 'var(--text-color)' } 
                    }}
                  />
                  <TextField
                    label="Description"
                    value={newExhibit.description}
                    onChange={(e) => setNewExhibit({...newExhibit, description: e.target.value})}
                    multiline
                    rows={2}
                    sx={{ 
                      textarea: { color: 'var(--text-color)' }, 
                      label: { color: 'var(--text-color)' } 
                    }}
                  />
                  <TextField
                    label="Category"
                    value={newExhibit.category}
                    onChange={(e) => setNewExhibit({...newExhibit, category: e.target.value})}
                    sx={{ 
                      '& .MuiInputBase-input': { color: 'var(--text-color)' },
                      '& .MuiInputLabel-root': { color: 'var(--text-secondary)' },
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--paper-border)' }
                    }}
                  />
                  <Button variant="contained" onClick={handleSaveExhibit}>
                    {editingId ? 'Update Exhibit' : 'Add Exhibit'}
                  </Button>
                </Stack>
  
                <List>
                  {exhibits.map((exhibit: Exhibit) => (
                    <ListItem
                      key={exhibit.id}
                      sx={{ 
                        bgcolor: 'var(--paper-bg)',
                        mb: 1,
                        borderRadius: 1
                      }}
                    >
                      <ListItemText
                        primary={exhibit.title}
                        secondary={exhibit.description}
                        sx={{ 
                          '& .MuiListItemText-primary': { color: 'var(--text-color)' },
                          '& .MuiListItemText-secondary': { color: 'var(--text-color)', opacity: 0.7 }
                        }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          onClick={() => handleEdit('exhibit', exhibit.id)} 
                          sx={{ color: 'var(--text-color)' }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDelete('exhibit', exhibit.id)} 
                          sx={{ color: 'var(--text-color)' }}
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    )
  }