import React from 'react'
import { auth } from '@/lib/auth'
// import Image from 'next/image'

const User = async () => {
  const session = await auth()
  return (
    <div className='h-fit flex items-center gap-5'>
        <p className='text-[#1A1A1A] font-normal text-xl'>{session?.user?.name}</p>
        <img className='rounded-full w-[50px] h-[50px]' src={session?.user?.image} alt="Picture of the author" />
    </div>
  )
}

export default User