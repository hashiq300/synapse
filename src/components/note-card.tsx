import React from 'react'
import { Pen, Palette, Trash2, Bookmark } from 'lucide-react'

const NoteCard = () => {

  return (
    <div className='bg-[#FF9B73] w-[290px] h-[200px] p-6 rounded-2xl flex flex-col justify-between'>
        <div className='flex flex-col gap-3'>
            <p className='text-[#1A1A1A] font-normal text-xs'>23-Feb-2024</p>
            <h2 className='text-[#1A1A1A] font-normal text-lg'>Algorithm analysis & Design</h2>
        </div>

        <div className='h-fit flex justify-between items-center'>
            <div className='flex gap-6'>
                <button><Palette size={20} strokeWidth={1}/></button>
                <button><Trash2 size={20} strokeWidth={1}/></button>
                <button><Bookmark size={20} strokeWidth={1}/></button>
            </div>
            <button className='p-2 rounded-full bg-white'><Pen size={20} color='#000'/></button>
        </div>
    </div>
  )
}

export default NoteCard