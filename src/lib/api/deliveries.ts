import { apiGet, apiPost } from './api'
import type {
  CreateDeliveryDTO,
  CreateVersionDTO,
  Delivery,
  Version,
} from './interfaces/deliveries.interface'

export const getTaskDeliveries = async (taskId: string) => {
  return await apiGet<Delivery[]>(`tasks/${taskId}/deliveries`)
}

export const createDelivery = async ({ taskId, name }: CreateDeliveryDTO) => {
  return await apiPost<Delivery>(`tasks/${taskId}/deliveries`, { name })
}

export const createVersion = async ({
  deliveryId,
  description,
  file,
}: CreateVersionDTO) => {
  const formData = new FormData()
  formData.append('description', description)
  formData.append('file', file)

  return await apiPost<Version>(`deliveries/${deliveryId}/versions`, formData)
}
