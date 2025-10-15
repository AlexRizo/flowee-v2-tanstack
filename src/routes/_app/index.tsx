import { useAuth } from '@/hooks/useAuth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({
  component: Home,
})

function Home() {
  const { user } = useAuth()

  return (
    <section>
      <h1>Bienvenido, {user?.name}</h1>
      <p>Usuario: {user?.username}</p>
      <p>Correo: {user?.email}</p>
      <p>Rol: {user?.role}</p>
    </section>
  )
}
