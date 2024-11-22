import { useState, useEffect } from 'react'
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

// Hardcoded initial data
const initialTopics: Topic[] = [
  {
    id: '1',
    label: 'Physics',
    icon: '⚛️',
    color: '#FF5733'
  },
  {
    id: '2', 
    label: 'Chemistry',
    icon: '🧪',
    color: '#33FF57'
  },
  {
    id: '3',
    label: 'Astronomy',
    icon: '🔭',
    color: '#3357FF'
  }
]

const initialExhibits: Exhibit[] = [
  {
    id: '1',
    title: 'Gravity Well',
    description: 'Experience how mass warps spacetime',
    image: '/exhibits/gravity-well.jpg',
    category: 'Physics',
    details: {
      elementary: 'Drop balls and watch them spin!',
      'middle-school': 'Observe how objects move in curved spacetime',
      'high-school': 'Study gravitational forces and orbital mechanics',
      college: 'Analyze geodesics in curved spacetime',
      expert: 'Explore Einstein field equations and general relativity'
    }
  },
  {
    id: '2',
    title: 'Chemical Reactions',
    description: 'Interactive chemistry demonstrations',
    image: '/exhibits/chemistry.jpg',
    category: 'Chemistry',
    details: {
      elementary: 'Watch colorful reactions',
      'middle-school': 'Learn about basic chemical reactions',
      'high-school': 'Study reaction rates and equilibrium',
      college: 'Analyze reaction mechanisms',
      expert: 'Research catalysis and kinetics'
    }
  }
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [topics, setTopics] = useState<Topic[]>(initialTopics)
  const [exhibits, setExhibits] = useState<Exhibit[]>(initialExhibits)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [newTopic, setNewTopic] = useState({
    id: '',
    label: '',
    icon: '',
    color: '#000000'
  })
  
  const [newExhibit, setNewExhibit] = useState({
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
      setTopics(topics.map(topic => 
        topic.id === editingId ? {...newTopic} : topic
      ))
    } else {
      setTopics([...topics, {...newTopic, id: String(topics.length + 1)}])
    }
    setNewTopic({ id: '', label: '', icon: '', color: '#000000' })
    setEditingId(null)
  }

  const handleSaveExhibit = () => {
    if (editingId) {
      setExhibits(exhibits.map(exhibit => 
        exhibit.id === editingId ? {...newExhibit} : exhibit
      ))
    } else {
      setExhibits([...exhibits, {...newExhibit, id: String(exhibits.length + 1)}])
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
      setTopics(topics.filter(topic => topic.id !== id))
    } else {
      setExhibits(exhibits.filter(exhibit => exhibit.id !== id))
    }
  }

  const handleEdit = (type: 'topic' | 'exhibit', id: string) => {
    setEditingId(id)
    if (type === 'topic') {
      const topic = topics.find(t => t.id === id)
      if (topic) setNewTopic(topic)
    } else {
      const exhibit = exhibits.find(e => e.id === id)
      if (exhibit) setNewExhibit(exhibit)
    }
  }

  return (
    <Box sx={{ py: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #0f1642 0%, #2a1650 50%, #3a1357 100%)' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ color: 'white', mb: 4 }}>
          Admin Dashboard
        </Typography>

        <Paper sx={{ 
          p: 3, 
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Tabs 
            value={activeTab} 
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{ mb: 3 }}
          >
            <Tab label="Topics" sx={{ color: 'white' }} />
            <Tab label="Exhibits" sx={{ color: 'white' }} />
          </Tabs>

          {activeTab === 0 && (
            <Box>
              <Stack spacing={2} sx={{ mb: 4 }}>
                <TextField
                  label="Label"
                  value={newTopic.label}
                  onChange={(e) => setNewTopic({...newTopic, label: e.target.value})}
                  sx={{ input: { color: 'white' }, label: { color: 'white' } }}
                />
                <TextField
                  label="Icon"
                  value={newTopic.icon}
                  onChange={(e) => setNewTopic({...newTopic, icon: e.target.value})}
                  sx={{ input: { color: 'white' }, label: { color: 'white' } }}
                />
                <TextField
                  label="Color"
                  type="color"
                  value={newTopic.color}
                  onChange={(e) => setNewTopic({...newTopic, color: e.target.value})}
                  sx={{ input: { color: 'white' }, label: { color: 'white' } }}
                />
                <Button variant="contained" onClick={handleSaveTopic}>
                  {editingId ? 'Update Topic' : 'Add Topic'}
                </Button>
              </Stack>

              <List>
                {topics.map((topic) => (
                  <ListItem 
                    key={topic.id}
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      mb: 1,
                      borderRadius: 1
                    }}
                  >
                    <ListItemText 
                      primary={`${topic.icon} ${topic.label}`}
                      sx={{ color: 'white' }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleEdit('topic', topic.id)} sx={{ color: 'white' }}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete('topic', topic.id)} sx={{ color: 'white' }}>
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
                  sx={{ input: { color: 'white' }, label: { color: 'white' } }}
                />
                <TextField
                  label="Description"
                  value={newExhibit.description}
                  onChange={(e) => setNewExhibit({...newExhibit, description: e.target.value})}
                  multiline
                  rows={2}
                  sx={{ input: { color: 'white' }, label: { color: 'white' } }}
                />
                <TextField
                  label="Category"
                  value={newExhibit.category}
                  onChange={(e) => setNewExhibit({...newExhibit, category: e.target.value})}
                  sx={{ input: { color: 'white' }, label: { color: 'white' } }}
                />
                <Button variant="contained" onClick={handleSaveExhibit}>
                  {editingId ? 'Update Exhibit' : 'Add Exhibit'}
                </Button>
              </Stack>

              <List>
                {exhibits.map((exhibit) => (
                  <ListItem
                    key={exhibit.id}
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      mb: 1,
                      borderRadius: 1
                    }}
                  >
                    <ListItemText
                      primary={exhibit.title}
                      secondary={exhibit.description}
                      sx={{ 
                        '& .MuiListItemText-primary': { color: 'white' },
                        '& .MuiListItemText-secondary': { color: 'rgba(255, 255, 255, 0.7)' }
                      }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleEdit('exhibit', exhibit.id)} sx={{ color: 'white' }}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete('exhibit', exhibit.id)} sx={{ color: 'white' }}>
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
