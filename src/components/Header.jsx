import React from 'react'

const Header = () => {
  return (
    <div className='mb-8 flex shrink-o items-center'>
        <img src="logo.svg" alt="" className='mr-16 ml-2'/>
        <div className='bg-iconsBg flex p-3 rounded-2xl bg-[#0505052c] items-center w-full'>
        <i class="fa-solid fa-search text-icons mr-4"></i> 
        <input type="text" id='search' className='bg-transparent text-zinc-300 placeholder:text-icons outline-none w-full' placeholder='Search artists'/>
        </div>
    </div>
  )
}

export default Header
