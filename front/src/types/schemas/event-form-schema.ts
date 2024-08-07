import { z } from 'zod'

export const formSchema = z.object({
  eventName: z
    .string()
    .min(3, {
      message: 'O nome do evento deve ter no mínimo 3 caracteres'
    })
    .max(50, {
      message: 'O nome do evento deve ter no máximo 50 caracteres'
    }),
  description: z.string().max(200, {
    message: 'A descrição do evento deve ter no máximo 200 caracteres'
  }),
  notEarlier: z.string().regex(/^(2[0-3]|1[0-9]|[0-9])$/, {
    message: 'O horário deve ser entre 0 e 23'
  }),
  notLater: z.string().regex(/^(2[0-3]|1[0-9]|[0-9])$/, {
    message: 'O horário deve ser entre 0 e 23'
  }),
  dates: z.array(z.date()).nonempty({
    message: 'Selecione ao menos uma data'
  }),
  timezone: z.string().regex(/^-?(0|1[0-2]|[1-9])$/, {
    message: 'A timezone deve ser um número entre -12 e 12'
  })
})

export type FormEventValues = z.infer<typeof formSchema>
