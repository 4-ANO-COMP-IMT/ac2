import { EventCard } from '@/components/EventCard'
import timeBros from '../assets/time-bros.svg'

export function Home() {
  return (
    <main className="flex w-full h-screen flex-row items-start justify-center px-52 font-geist gap-4">
        <div className="flex w-full h-screen flex-col items-start justify-center gap-4">
          <h1 className=" text-primary font-bold text-7xl">BoraMarcar</h1>
          <p className="text-secondary font-light text-xl text-wrap text-left">Simplificando seus encontos com praticidade e precisão.</p>
          <button className="rounded-md border-[1px] border-gray-300 p-2 px-4 text-blue-primary text-xl
          transition-all duration-300 hover:bg-blue-primary hover:text-white hover:shadow-2xl hover:-translate-y-0.5 ">Criar evento</button>
        </div>
        <div className="flex w-full h-screen flex-col items-start justify-center">
          <img src={timeBros} alt="Flying" className="flex flex-col items-start justify-center" />
        </div>

      
      {/* <EventCard /> */}
    </main>
  )
}
