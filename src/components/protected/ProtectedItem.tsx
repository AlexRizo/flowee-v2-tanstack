import {
  isAdmin,
  isDesigner,
  isManager,
  isPublisher,
  isPublisherAndDesignerManager,
} from '@/helpers/protected'
import { useAuth } from '@/hooks/useAuth'

type Role =
  | 'admins'
  | 'managers'
  | 'designers'
  | 'publishers'
  | 'pub-des-manager'

interface Props {
  children: React.ReactNode
  role: Role
}

export const ProtectedItem = ({ children, role }: Props) => {
  const { user } = useAuth()

  // 1. Manejar el usuario no autenticado primero
  if (!user) return null

  // 2. Determinar si está permitido directamente
  const isAllowed = (() => {
    switch (role) {
      case 'admins':
        return isAdmin(user.role)
      case 'managers':
        return isManager(user.role)
      case 'designers':
        return isDesigner(user.role)
      case 'publishers':
        return isPublisher(user.role)
      case 'pub-des-manager':
        return isPublisherAndDesignerManager(user.role)
      default:
        return false
    }
  })()

  return isAllowed ? <>{children}</> : null
}
