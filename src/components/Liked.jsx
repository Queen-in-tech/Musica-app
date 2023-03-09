import React, { useEffect, useState } from 'react'

const Liked = ({album}) => {
  console.log(album)
  return (    
          <div className='h-auto w-auto rounded-xl  overflow-hidden text-white bg-red-800 mt-1 '>
           <img src="Rectangle 14.png" alt="" />
           <div className='flex justify-between items-center py-2 px-4'>
           <div className=''>
           <p className='text-sm'>{album.name}</p>
           <p className='text-xs text-white'>artist</p>
           </div>
           <i className='fa-solid fa-heart'></i>
           </div>
           </div>
  )
}

export default Liked
