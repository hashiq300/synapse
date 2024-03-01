import React from 'react'
import { ChevronRight } from 'lucide-react'
import NoteCard from './note-card'

const NoteSection = () => {
  return (
    <div>
        <div className=' h-fit flex items-center justify-between py-14'>
            <h3 className='font-normal text-xl text-[#1A1A1A]'>All Notes <span className='font-normal text-base text-[#B0B0B0]'>18 notes</span></h3>
            <div className='h-fit flex items-center'>
                <p className=' font-normal text-lg text-[#B0B0B0]'>See all</p>
                <ChevronRight size={15} color='#B0B0B0'/>
            </div>
        </div>

        <div className='flex flex-wrap gap-5 justify-between'>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
        </div>
    </div>
  )
}

export default NoteSection