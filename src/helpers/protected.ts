import { Role } from '@/lib/api/interfaces/auth.interface'

const adminRoles = [Role.SUPER_ADMIN, Role.ADMIN, Role.READER]

export const isAdmin = (userRole: Role) => {
  return adminRoles.includes(userRole)
}

export const isManager = (userRole: Role) => {
  const managerRoles = [
    ...adminRoles,
    Role.DESIGNER_ADMIN,
    Role.PUBLISHER_ADMIN,
  ]

  return managerRoles.includes(userRole)
}

export const isDesigner = (userRole: Role) => {
  const designerRoles = [...adminRoles, Role.DESIGNER_ADMIN, Role.DESIGNER]

  return designerRoles.includes(userRole)
}

export const isPublisher = (userRole: Role) => {
  const publisherRoles = [...adminRoles, Role.PUBLISHER_ADMIN, Role.PUBLISHER]

  return publisherRoles.includes(userRole)
}

export const isPublisherAndDesignerManager = (userRole: Role) => {
  const publisherAndDesignerManagerRoles = [
    ...adminRoles,
    Role.PUBLISHER_ADMIN,
    Role.DESIGNER_ADMIN,
    Role.PUBLISHER,
  ]

  return publisherAndDesignerManagerRoles.includes(userRole)
}
