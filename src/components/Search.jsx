import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../context"


const Search = ({album}) => {
    const [isLiked, setLiked] = useState(false)
     const {setSearchIsReady} = useContext(UserContext);

     const handleLiked = (albumId) => {
        setLiked(!isLiked); 
    const likedIds = JSON.parse(localStorage.getItem('likedIds')) || []; 
    if (isLiked) {
      const index = likedIds.indexOf(id);
      if (index !== -1) {
        likedIds.splice(index, 1);
      }
    } else {
      likedIds.push(albumId);
    }
    localStorage.setItem('likedIds', JSON.stringify(likedIds)); 
      }

      useEffect(() => {
        const currentLikedIds = JSON.parse(localStorage.getItem('likedIds')) || [];
        if(currentLikedIds.includes(album.id)){
          setLiked(true)
        }
      },[])

    const likedIcon = isLiked ? `fa-solid fa-heart text-[#FACD66]` : `fa-regular fa-heart text-[#FACD66]`

  const saveDivId = (chartId) => {
    localStorage.setItem('albumId', chartId)
    setSearchIsReady(false)
  }
  return (
    <div className="rounded-b-xl overflow-hidden text-white bg-zinc-900 mt-1 cursor-pointer">
     <div key={album.id} className="">
        <Link to="/Playlists" onClick={()=> {
            saveDivId(album.id)
           }}>
           <img src={album.images[1].url} 
           alt="album image"
           />
           </Link>
           <div className='flex justify-between items-center py-2 px-4'>
           <div onClick={() => saveDivId(album.id)}>
           <p className='text-sm mb-1 normal-cas'>{album.name}</p>
           <p className='text-xs text-white uppercase'>{album.artists[0].name}</p>
           </div>
           <i className={`${likedIcon} cursor-pointer hover:scale-110`} onClick={() => handleLiked(album.id)} ></i>
          </div>
      </div>

    </div>
  )
}

export default Search
