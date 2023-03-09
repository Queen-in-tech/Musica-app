import { useState } from "react"

const Chart = ({chart}) => {
  const [isLiked, setLiked] = useState(false)
  const [likedIds, setLikedIds] = useState([])
  const handleLiked = (chartId) => {
    setLiked(!isLiked)
    const currentLikedIds = JSON.parse(localStorage.getItem("likedIds")) || [];

    if (!currentLikedIds.includes(chartId)) {
      const newLikedIds = [...currentLikedIds, chartId];
      setLikedIds(newLikedIds);

      localStorage.setItem("likedIds", JSON.stringify(newLikedIds))
    } 
     
    if(isLiked){
      const newLikedIds = currentLikedIds.filter((id) => id !== chartId);
      setLikedIds(newLikedIds);
  
      localStorage.setItem("likedIds", JSON.stringify(newLikedIds));
    }
  }
  const likedIcon = isLiked ? `fa-solid fa-heart text-[#FACD66]` : `fa-regular fa-heart text-[#FACD66]`

  return (
    <div className="bg-[#0505052c] flex text-white p-3 lg:items-center shrink-0 rounded-3xl mb-5" id={chart.id}>
      <div className="lg:flex">
        <img src={chart.images[1].url} alt="image" className="mr-5 mb-3 lg:mb-0 w-[108px] h-[99px] lg:w-16 lg:h-16" />
        <div className="mr-24 ">
            <p className="text-lg w-36 md:w-44 lg:w-52 text-gray-200 ">{chart.name}</p>
            <p className="text-xs text-gray-400 mb-4 lg:mb-2">{chart.artists[0].name}</p>
          <p className="text-sm lg:text-xs text-gray-200 mb-1 lg:mb-0">{`${chart.total_tracks} tracks`}</p>
        </div>
        </div>
        <div className="relative ">
        <img src="Ellipse 9.svg" alt="" />
        <i className={`${likedIcon} absolute top-2.5 right-2.5 cursor-pointer hover:scale-110`} onClick={() => handleLiked(chart.id)} />
        </div>
    </div>
  )
}

export default Chart
