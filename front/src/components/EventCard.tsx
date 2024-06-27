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
import { useState } from 'react'

const hours = Array.from({ length: 24 }, (_, i) => i)

export function EventCard() {
  const [date, setDate] = useState<{ from: Date; to: Date } | undefined>(
    undefined
  )
  return (
    <Card className="w-2/5">
      <CardHeader>
        <CardTitle className="text-primary">Criar evento</CardTitle>
        <CardDescription className="text-secondary">
          Crie seu evento em um clique.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-primary">
                Nome do evento
              </Label>
              <Input id="name" placeholder="Ex: Daily do projeto" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description" className="text-primary">
                Descrição do evento (opcional)
              </Label>
              <Textarea
                id="description"
                placeholder="Ex: Reunião de alinhamento diária do projeto"
                className="resize-none"
              />
            </div>
            <Label htmlFor="notEarlier" className="translate-y-2 text-primary">
              Qual será o horário de trabalho?
            </Label>
            <div className="flex justify-between gap-3">
              <div className="w-1/2">
                <Select>
                  <SelectTrigger id="notEarlier">
                    <SelectValue
                      placeholder="08:00"
                      className="placeholder:text-secondary"
                    />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {hours.map((hour) => {
                      const hourFormatted = `${hour.toString().padStart(2, '0')}:00`
                      return (
                        <SelectItem key={hour} value={hourFormatted}>
                          {hourFormatted}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center text-[15px] text-primary">
                até
              </div>
              <div className="w-1/2">
                <Select>
                  <SelectTrigger id="notLater">
                    <SelectValue
                      placeholder="18:00"
                      className="placeholder:text-secondary"
                    />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {hours.map((hour) => {
                      const hourFormatted = `${hour.toString().padStart(2, '0')}:00`
                      return (
                        <SelectItem key={hour} value={hourFormatted}>
                          {hourFormatted}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-center">
              <Calendar
                numberOfMonths={2}
                mode="range"
                selected={date}
                onSelect={setDate}
                className="flex w-full justify-center rounded-md border"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-around">
        <Button variant="outline">Limpar</Button>
        <Button>Criar</Button>
      </CardFooter>
    </Card>
  )
}
