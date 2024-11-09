import { z } from 'zod'

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'O nome do usuário é obrigatório'
    })
    .max(50, {
      message: 'O nome do usuário deve ter no máximo 50 caracteres'
    }),
  password: z.string().optional(),
  eventId: z.string().uuid()
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
