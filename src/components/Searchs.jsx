import React from 'react'
import { ThreeDots } from  'react-loader-spinner'
import Search from './Search'
import { useContext} from "react"
import { UserContext } from "../../context"

const Searchs = () => {
    const {currentTracks, currentAlbum, searchAlbums, searchTracks,searchIsReady} = useContext(UserContext)


  return (
    <div className="h-full grid gap-y-7 gap-x-3 mx-auto grid-cols-2 sm:grid-cols-3 sm:gap-7 md:grid-cols-4 md:gap-10 lg:grid-cols-6 lg:mx-0 pb-20 md:shrink">
      {searchIsReady? searchAlbums.map((album) => {
       return <Search album={album} key={album.id}/>
      }) : <ThreeDots 
      height="80" 
      width="100" 
      radius="9"
      color="rgba(239, 238, 224, 0.25)" 
      ariaLabel="three-dots-loading"
      visible={true}/>}
    </div>
  )
}

export default Searchs
