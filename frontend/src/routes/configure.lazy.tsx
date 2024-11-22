import { createLazyFileRoute } from '@tanstack/react-router'
import ConfigurePage from '../pages/configure-page'

export const Route = createLazyFileRoute('/configure')({
  component: ConfigurePage,
})
