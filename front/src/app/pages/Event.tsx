import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
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
import { useMember } from '@/hooks/use-member'
import { separateConsecutiveNumbers } from '@/utils/functions/array-separator'
import { useAvailability } from '@/hooks/use-availability'

export function Event() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { createMember, loginMember, member, setMember } = useMember()
  const {
    updateAvailability
    // getBestTime
  } = useAvailability()
  const {
    getEvent,
    isLogged,
    setIsLogged,
    paintedDivs,
    setPaintedDivs,
    next,
    setNext,
    setCountDivs
  } = useEvent()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [event, setEvent] = useState<EventType | null>(null)
  const [members, setMembers] = useState<
    {
      name: string
      available: boolean
      availabilities: { [id: number]: number[] }
    }[]
  >([])

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
          members: response.data?.members
            ? response.data?.members.map((member) => {
                return {
                  ...member,
                  name: member.name
                    .replace(/\./g, ' ')
                    .split(' ')
                    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
                    .join(' ')
                }
              })
            : [],
          description: response.data?.description
        })
        setMembers(
          response.data?.members
            ? response.data?.members.map((member) => {
                return {
                  name: member.name,
                  available: true,
                  availabilities: []
                }
              })
            : []
        )
        const intervals = response.data?.dates
          .sort((a, b) => a - b)
          .map((date) => {
            const startDate = new Date(date)
            startDate.setHours(
              response.data?.notEarlier
                ? response.data?.notEarlier / 1000 / 60 / 60
                : 8
            )
            const endDate = new Date(date)
            endDate.setHours(
              response.data?.notLater
                ? response.data?.notLater / 1000 / 60 / 60
                : 18
            )
            return {
              // Add timezone offset
              startDate: new Date(startDate.getTime()),
              endDate: new Date(endDate.getTime())
            }
          })

        if (!intervals?.length || !response.data?.members?.length) {
          return
        }

        const divs = intervals.map((interval) => {
          return Array.from({
            length:
              2 * (interval.endDate.getHours() - interval.startDate.getHours())
          }).map((_, index) => {
            const startDate = new Date(
              interval.startDate.getTime() + index * 30 * 60 * 1000
            )
            const endDate = new Date(
              interval.startDate.getTime() + (index + 1) * 30 * 60 * 1000
            )
            return {
              index,
              startDate,
              endDate
            }
          })
        })

        setCountDivs(
          divs.reduce(
            (acc, div, index) => {
              acc[index] = div.map((item) => {
                return {
                  index: item.index,
                  count: 0,
                  members: []
                }
              })
              return acc
            },
            {} as {
              [id: number]: {
                index: number
                count: number
                members: string[]
              }[]
            }
          )
        )

        const memberPaintedDivs: { [id: number]: number[] } = {}

        // Initialize the object with numeric keys and empty arrays
        for (let i = 0; i < intervals.length; i++) {
          memberPaintedDivs[i] = []
        }

        response.data?.members.map((member) => {
          member.availabilities.map((availability) => {
            const index = divs.findIndex((div) => {
              return (
                div[0].startDate.getDate() ===
                  new Date(availability.startDate).getDate() &&
                div[0].endDate.getDate() ===
                  new Date(availability.endDate).getDate()
              )
            })

            if (index === -1) {
              return
            }

            const startDivIndex = divs[index].findIndex((div) => {
              return div.startDate.getTime() === availability.startDate
            })

            const endDivIndex = divs[index].findIndex((div) => {
              return div.endDate.getTime() === availability.endDate
            })

            if (startDivIndex === -1 || endDivIndex === -1) {
              return
            }

            memberPaintedDivs[index].push(divs[index][startDivIndex].index)
            if (startDivIndex !== endDivIndex) {
              for (let i = startDivIndex + 1; i <= endDivIndex; i++) {
                memberPaintedDivs[index].push(divs[index][i].index)
              }
            }

            setMembers((prev) => {
              return prev.map((item) => {
                if (item.name === member.name) {
                  const aux: number[] = []
                  for (
                    let i = divs[index][startDivIndex].index;
                    i <= divs[index][endDivIndex].index;
                    i++
                  ) {
                    aux.push(i)
                  }
                  return {
                    ...item,
                    availabilities: {
                      ...item.availabilities,
                      [index]: [...(item.availabilities[index] || []), ...aux]
                    }
                  }
                }
                return item
              })
            })

            setCountDivs((prev) => {
              return {
                ...prev,
                [index]: prev[index].map((item) => {
                  if (
                    item.index >= divs[index][startDivIndex].index &&
                    item.index <= divs[index][endDivIndex].index
                  ) {
                    return {
                      index: item.index,
                      count: item.count + 1,
                      members: [...item.members, member.name]
                    }
                  }
                  return item
                })
              }
            })
          })
        })

        setPaintedDivs(memberPaintedDivs)
      } catch (error) {
        console.log(error)
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

  useEffect(() => {
    handleEvent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleEditMember = (username: string) => {
    const intervals = event?.dates
      .sort((a, b) => a - b)
      .map((date) => {
        const startDate = new Date(date)
        startDate.setHours(event.notEarlier || 8)
        const endDate = new Date(date)
        endDate.setHours(event.notLater || 18)
        return {
          // Add timezone offset
          startDate: new Date(startDate.getTime()),
          endDate: new Date(endDate.getTime())
        }
      })

    if (!intervals?.length) {
      return
    }

    const divs = intervals.map((interval) => {
      return Array.from({
        length:
          2 * (interval.endDate.getHours() - interval.startDate.getHours())
      }).map((_, index) => {
        const startDate = new Date(
          interval.startDate.getTime() + index * 30 * 60 * 1000
        )
        const endDate = new Date(
          interval.startDate.getTime() + (index + 1) * 30 * 60 * 1000
        )
        return {
          index,
          startDate,
          endDate
        }
      })
    })

    const memberPaintedDivs: { [id: number]: number[] } = {}

    // Initialize the object with numeric keys and empty arrays
    for (let i = 0; i < intervals.length; i++) {
      memberPaintedDivs[i] = []
    }

    handleReset()

    event?.members
      .filter(
        (member) =>
          member.name.trim().split(/\s+/).join('.').toLowerCase() === username
      )[0]
      .availabilities.map((availability) => {
        const index = divs.findIndex((div) => {
          return (
            div[0].startDate.getDate() ===
              new Date(availability.startDate).getDate() &&
            div[0].endDate.getDate() ===
              new Date(availability.endDate).getDate()
          )
        })

        if (index === -1) {
          return
        }

        const startDivIndex = divs[index].findIndex((div) => {
          return div.startDate.getTime() === availability.startDate
        })

        const endDivIndex = divs[index].findIndex((div) => {
          return div.endDate.getTime() === availability.endDate
        })

        if (startDivIndex === -1 || endDivIndex === -1) {
          return
        }

        memberPaintedDivs[index].push(divs[index][startDivIndex].index)
        if (startDivIndex !== endDivIndex) {
          for (let i = startDivIndex + 1; i <= endDivIndex; i++) {
            memberPaintedDivs[index].push(divs[index][i].index)
          }
        }
      })

    setPaintedDivs(memberPaintedDivs)
  }

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true)
    try {
      await loginMember(values)
      toast({
        title: 'Usuário logado',
        description: 'Agora você pode salvar suas preferências de horário!'
      })

      setMember(
        event?.members.find(
          (member) =>
            member.name.trim().split(/\s+/).join('.').toLowerCase() ===
            values.username
        )
      )
      setIsLogged(true)
      setIsDialogOpen(false)
      handleEditMember(values.username)
    } catch (error) {
      if ((error as AxiosError).response?.status === 404) {
        try {
          await createMember(values)
          toast({
            title: 'Usuário criado',
            description: 'Agora você pode salvar suas preferências de horário!'
          })
          setIsLogged(true)
          setIsDialogOpen(false)
          handleReset()
        } catch (error) {
          console.log(error)
        }
      } else if ((error as AxiosError).response?.status === 401) {
        toast({
          title: 'Senha incorreta',
          description: 'Tente novamente'
        })
      }
    }
    setIsLoading(false)
  }

  const handleReset = () => {
    setPaintedDivs({})
  }

  const handleUpdate = async () => {
    if (isLogged && event?.dates.length) {
      const availableIntervals: { startDate: number; endDate: number }[] = []

      const intervals = event?.dates
        .sort((a, b) => a - b)
        .map((date) => {
          const startDate = new Date(date)
          startDate.setHours(event!.notEarlier)
          const endDate = new Date(date)
          endDate.setHours(event!.notLater)
          return {
            // Add timezone offset
            startDate,
            endDate
          }
        })

      Object.keys(paintedDivs).map((key) => {
        const interval = intervals[parseInt(key)]
        separateConsecutiveNumbers(paintedDivs[parseInt(key)]).map(
          (numbers) => {
            const startDate = new Date(interval.startDate)
            const endDate = new Date(interval.startDate)

            startDate.setMinutes(
              interval.startDate.getMinutes() + numbers[0] * 30
            )
            endDate.setMinutes(
              interval.startDate.getMinutes() +
                (numbers[numbers.length - 1] + 1) * 30
            )

            availableIntervals.push({
              startDate: startDate.getTime(),
              endDate: endDate.getTime()
            })
          }
        )
      })
      setIsLoading(true)
      await updateAvailability(event.id, member!.id, availableIntervals)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
      window.location.reload()
      toast({
        title: 'Horários salvos',
        description: 'Obrigado por participar!'
      })
    } else {
      toast({
        title: 'Você precisa estar logado para selecionar um horário',
        description: 'Clique no botão "Editar" para fazer login'
      })
    }
  }

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
      eventId: event?.id || ''
    }
  })

  return (
    <main className="relative flex h-auto min-h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background pb-24 transition-all duration-500">
      <AnimatedBalls />
      {event?.dates.length ? (
        <div className="z-10 flex w-4/5 flex-col items-center justify-center gap-6 pt-24 md:w-4/5">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold">{event.name}</h1>
              <h2>{event.description}</h2>
            </div>
            <Button
              variant="outline"
              className={`transition-all ${isCopied ? 'bg-green-100' : ''}`}
              disabled={isCopied}
              onClick={() => {
                toast({
                  title: 'Link copiado',
                  description: 'Agora você pode compartilhar com seus amigos'
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
                <div className="flex gap-2">
                  <p className="hidden text-sm lg:flex">Copiar link</p>
                  <MdContentCopy
                    className={`text-xl transition-all duration-500 ${!isCopied ? 'opacity-100' : 'opacity-0'}`}
                  />
                </div>
              ) : (
                <FaCheck
                  className={`text-xl text-green-600 transition-all duration-500 ${isCopied ? 'opacity-100' : 'opacity-0'}`}
                />
              )}
            </Button>
          </div>
          <div className="flex w-full flex-col-reverse gap-4 lg:flex-row">
            <PeriodSelector
              dates={event?.dates}
              notEarlier={event.notEarlier}
              notLater={event.notLater}
              timezone={-3}
              membersDispatch={setMembers}
            />
            <div className="flex flex-col gap-4">
              <Card className="h-auto w-full lg:w-80">
                <CardHeader>
                  <CardTitle>Usuários ({event.members.length})</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-1 lg:flex lg:flex-col">
                  {members.map((member, index) => {
                    if (member.available)
                      return (
                        <p key={index}>
                          {member.name
                            .replace(/\./g, ' ')
                            .split(' ')
                            .map(
                              (item) =>
                                item.charAt(0).toUpperCase() + item.slice(1)
                            )
                            .join(' ')}
                        </p>
                      )
                    else
                      return (
                        <s key={index}>
                          {member.name
                            .replace(/\./g, ' ')
                            .split(' ')
                            .map(
                              (item) =>
                                item.charAt(0).toUpperCase() + item.slice(1)
                            )
                            .join(' ')}
                        </s>
                      )
                  })}
                </CardContent>
              </Card>
              {/* <Card className="h-auto w-full lg:w-80">
                <CardHeader>
                  <CardTitle>Melhor horário</CardTitle>
                </CardHeader>
                <CardContent className="">
                  {bestTime.map((time, index) => (
                    <p key={index}>{time}</p>
                  ))}
                </CardContent>
              </Card> */}
              <div className="flex justify-between">
                <div className="flex justify-start gap-2">
                  {isLogged && (
                    <Button
                      variant="outline"
                      disabled={!isLogged || isLoading}
                      onClick={handleUpdate}
                    >
                      {isLoading ? <LoadingSpin /> : 'Salvar'}
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
                            Usando pela primeira vez? Digite um nome de usuário
                            a ser exibido e uma senha (opcional)
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
                            type="button"
                            onClick={() => {
                              form.setValue(
                                'username',
                                form
                                  .getValues('username')
                                  .trim()
                                  .split(/\s+/)
                                  .join('.')
                                  .toLowerCase()
                              )
                              form.setValue('eventId', event.id)
                              return onSubmit(form.getValues())
                            }}
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
                    disabled={!isLogged || isLoading}
                  >
                    Limpar
                  </Button>
                </div>
                <div className="flex gap-2 md:hidden">
                  <Button
                    disabled={next === 0}
                    variant="outline"
                    className="rounded-full"
                    onClick={() => setNext((prev) => prev - 3)}
                  >
                    <FaArrowLeft />
                  </Button>
                  <Button
                    disabled={next + 3 >= event.dates.length}
                    variant="outline"
                    className="rounded-full"
                    onClick={() => setNext((prev) => prev + 3)}
                  >
                    <FaArrowRight />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
