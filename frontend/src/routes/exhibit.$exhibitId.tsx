import TourPage from '../pages/tour-page'
import { createFileRoute } from '@tanstack/react-router'
import { PulseLoader } from 'react-spinners'
import { Box } from '@mui/material'
import { useExhibit } from '../api/queries'

interface ExhibitDetails {
  text: string
  intended_age: string
  difficulty: string
  gs_assistance: string
  popularity: string
  visitor_duration: string
}

interface Exhibit {
  id: string
  title: string
  description: string
  image: string
  details: ExhibitDetails
}

export const Route = createFileRoute('/exhibit/$exhibitId')({
  component: ExhibitComponent,
})

function ExhibitComponent() {
  const { exhibitId } = Route.useParams()
  const { data: exhibit, isLoading } = useExhibit(exhibitId)

  if (isLoading || !exhibit) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'var(--background-gradient)',
        }}
      >
        <PulseLoader color="var(--secondary)" />
      </Box>
    )
  }

  return <TourPage exhibitId={exhibit.id} userId="1" />
}
