import timeBros from '../assets/time-bros.svg'
import { ReviewCard } from '../components/ReviewCard'

export function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-center px-52 text-center font-geist">
      <div className="flex w-full flex-col items-center justify-center gap-2 py-48 text-center">
        <h1 className=" text-7xl font-bold text-primary">BoraMarcar</h1>
        <p className="text-wrap text-xl font-light text-secondary">
          Simplificando seus encontos com praticidade e precisão.
        </p>
        <p className="w-4/5">
          Ferramenta de agendamento online com interface intuitiva e
          profissional, que facilita a marcação de compromissos e reuniões ao
          permitir a visualização rápida dos horários disponíveis de cada
          participante.
        </p>
        <a href="/event" className="">
          <button
            className="rounded-md border-[1px] border-gray-300 p-2 px-4 text-xl text-blue-primary
            transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-primary hover:text-white hover:shadow-2xl "
          >
            Criar evento
          </button>
        </a>
      </div>

      <div
        className="flex flex-col items-center justify-center gap-8 sm:flex-row-reverse
        "
      >
        <img src={timeBros} alt="Flying" />
        <ReviewCard
          img={
            'https://media.licdn.com/dms/image/D5603AQFx8dIY-KAcPQ/profile-displayphoto-shrink_200_200/0/1709219070107?e=1724889600&v=beta&t=gpRSFh51T4whCsJNesglU5_VgnlGO96LRpKDHNCe6gs'
          }
          review={
            '"BoraMarcar é uma ferramenta excepcional. A interface intuitiva e profissional simplificou significativamente a coordenação de nossos compromissos. Altamente recomendada!"'
          }
          name={'Vruno Bilardi'}
          position={'CEO, e-Core'}
        />
      </div>

      {/* <EventCard /> */}
    </main>
  )
}
