import { Role } from '@/lib/api/interfaces/auth.interface'

export const getUserStatus = (isActive: boolean): 'Activo' | 'Inactivo' => {
  return isActive ? 'Activo' : 'Inactivo'
}

enum EspRole {
  SUPER_ADMIN = 'Administrador+',
  ADMIN = 'Administrador',
  READER = 'Lector',
  DESIGNER_ADMIN = 'Gerente de Diseño',
  DESIGNER = 'Diseñador',
  PUBLISHER_ADMIN = 'Gerente de Solicitantes',
  PUBLISHER = 'Solicitante',
  UNDEFINED = 'Desconocido',
}

export const getUserRole = (role: Role): EspRole => {
  switch (role) {
    case Role.SUPER_ADMIN:
      return EspRole.SUPER_ADMIN
    case Role.ADMIN:
      return EspRole.ADMIN
    case Role.READER:
      return EspRole.READER
    case Role.DESIGNER_ADMIN:
      return EspRole.DESIGNER_ADMIN
    case Role.DESIGNER:
      return EspRole.DESIGNER
    case Role.PUBLISHER_ADMIN:
      return EspRole.PUBLISHER_ADMIN
    case Role.PUBLISHER:
      return EspRole.PUBLISHER
    default:
      return EspRole.UNDEFINED
  }
}
