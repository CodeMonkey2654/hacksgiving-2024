import TourPage from '../pages/tour-page'
import { createFileRoute } from '@tanstack/react-router'
import { PulseLoader } from 'react-spinners'
import { Box } from '@mui/material'

const fetchExhibit = async (exhibitId: string) => {
  // This would typically be an API call
  const exhibits: Record<
    string,
    {
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
  > = {
    '1': {
      id: '1',
      title: 'Quantum Mysteries',
      description:
        'Explore the fascinating world of quantum mechanics through interactive demonstrations',
      image: '⚛️',
      category: 'Physics',
      details: {
        elementary:
          'Tiny things act very strangely! Sometimes they can be in two places at once.',
        'middle-school':
          'Quantum mechanics describes how very small particles behave in ways that seem impossible.',
        'high-school':
          'Quantum mechanics is a fundamental theory that describes nature at the atomic and subatomic scale.',
        college:
          'Quantum mechanics mathematically describes the wave-particle duality and quantum superposition of matter.',
        expert:
          'Quantum mechanics encompasses phenomena like entanglement, superposition, and wave function collapse.',
      },
    },
    '2': {
      id: '2',
      title: 'Chemical Reactions Lab',
      description:
        'Witness spectacular chemical transformations and understand the principles behind them',
      image: '🧪',
      category: 'Chemistry',
      details: {
        elementary: 'Watch as we mix things together to make new things!',
        'middle-school':
          'Chemical reactions happen when substances combine to form new substances.',
        'high-school':
          "We'll explore different types of reactions like synthesis, decomposition, and redox.",
        college:
          'Study reaction kinetics, equilibrium constants, and reaction mechanisms.',
        expert:
          'Advanced topics include transition state theory and reaction coordinate analysis.',
      },
    },
    '3': {
      id: '3',
      title: 'DNA & Life',
      description:
        'Discover the building blocks of life and how genetics shapes our world',
      image: '🧬',
      category: 'Biology',
      details: {
        elementary:
          'DNA is like a recipe book that tells our bodies how to grow!',
        'middle-school':
          'DNA contains the instructions for making all living things and passing traits to offspring.',
        'high-school':
          'DNA is a double helix structure that carries genetic information through base pairs.',
        college:
          'Explore DNA replication, transcription, translation and genetic regulation.',
        expert:
          'Advanced topics include epigenetics, gene editing, and molecular evolution.',
      },
    },
    '4': {
      id: '4',
      title: 'Cosmic Journey',
      description:
        'Travel through space and time to explore the wonders of our universe',
      image: '🔭',
      category: 'Astronomy',
      details: {
        elementary:
          'Space is full of amazing things like stars, planets, and galaxies!',
        'middle-school':
          'Our universe is vast and contains billions of galaxies, each with billions of stars.',
        'high-school':
          'Learn about stellar evolution, planetary formation, and cosmic structures.',
        college:
          'Study astrophysics, cosmology, and the fundamental forces of the universe.',
        expert:
          'Advanced topics include dark matter, dark energy, and quantum gravity theories.',
      },
    },
  }

  return exhibits[exhibitId]
}

export const Route = createFileRoute('/exhibit/$exhibitId')({
  loader: ({ params }) => fetchExhibit(params.exhibitId),
  component: ExhibitComponent,
})

function ExhibitComponent() {
  const data = Route.useLoaderData()

  if (!data) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <PulseLoader color="#1976d2" />
      </Box>
    )
  }

  return <TourPage exhibit={data} />
}
