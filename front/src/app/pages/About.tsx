import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Linkedin } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { AnimatedBalls } from '@/components/animated-balls'

type Contributor = {
  img: string
  name: string
  position: string
  github: string
  linkedin: string
}

const contributors: Contributor[] = [
  {
    name: 'João Branco',
    img: 'https://avatars.githubusercontent.com/u/85962841?v=4',
    position: 'Hacker ético, Anonymous',
    github: 'https://github.com/JoaoVitorBranco',
    linkedin:
      'https://www.linkedin.com/in/jo%C3%A3o-vitor-choueri-branco-a756ab209/'
  },
  {
    name: 'Vitor Soller',
    img: 'https://avatars.githubusercontent.com/u/81604963?v=4',
    position: 'PO, Vivo',
    github: 'https://github.com/VgsStudio',
    linkedin: 'https://www.linkedin.com/in/vitor-soller/'
  },
  {
    name: 'Pedro Matumoto',
    img: 'https://avatars.githubusercontent.com/u/85521574?v=4',
    position: 'Sonegador de Imposto, Receita Federal',
    github: 'https://github.com/PedroMatumoto',
    linkedin: 'https://www.linkedin.com/in/pedromatumoto/'
  },
  {
    name: 'Vinicius Berti',
    img: 'https://avatars.githubusercontent.com/u/98232929?v=4',
    position: 'CEO, Gostosinho',
    github: 'https://github.com/ViniciusBerti',
    linkedin: 'https://www.linkedin.com/in/vinicius-berti-a80354209/'
  },
  {
    name: 'Enzo Sakamoto',
    img: 'https://avatars.githubusercontent.com/u/98707474?v=4',
    position: 'Jogador de Beachtennis, XP Investimentos',
    github: 'https://github.com/enzosakamoto',
    linkedin: 'https://www.linkedin.com/in/enzosakamoto/'
  },
  {
    name: 'Flavio Murata',
    img: 'https://media.licdn.com/dms/image/D4D03AQFLFTsYOrEWQw/profile-displayphoto-shrink_400_400/0/1698003298526?e=1726704000&v=beta&t=9ShKkyt9ykRfpuqnIt1chKuBxzjJtzazsbL6oWgIPTs',
    position: 'Menino de TI, DIQ',
    github: 'https://github.com/flaviomurata',
    linkedin: 'https://www.linkedin.com/in/02mrt/'
  }
]

export function About() {
  const [fade, setFade] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setFade(true)
    }, 100)
  }, [])

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center gap-2 overflow-x-hidden bg-background px-4 pb-20 pt-32 text-center font-geist transition-all duration-500  sm:pb-12 md:justify-center">
      <AnimatedBalls />
      <h1
        className={`transform text-4xl font-bold transition-all duration-1000 sm:text-6xl lg:text-6xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0'}`}
      >
        Contribuidores
      </h1>
      <p
        className={`transform text-wrap text-lg font-light transition-all duration-2000 lg:text-xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0'}`}
      >
        Conheça nossa equipe de desenvolvedores
      </p>
      <div
        className={`grid transform grid-cols-1 gap-6 pt-12 transition-all duration-3000 sm:grid-cols-2 lg:grid-cols-3 ${fade ? 'opacity-100' : 'opacity-0'}`}
      >
        {contributors.map((contributor, index) => (
          <Card
            key={index}
            className="min-h-[16rem] transition-all duration-500"
          >
            <CardHeader className="items-center pb-0">
              <Avatar className="h-[100px] w-[100px]">
                <AvatarImage src={contributor.img} />
                <AvatarFallback>
                  {`${contributor.name.split(' ')[0].substring(0, 1)}${contributor.name.split(' ')[1].substring(0, 1)}`}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{contributor.name}</CardTitle>
              <CardDescription>{contributor.position}</CardDescription>
              <div className="flex space-x-4 pt-1">
                <a
                  href={contributor.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <FaGithub className="text-xl text-gray-500 hover:text-black" />
                </a>
                <a
                  href={contributor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="text-xl text-gray-500 hover:text-blue-700" />
                </a>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </main>
  )
}
