import React from 'react'
import Image from 'next/image'
import { auth } from '@/lib/auth'

const User = async () => {
  return (
    <div className='h-fit flex items-center gap-5'>
        <p className='text-[#1A1A1A] font-normal text-xl'>{"Antony Jaison"}</p>
        <Image src="/images/avatar.png" alt="Picture of the author" width={50} height={50} />
    </div>
  )
}

export default User