import type { ApiError } from '@/lib/api/api'
import {
  createDelivery,
  createVersion,
  getTaskDeliveries,
} from '@/lib/api/deliveries'
import type {
  CreateDeliveryDTO,
  CreateVersionDTO as CreateVersionDTOInterface,
  CheckVersionDTO,
  Delivery,
  Version,
} from '@/lib/api/interfaces/deliveries.interface'
import { checkVersion } from '@/lib/api/versions'
import { useTaskViewStore } from '@/store/taskViewStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface CreateVersionDTO extends CreateVersionDTOInterface {
  taskId?: string
}

export const useDeliveries = (taskId?: string) => {
  const queryClient = useQueryClient()
  const { task } = useTaskViewStore()

  const deliveriesQuery = useQuery<Delivery[], ApiError>({
    queryKey: ['deliveries', taskId],
    queryFn: () => getTaskDeliveries(taskId!),
    enabled: !!taskId,
  })

  const createDeliveryMutation = useMutation<
    Delivery,
    ApiError,
    CreateDeliveryDTO
  >({
    mutationFn: createDelivery,
    onSuccess: (delivery, dto) => {
      queryClient.setQueryData(
        ['deliveries', dto.taskId],
        (oldData: Delivery[]) => {
          if (!oldData) return []
          return [...oldData, delivery]
        },
      )
      toast.success('Entrega creada exitosamente')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const createVersionMutation = useMutation<
    Version,
    ApiError,
    CreateVersionDTO
  >({
    mutationFn: createVersion,
    onSuccess: (version, dto) => {
      const taskId = dto.taskId

      if (!taskId) {
        queryClient.invalidateQueries({
          queryKey: ['deliveries'],
        })
        return
      }

      queryClient.setQueryData(
        ['deliveries', taskId],
        (oldData: Delivery[]) => {
          if (!oldData) return []
          const delivery = oldData.find((d) => d.id === dto.deliveryId)
          if (!delivery) return oldData
          delivery.versions = [...delivery.versions, version]
          return [...oldData, delivery]
        },
      )
      toast.success('Version creada exitosamente')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const checkVersionMutation = useMutation<Version, ApiError, CheckVersionDTO>({
    mutationFn: checkVersion,
    onSuccess: (version) => {
      const taskId = task?.id

      toast.success('Version revisada exitosamente')

      if (!taskId) {
        queryClient.invalidateQueries({
          queryKey: ['deliveries'],
        })
        return
      }

      queryClient.setQueryData(
        ['deliveries', taskId],
        (oldData: Delivery[]) => {
          if (!oldData) return []

          return oldData.map((delivery) => {
            if (delivery.id !== version.deliveryId) return delivery

            return {
              ...delivery,
              versions: delivery.versions.map((v) =>
                v.id === version.id ? version : v,
              ),
            }
          })
        },
      )
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    deliveriesQuery,
    createDelivery: createDeliveryMutation,
    createVersion: createVersionMutation,
    checkVersion: checkVersionMutation,
  }
}
