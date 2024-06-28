import { EventCard } from '@/components/EventCard'
import timeBros from '../assets/time-bros.svg'
import { ReviewCard } from '../components/ReviewCard'

export function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-center px-52 font-geist text-center">
        <div className="flex w-full flex-col items-center justify-center text-center py-48 gap-2">
          <h1 className=" text-primary font-bold text-7xl">BoraMarcar</h1>
          <p className="text-secondary font-light text-xl text-wrap">Simplificando seus encontos com praticidade e precisão.</p>
          <p className="w-4/5">Ferramenta de agendamento online com interface intuitiva e profissional, que facilita a marcação de compromissos e reuniões ao permitir a visualização rápida dos horários disponíveis de cada participante.</p>
          <a href="/event" className="">
            <button className="rounded-md border-[1px] border-gray-300 p-2 px-4 text-blue-primary text-xl
            transition-all duration-300 hover:bg-blue-primary hover:text-white hover:shadow-2xl hover:-translate-y-0.5 ">
                Criar evento
            </button>
          </a>
        </div>

        <div className='flex gap-8 justify-center items-center flex-col sm:flex-row-reverse
        '>

          <img src={timeBros} alt="Flying"  />
          <ReviewCard 
            img={'https://media.licdn.com/dms/image/D5603AQFx8dIY-KAcPQ/profile-displayphoto-shrink_200_200/0/1709219070107?e=1724889600&v=beta&t=gpRSFh51T4whCsJNesglU5_VgnlGO96LRpKDHNCe6gs'}
            review={'"BoraMarcar é uma ferramenta excepcional. A interface intuitiva e profissional simplificou significativamente a coordenação de nossos compromissos. Altamente recomendada!"'} 
            name={'Vruno Bilardi'} 
            position={'CEO, e-Core'}/>
            

        </div>

      
      {/* <EventCard /> */}
    </main>
  )
}
