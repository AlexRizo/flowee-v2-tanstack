import { z } from "zod";

export const createBoardSchema = z.object({
  name: z
    .string({
      error: 'El nombre es obligatorio',
    })
    .min(1, 'El nombre es obligatorio'),
  slug: z
    .string({
      error: 'El slug es obligatorio',
    })
    .min(1, 'El slug es obligatorio')
    .regex(
      /^[a-z0-9-]+$/,
      'El slug solo puede contener letras minúsculas, números y guiones',
    ),
  prefix: z
    .string({
      error: 'El prefijo es obligatorio',
    })
    .uppercase('El prefijo debe estar en mayúsculas')
    .min(1, 'El prefijo es obligatorio')
    .max(2, 'El prefijo debe tener 2 caracteres como máximo'),
  color: z
    .string({
      error: 'El color es obligatorio',
    })
    .min(1, 'El color es obligatorio'),
})