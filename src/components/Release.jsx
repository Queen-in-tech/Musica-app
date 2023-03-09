import React from 'react'

const Release = ({album}) => {
  return (
    <div className="flex flex-col text-white shrink-0 rounded-3xl">
        <img src={album.images[1].url} alt="image" className="mr-5 mb-1 h-40 w-40" />
        <p className="text-md w-44 text-gray-200">{album.name}</p>
        <p className="text-xs text-gray-400 mb-5">{album.artists[0].name}</p>
    </div>
  )
}

export default Release
