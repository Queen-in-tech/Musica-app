import React from 'react'

const Release = ({image, title, artist}) => {
  return (
    <div className="flex flex-col text-white shrink-0 rounded-3xl">
        <img src={image} alt="image" className="mr-5 mb12 rounded-3xl" />
        <p className="text-md w-44 text-gray-200">{title}</p>
        <p className="text-xs text-gray-400 mb-6">{artist}</p>
    </div>
  )
}

export default Release
