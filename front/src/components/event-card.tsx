import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useEvent } from '@/hooks/use-event'
import { useToast } from '@/components/ui/use-toast'

const hours = Array.from({ length: 24 }, (_, i) => i)
const timezones = Array.from({ length: 25 }, (_, i) => i - 12)

const formSchema = z.object({
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
  notEarlierThan: z.string().regex(/^(2[0-3]|1[0-9]|[0-9])$/, {
    message: 'O horário deve ser entre 0 e 23'
  }),
  notLaterThan: z.string().regex(/^(2[0-3]|1[0-9]|[0-9])$/, {
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

export function EventCard() {
  const { createEvent } = useEvent()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (values: FormEventValues) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      const { data } = await createEvent(values)
      toast({
        title: 'Evento criado com sucesso',
        description: `O evento ${data?.name} foi criado com sucesso`
      })
      form.reset()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ocorreu um erro ao criar o evento',
        description: `Erro: ${(error as Error).message}`
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearAllFields = () => {
    form.reset()
  }

  const form = useForm<FormEventValues>({
    resolver: zodResolver(formSchema),
    disabled: isLoading,
    defaultValues: {
      eventName: '',
      description: '',
      notEarlierThan: '8',
      notLaterThan: '18',
      dates: [],
      timezone: '-3'
    },
    mode: 'onBlur'
  })
  return (
    <Card className="transition-all duration-500">
      <CardHeader>
        <CardTitle>Criar evento</CardTitle>
        <CardDescription>Crie seu evento em um clique.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="eventName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do evento</FormLabel>
                    <FormControl>
                      <Input
                        id="eventName"
                        className="transition-all duration-500"
                        placeholder="Ex: Daily do projeto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição do evento (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        placeholder="Ex: Reunião de alinhamento diária do projeto"
                        className="resize-none transition-all duration-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Label htmlFor="notEarlier" className="translate-y-1">
                Qual será o horário de trabalho?
              </Label>
              <div className="flex justify-between gap-3">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="notEarlierThan"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger
                              id="notEarlierThan"
                              className="transition-all duration-500"
                            >
                              <SelectValue placeholder="08:00" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {hours.map((hour) => {
                                const hourFormatted = `${hour.toString().padStart(2, '0')}:00`
                                return (
                                  <SelectItem
                                    key={hour}
                                    value={hour.toString()}
                                  >
                                    {hourFormatted}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center text-[15px]">até</div>
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="notLaterThan"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger
                              id="notLaterThan"
                              className="transition-all duration-500"
                            >
                              <SelectValue placeholder="18:00" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {hours.map((hour) => {
                                const hourFormatted = `${hour.toString().padStart(2, '0')}:00`
                                return (
                                  <SelectItem
                                    key={hour}
                                    value={hour.toString()}
                                  >
                                    {hourFormatted}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="dates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Datas</FormLabel>
                    <FormControl>
                      <Calendar
                        numberOfMonths={2}
                        mode="multiple"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="flex justify-center rounded-md border transition-all duration-500"
                        disabled={{ before: new Date() }}
                        min={1}
                        max={7}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuso horário</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <SelectTrigger
                          id="notLaterThan"
                          className="transition-all duration-500"
                        >
                          <SelectValue placeholder="-03:00" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {timezones.map((timezone) => {
                            const timezoneFormatted =
                              timezone >= 0
                                ? `${timezone.toString().padStart(2, '0')}:00`
                                : `-${Math.abs(timezone).toString().padStart(2, '0')}:00`
                            return (
                              <SelectItem
                                key={timezone}
                                value={timezone.toString()}
                              >
                                {timezoneFormatted}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-around">
        <Button
          variant="outline"
          className="transition-all duration-500"
          onClick={clearAllFields}
        >
          Limpar
        </Button>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="transition-all duration-500"
          disabled={isLoading}
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-xl" />
          ) : (
            'Criar'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
