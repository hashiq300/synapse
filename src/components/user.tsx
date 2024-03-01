import React from 'react'
import Image from 'next/image'

const User = () => {
  return (
    <div className='h-fit flex items-center gap-5'>
        <p className='text-[#1A1A1A] font-normal text-xl'>Ashiq Rahman</p>
        <Image src="/images/avatar.png" alt="Picture of the author" width={50} height={50} />
    </div>
  )
}

export default User