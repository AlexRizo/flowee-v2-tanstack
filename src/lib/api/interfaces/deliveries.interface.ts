export enum VersionStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
}

export interface Version {
  id: string
  description: string
  status: VersionStatus
  attachment: string
  createdAt: string
  updatedAt: string
}

export interface Delivery {
  id: string
  name: string
  taskId: string
  versions: Version[]
  createdAt: string
  updatedAt: string
}

export interface CreateDeliveryDTO {
  taskId: string
  name: string
}

export interface CreateVersionDTO {
  deliveryId: string
  description: string
  file: File
}
