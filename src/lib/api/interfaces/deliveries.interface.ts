export enum VersionStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
}

export interface Version {
  id: string
  description: string
  status: VersionStatus
  comment?: string
  attachment: string
  createdAt: string
  updatedAt: string
  deliveryId: string
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

export interface CheckVersionDTO {
  versionId: string
  comment: string
  status: VersionStatus
}
