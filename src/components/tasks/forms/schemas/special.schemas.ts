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
