import TourPage from '../pages/tour-page'
import { createFileRoute } from '@tanstack/react-router'
import CogSpinner from '../components/CogSpinner'
import { Box } from '@mui/material'
import { useExhibit} from '../api/queries'
import { useUser } from '../contexts/UserContext'

export const Route = createFileRoute('/exhibit/$exhibitId')({
  component: ExhibitComponent,
})

function ExhibitComponent() {
  const { exhibitId } = Route.useParams()
  const { data: exhibit, isLoading } = useExhibit(exhibitId)
  const { userId } = useUser()

  if (isLoading || !exhibit) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
          width: '100%',
          background: 'var(--background-gradient)',
        }}
      >
        <CogSpinner />
      </Box>
    )
  }

  return <TourPage exhibitId={exhibit.id} userId={userId} />
}
