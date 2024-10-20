import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

import { useEffect, useState } from 'react'
import { AnimatedBalls } from '@/components/animated-balls'

type Review = {
  name: string
  position: string
  img: string
  review: string
}

const reviews: Review[] = [
  {
    name: 'Bruno Vilardi',
    position: 'CEO, e-Core',
    img: 'https://avatars.githubusercontent.com/u/62917140?v=4',
    review:
      'BoraMarcar é uma ferramenta excepcional. A interface intuitiva e profissional simplificou significativamente a coordenação de nossos compromissos. Altamente recomendada!'
  },
  {
    name: 'João Branco',
    position: 'Hacker ético, Anonymous',
    img: 'https://avatars.githubusercontent.com/u/85962841?v=4',
    review:
      'BoraMarcar é uma plataforma excepcional. A interface prática e profissional facilitou muito a gestão de nossos agendamentos. Recomendo fortemente!'
  },
  {
    name: 'Vitor Soller',
    position: 'PO, Vivo',
    img: 'https://avatars.githubusercontent.com/u/81604963?v=4',
    review:
      'BoraMarcar é incrível. A interface intuitiva e funcional melhorou significativamente a coordenação dos nossos compromissos. Recomendadíssima!'
  },
  {
    name: 'Hector Guerrini',
    position: 'CEO, Itaú',
    img: 'https://avatars.githubusercontent.com/u/24724451?v=4',
    review:
      'BoraMarcar é uma ferramenta impressionante. A facilidade de uso e a profissionalidade do sistema tornaram o agendamento de consultas muito mais simples. Altamente recomendada!'
  },
  {
    name: 'Pedro Matumoto',
    position: 'Sonegador de Imposto, Receita Federal',
    img: 'https://avatars.githubusercontent.com/u/85521574?v=4',
    review:
      'BoraMarcar é simplesmente fenomenal. A interface clara e direta transformou a forma como organizamos nossos compromissos. Extremamente recomendável!'
  }
]

export function Home() {
  const [fade, setFade] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setFade(true)
    }, 100)
  }, [])

  return (
    <main className="relative flex w-full flex-col items-center justify-center gap-6 overflow-x-hidden bg-background py-24 text-center font-geist transition-all duration-500">
      <AnimatedBalls />
      <div className="flex w-full flex-col items-center justify-center gap-2 px-12 py-48 text-center md:px-0">
        <h1
          className={`transform text-4xl font-bold transition-all duration-1000 sm:text-6xl lg:text-8xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0'}`}
        >
          BoraMarcar
        </h1>
        <p
          className={`transform text-wrap text-lg font-light transition-all duration-2000 lg:text-2xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0'}`}
        >
          Simplificando seus encontos com praticidade e precisão.
        </p>
        <p
          className={`mt-8 w-full transform text-center text-sm transition-all duration-3000 sm:w-3/5 lg:w-2/5 lg:text-base ${fade ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0'}`}
        >
          Ferramenta de agendamento online com interface intuitiva e
          profissional, que facilita a marcação de compromissos e reuniões ao
          permitir a visualização rápida dos horários disponíveis de cada
          participante.
        </p>
        <a href="/event">
          <Button
            // size="lg"
            variant="default"
            className={`mt-4 transform transition-all duration-4000 ${fade ? 'opacity-100' : 'opacity-0'}`}
          >
            Criar evento
          </Button>
        </a>
      </div>

      <div
        className={`flex w-full transform items-center justify-center px-4 transition-all duration-3000 sm:px-0 ${fade ? 'opacity-100' : 'opacity-0'}`}
      >
        <Carousel
          plugins={
            window.innerWidth < 768
              ? [
                  Autoplay({
                    delay: 2000
                  })
                ]
              : []
          }
          opts={{
            align: 'start'
          }}
          className="max-w-lg px-24 sm:px-0 lg:max-w-4xl"
        >
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="min-h-[26rem] transition-all duration-500">
                    <CardHeader className="items-center pb-0">
                      <Avatar className="h-[75px] w-[75px]">
                        <AvatarImage src={review.img} />
                        <AvatarFallback>
                          {`${review.name.split(' ')[0].substring(0, 1)}${review.name.split(' ')[1].substring(0, 1)}`}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="">{review.name}</CardTitle>
                      <CardDescription>{review.position}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-center text-base font-light">
                        &quot;{review.review}&quot;
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  )
}
