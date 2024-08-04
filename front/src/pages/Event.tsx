import { AnimatedBalls } from '@/components/animated-balls'
import { PeriodSelector } from '@/components/period-selector'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { LoadingSpin } from '@/components/ui/loading-spin'
import { useEvent } from '@/hooks/use-event'
// import { useParams } from 'react-router-dom'

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'O nome do usuário é obrigatório'
    })
    .max(50, {
      message: 'O nome do usuário deve ter no máximo 50 caracteres'
    }),
  password: z.string().optional()
})

type FormValues = z.infer<typeof formSchema>

export function Event() {
  // const { id } = useParams()
  const { isLogged, setIsLogged, setPaintedDivs } = useEvent()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<string[]>([
    'Enzo Sakamoto',
    'Pedro Soller',
    'João Pedro',
    'Gabriel'
  ])

  const mockDates: Date[] = [
    '2024-07-12T03:00:00.000Z',
    '2024-07-11T03:00:00.000Z',
    '2024-07-10T03:00:00.000Z',
    '2024-07-09T03:00:00.000Z',
    '2024-07-13T03:00:00.000Z',
    '2024-07-14T03:00:00.000Z',
    '2024-07-15T03:00:00.000Z'
  ].map((date) => new Date(date))

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUsers((prev) => [...prev, values.username])
    console.log(values)
    setIsLogged(true)
    setIsDialogOpen(false)
    setIsLoading(false)
  }

  const handleReset = () => {
    setPaintedDivs({})
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })
  return (
    <main className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <AnimatedBalls />
      <div className="flex gap-4">
        <PeriodSelector
          dates={mockDates}
          notEarlierThan={8}
          notLaterThan={18}
          timezone={-3}
        />
        <div className="flex flex-col gap-4">
          <Card className="h-auto w-72">
            <CardHeader>
              <CardTitle>Usuários ({users.length})</CardTitle>
              <CardContent className="flex flex-col gap-1 p-0 pt-4">
                {users.map((name, index) => (
                  <p key={index}>{name}</p>
                ))}
              </CardContent>
            </CardHeader>
          </Card>
          <div className="flex items-start justify-start gap-2">
            {isLogged && (
              <Button variant="outline" disabled={!isLogged}>
                Salvar
              </Button>
            )}
            {!isLogged && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Editar</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Registre ou logue com seu usuário</DialogTitle>
                    <DialogDescription>
                      Usando pela primeira vez? Digite um nome de usuário a ser
                      exibido e uma senha (opcional)
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form className="space-y-3">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do usuário</FormLabel>
                            <FormControl>
                              <Input placeholder="Pedro Soller" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormDescription>
                              A senha é opcional, mas recomendada
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                  <DialogFooter>
                    <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                      {isLoading ? <LoadingSpin /> : 'Enviar'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <Button
              variant="destructive"
              onClick={handleReset}
              disabled={!isLogged}
            >
              Limpar
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
