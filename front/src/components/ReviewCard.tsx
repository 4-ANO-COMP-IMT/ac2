import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { IoSunnyOutline } from 'react-icons/io5'
import { RiMenu2Fill } from 'react-icons/ri'
import { IoClose } from 'react-icons/io5'

export function ReviewCard(props: { img: string, review: string, name: string, position: string }) {
  
  return (
    <div className='flex flex-col justify-center items-center w-80 h-auto gap-2 bg-blue-secondary rounded-2xl px-6 py-6 shadow-blue-primary shadow-lg'> 
      <img src={props.img} alt="Bruno Vilardi" className="w-2/5 rounded-full" />
      <p className='text-wrap text-white'>{props.review}</p>
      <div>
        <p className='text-black'>{props.name}</p>
        <p className='text-blue-500'>{props.position}</p>
      </div>
    </div>
  )
}
