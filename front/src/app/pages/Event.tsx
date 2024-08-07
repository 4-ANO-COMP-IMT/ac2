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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { LoadingSpin } from '@/components/ui/loading-spin'
import { useEvent } from '@/hooks/use-event'
import {
  loginFormSchema,
  LoginFormValues
} from '@/types/schemas/login-form-schema'
import { useNavigate, useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import { MdContentCopy } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa6'
import { Event as EventType } from '@/types/event'
import { toast } from '@/components/ui/use-toast'

export function Event() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getEvent } = useEvent()
  const { isLogged, setIsLogged, setPaintedDivs } = useEvent()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [event, setEvent] = useState<EventType | null>(null)

  useEffect(() => {
    const handleEvent = async () => {
      if (id) {
        try {
          const response = await getEvent(id)
          setEvent({
            id: response.data?.id || '',
            name: response.data?.name || '',
            dates: response.data?.dates || [],
            notEarlier: response.data?.notEarlier
              ? response.data?.notEarlier / 1000 / 60 / 60
              : 8,
            notLater: response.data?.notLater
              ? response.data?.notLater / 1000 / 60 / 60
              : 18,
            members: response.data?.members || [],
            description: response.data?.description
          })
        } catch (error) {
          if ((error as AxiosError).response?.status === 404) {
            navigate('/404')
          } else {
            navigate('/')
          }
        }
      } else {
        navigate('/')
      }
    }

    handleEvent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // setUsers((prev) => [...prev, values.username])
    console.log(values)
    setIsLogged(true)
    setIsDialogOpen(false)
    setIsLoading(false)
  }

  const handleReset = () => {
    setPaintedDivs({})
  }

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  console.log(event?.dates)
  return (
    <main className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <AnimatedBalls />
      {event?.dates.length ? (
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="transform text-4xl font-bold transition-all duration-1000 sm:text-6xl lg:text-6xl">
            {event.name}
          </h1>
          <p className="mb-6 transform text-wrap text-lg lg:text-2xl">
            {event.description}
          </p>
          <div className="flex gap-4">
            <PeriodSelector
              dates={event?.dates}
              notEarlier={event.notEarlier}
              notLater={event.notLater}
              timezone={-3}
            />
            <div className="flex flex-col gap-4">
              <Card className="h-auto w-72">
                <CardHeader>
                  <CardTitle>Link do evento</CardTitle>
                  <CardContent className="flex gap-[2px] p-0 pt-4">
                    <Input
                      readOnly
                      value={`${window.origin}/event/${event.id}`}
                      className="bg-foreground/5 focus-visible:ring-0"
                    />
                    <Button
                      variant="ghost"
                      className={`transition-all duration-300 ${isCopied ? 'bg-green-100' : ''}`}
                      disabled={isCopied}
                      onClick={() => {
                        toast({
                          title: 'Link copiado',
                          description:
                            'Agora você pode compartilhar com seus amigos'
                        })
                        setIsCopied(true)
                        setTimeout(() => {
                          setIsCopied(false)
                        }, 1000)
                        navigator.clipboard.writeText(
                          `${window.origin}/event/${event.id}`
                        )
                      }}
                    >
                      {!isCopied ? (
                        <MdContentCopy
                          className={`text-xl duration-500 ${!isCopied ? 'opacity-100' : 'opacity-0'}`}
                        />
                      ) : (
                        <FaCheck className="text-xl text-green-600" />
                      )}
                    </Button>
                  </CardContent>
                </CardHeader>
              </Card>
              <Card className="h-auto w-72">
                <CardHeader>
                  <CardTitle>Usuários ({event.members.length})</CardTitle>
                  <CardContent className="flex flex-col gap-1 p-0 pt-4">
                    {event.members.map((member, index) => (
                      <p key={index}>{member.name}</p>
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
                        <DialogTitle>
                          Registre ou logue com seu usuário
                        </DialogTitle>
                        <DialogDescription>
                          Usando pela primeira vez? Digite um nome de usuário a
                          ser exibido e uma senha (opcional)
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
                                  <Input
                                    placeholder="Pedro Soller"
                                    {...field}
                                  />
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
                        <Button
                          type="submit"
                          onClick={form.handleSubmit(onSubmit)}
                        >
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
        </div>
      ) : null}
    </main>
  )
}
