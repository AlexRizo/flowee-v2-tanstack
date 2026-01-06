import { VersionStatus } from '@/lib/api/interfaces/deliveries.interface'

export const getVersionStatus = (status: VersionStatus) => {
  switch (status) {
    case VersionStatus.PENDING:
      return 'Pendiente'
    case VersionStatus.REJECTED:
      return 'Rechazada'
    case VersionStatus.ACCEPTED:
      return 'Aceptada'
  }
}
