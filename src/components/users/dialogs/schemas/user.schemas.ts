import { Role } from '@/lib/api/interfaces/auth.interface'
import { z } from 'zod'

export const createUserSchema = z.object({
  name: z
    .string({
      error: 'El nombre es obligatorio',
    })
    .min(1, 'El nombre es obligatorio'),
  email: z.email({
    message: 'El correo electrónico no es válido',
  }),
  username: z
    .string({
      error: 'El nombre de usuario es obligatorio',
    })
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .regex(/^[a-z0-9_-]+$/, {
      error:
        'El nombre de usuario solo puede contener letras minúsculas, números y guiones',
    }),
  password: z
    .string({
      error: 'La contraseña es obligatoria',
    })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,}$/, {
      error:
        'La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial',
    }),
  role: z.enum(Role, {
    error: 'El rol no es válido',
  }),
})

export const updateUserSchema = z.object({
  name: z
    .string({
      error: 'El nombre es obligatorio',
    })
    .optional(),
  email: z
    .email({
      message: 'El correo electrónico no es válido',
    })
    .optional(),
  username: z
    .string({
      error: 'El nombre de usuario es obligatorio',
    })
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .regex(/^[a-z0-9_-]+$/, {
      error:
        'El nombre de usuario solo puede contener letras minúsculas, números y guiones',
    })
    .optional(),
  password: z
    .string({
      error: 'La contraseña es obligatoria',
    })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,}$/, {
      error:
        'La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial',
    })
    .optional(),
  role: z
    .enum(Role, {
      error: 'El rol no es válido',
    })
    .optional(),
})
