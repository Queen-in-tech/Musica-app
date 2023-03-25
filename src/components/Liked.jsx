import { useState } from "react"
import { Link } from "react-router-dom"

const Liked = ({album}) => {
  const [isLiked, setLiked] = useState(true)
  const [likedIds, setLikedIds] = useState([])
   const currentLikedIds = JSON.parse(localStorage.getItem("likedIds")) || [];

  const handleLiked = (albumId) => {
    setLiked(!isLiked)
    const newLikedIds = currentLikedIds.filter((id) => id !== albumId);
    setLikedIds(newLikedIds);
    localStorage.setItem("likedIds", JSON.stringify(newLikedIds))
  }

  const likedIcon = isLiked ? `fa-solid fa-heart text-[#FACD66]` : `fa-regular fa-heart text-[#FACD66]`

  const saveDivId = (chartId) => {
    localStorage.setItem('albumId', chartId)
  }

  return (    
          <div className='rounded-b-xl overflow-hidden text-white bg-zinc-900 mt-1 cursor-pointer'>
          <Link to="/Playlists">
           <img src={album.images[1].url} alt="" className="" onClick={()=> saveDivId(album.id)}/>
           </Link>
           <div className='flex justify-between items-center py-2 px-4'>
           <div onClick={() => saveDivId(album.id)}>
           <p className='text-sm mb-1 normal-cas'>{album.name}</p>
           <p className='text-xs text-white uppercase'>{album.artists[0].name}</p>
           </div>
           <i className={`${likedIcon} cursor-pointer hover:scale-110`} onClick={() => handleLiked(album.id)} ></i>
          </div>
          </div>
  )
}

export default Liked
