import { z } from 'zod'

export const createDeliverySchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  taskId: z.string().min(1, 'El id de la tarea es requerido'),
})

export const createVersionSchema = z.object({
  description: z
    .string()
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(30, 'La descripción debe tener menos de 30 caracteres'),
  file: z.instanceof(File, { error: 'El archivo es requerido' }),
  deliveryId: z.string().min(1, 'El id de la entrega es requerido'),
})
