import { Priority } from '@/lib/api/interfaces/tasks.interface'
import { z } from 'zod'

export const generalInfoSchema = z.object({
  title: z
    .string({
      error: 'Ingresa un valor válido',
    })
    .min(1, 'El título es obligatorio'),
  boardId: z
    .string({
      error: 'Selecciona un tablero válido',
    })
    .min(1, 'Selecciona un tablero'),
  dueDate: z.date({
    error: 'Selecciona una fecha válida',
  }),
  priority: z.enum(Priority, {
    error: 'La prioridad no es válida',
  }),
})

export const descriptionAndRefSchema = z.object({
  description: z
    .string({
      error: 'Ingresa un valor válido',
    })
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(1000, 'La descripción debe tener como máximo 1000 caracteres'),
  referenceFiles: z.array(z.instanceof(File)).optional(),
})

export const technicalDetailsSchema = z.object({
  size: z
    .string({
      error: 'Ingresa un valor válido',
    })
    .min(1, 'Las medidas son obligatorias'),
  legals: z
    .string({
      error: 'Ingresa un valor válido',
    })
    .optional(),
  requiredFiles: z
    .array(z.instanceof(File))
    // .min(1, 'Los archivos son obligatorios'),
})
