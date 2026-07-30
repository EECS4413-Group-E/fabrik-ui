import { createFileRoute } from '@tanstack/react-router'
import LoginPage from './-components/LoginPage'

export const Route = createFileRoute('/login')({
  staticData: {
    hideChat: true,
  },
  component: LoginPage,
})
