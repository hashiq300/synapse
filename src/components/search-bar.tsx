import React from 'react'
import { Search } from 'lucide-react'

const SearchBar = () => {
  return (
    <form className=' h-fit w-full flex items-center bg-white rounded-full py-5 px-8 gap-7 shadow-link'>
        <Search size={20} color='#7B7A7A' strokeWidth={1.5}/>
        <input className=' text-[#7B7A7A] focus:outline-none font-light text-lg' type="text" placeholder="Search anything..." />
    </form>
  )
}

export default SearchBar