import React from 'react'

import { Calendar } from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

type TakeNoteProps = {
  href: string,
  title: string
  icon: LucideIcon
}

const TakeNote = ({ href, title, icon }: TakeNoteProps) => {

  return (

    <Link href={href} className='w-[290px] h-fit flex items-center gap-7 bg-white px-6 py-3 rounded-2xl shadow-link cursor-pointer'>
      <div className=' bg-primary w-fit rounded-full p-3'>
        {icon}
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-[#7B7B7B] text-xs font-light'>New note</p>
        <h4 className='text-[#1A1A1A] text-lg font-light'>{title}</h4>
      </div>
    </Link>
  )
}

export default TakeNote