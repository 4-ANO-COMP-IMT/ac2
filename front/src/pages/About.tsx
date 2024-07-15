import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '../components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselItem
} from '../components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

type Contributor = {
  img: string
  name: string
  position: string
}

const contributors: Contributor[] = [
  {
    name: 'João Branco',
    img: 'https://media.licdn.com/dms/image/C4D03AQFiRdVm6Y3EpA/profile-displayphoto-shrink_800_800/0/1621979338107?e=1725494400&v=beta&t=-sBAQWAkvZYSLHr2qKXrqB3xNAOFogO6i-Qd3GZ8giM',
    position: 'Hacker ético, Anonymous'
  },
  {
    name: 'Vitor Soller',
    img: 'https://avatars.githubusercontent.com/u/81604963?v=4',
    position: 'PO, Vivo'
  },
  {
    name: 'Pedro Matumoto',
    img: 'https://avatars.githubusercontent.com/u/85521574?v=4',
    position: 'Sonegador de Imposto, Receita Federal'
  },
  {
    name: 'Vinicius Berti',
    img: 'https://avatars.githubusercontent.com/u/98232929?v=4',
    position: 'CEO, Gostosinho'
  },
  {
    name: 'Enzo Sakamoto',
    img: 'https://avatars.githubusercontent.com/u/98707474?v=4',
    position: 'Jogador de Beachtennis, XP Investimentos'
  },
  {
    name: 'Flavio Murata',
    img: 'https://media.licdn.com/dms/image/D4D03AQFLFTsYOrEWQw/profile-displayphoto-shrink_400_400/0/1698003298526?e=1726704000&v=beta&t=9ShKkyt9ykRfpuqnIt1chKuBxzjJtzazsbL6oWgIPTs',
    position: 'Menino de TI, DICK'
  }
]

export function About() {
  return (
    <main className="flex w-full flex-col items-center justify-center gap-2 bg-background px-12 py-48 text-center font-geist">
      <h1 className="text-center text-4xl font-bold sm:text-6xl lg:text-8xl">
        Contribuidores
      </h1>
      <p className="text-wrap text-lg font-light lg:text-2xl ">
        Conheça nossa equipe de desenvolvedores
      </p>
      <div className="flex w-full items-center justify-center pt-12">
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000
            })
          ]}
          opts={{
            align: 'start'
          }}
          className="max-w-lg px-24 sm:px-0 lg:max-w-4xl"
        >
          <CarouselContent>
            {contributors.map((contributor, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="min-h-[16rem]">
                    <CardHeader className="items-center pb-0">
                      <Avatar className="h-[100px] w-[100px]">
                        <AvatarImage src={contributor.img} />
                        <AvatarFallback>
                          {`${contributor.name.split(' ')[0].substring(0, 1)}${contributor.name.split(' ')[1].substring(0, 1)}`}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle>{contributor.name}</CardTitle>
                      <CardDescription>{contributor.position}</CardDescription>
                    </CardHeader>
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
