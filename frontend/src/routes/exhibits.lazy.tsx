import { createLazyFileRoute } from '@tanstack/react-router'
import ExhibitsPage from '../pages/exhibits-page'

export const Route = createLazyFileRoute('/exhibits')({
  component: ExhibitsPage,
})
