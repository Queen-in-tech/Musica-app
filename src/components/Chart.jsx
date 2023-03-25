import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const Chart = ({chart}) => {
  const [isLiked, setLiked] = useState(false)
  
  const handleLiked = (id) => {
    setLiked(!isLiked); 
    const likedIds = JSON.parse(localStorage.getItem('likedIds')) || []; 
    if (isLiked) {
      const index = likedIds.indexOf(id);
      if (index !== -1) {
        likedIds.splice(index, 1);
      }
    } else {
      likedIds.push(id);
    }
    localStorage.setItem('likedIds', JSON.stringify(likedIds)); 
  };

  useEffect(() => {
    const currentLikedIds = JSON.parse(localStorage.getItem('likedIds')) || [];
    if(currentLikedIds.includes(chart.id)){
      setLiked(true)
    }
  },[])
  
  const likedIcon = isLiked ? `fa-solid fa-heart text-[#FACD66]` : `fa-regular fa-heart text-[#FACD66]`

  const saveDivId = (chartId) => {
    localStorage.setItem('albumId', chartId)
  }

  return (
    <div className="bg-[#0505052c] flex text-white p-3 lg:items-center shrink-0 rounded-3xl mb-5">
      <Link to="/Playlists">
      <div className="lg:flex" onClick={() => saveDivId(chart.id)}>
        <img src={chart.images[1].url} alt="image" className="mr-5 mb-3 lg:mb-0 w-[108px] h-[99px] lg:w-16 lg:h-16" />
        <div className="mr-24 ">
            <p className="text-lg w-36 md:w-44 lg:w-52 text-gray-200 ">{chart.name}</p>
            <p className="text-xs text-gray-400 mb-4 lg:mb-2">{chart.artists[0].name}</p>
          <p className="text-sm lg:text-xs text-gray-200 mb-1 lg:mb-0">{`${chart.total_tracks} tracks`}</p>
        </div>
        </div>
        </Link>
        <div className="relative ">
        <img src="Ellipse 9.svg" alt="" />
        <i className={`${likedIcon} absolute top-2.5 right-2.5 cursor-pointer hover:scale-110`} onClick={() => handleLiked(chart.id)} />
        </div>
    </div>
  )
}

export default Chart
