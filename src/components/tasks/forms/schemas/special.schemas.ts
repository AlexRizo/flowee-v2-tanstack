import { Priority } from '@/lib/api/interfaces/tasks.interface'
import { z } from 'zod'

export const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 Mb
export const FILES_COUNT_LIMIT = 5
export const DEFAULT_MIME_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/webp',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'officedocument.wordprocessingml.document',
  'application/zip',
]

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
  referenceFiles: z
    .array(z.instanceof(File))
    .max(FILES_COUNT_LIMIT, `Máximo ${FILES_COUNT_LIMIT} archivos permitidos`)
    .refine(
      (files) => files.every((file) => file.size <= DEFAULT_MAX_FILE_SIZE),
      {
        message: `El tamaño máximo por archivo es de ${DEFAULT_MAX_FILE_SIZE / (1024 * 1024)} Mb`,
      },
    )
    .refine(
      (files) => files.every((file) => DEFAULT_MIME_TYPES.includes(file.type)),
      {
        message: 'Algunos archivos tienen un formato no permitido',
      },
    ),
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
    .max(FILES_COUNT_LIMIT, `Máximo ${FILES_COUNT_LIMIT} archivos permitidos`)
    .refine(
      (files) => files.every((file) => file.size <= DEFAULT_MAX_FILE_SIZE),
      {
        message: `El tamaño máximo por archivo es de ${DEFAULT_MAX_FILE_SIZE / (1024 * 1024)} Mb`,
      },
    )
    .refine(
      (files) =>
        files.every((file) => {
          return DEFAULT_MIME_TYPES.includes(file.type)
        }),
      {
        message: 'Algunos archivos tienen un formato no permitido',
      },
    ),
  // .min(1, 'Los archivos son obligatorios'),
})
