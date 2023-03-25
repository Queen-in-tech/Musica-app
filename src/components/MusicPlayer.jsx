import { useContext } from "react"
import { UserContext } from "../../context"


const MusicPlayer = () => {
  const {currentTracks, currentAlbum} = useContext(UserContext)
  

  return (
    <div className='relative z-30'>
        <div className='fixed bottom-0 w-full h-auto py-4 px-6 lg:px-24 bg-zinc-900 opacity-95 flex items-center justify-between'>
          <div className="flex gap-3 items-center ">
          <img className="" alt="img" src={currentAlbum.images[2].url}  />
          <div className="flex flex-col ">
            <h3 className="text-white font-bold text-sm">{currentTracks.name}</h3>
            <h3 className="text-gray-400 font-light text-xs">{currentTracks.artists[0].name}</h3>
          </div>
          </div>

          <div className="hidden sm:flex flex-col items-center gap-4">
            <div className="text-gray-200 text-lg flex gap-8">
              <i class="fa-solid fa-shuffle"></i>
              <i class="fa-solid fa-backward"></i>
              <i class="fa-solid fa-circle-play text-[#FACD66]"></i>
              <i class="fa-solid fa-forward"></i>
              <i class="fa-solid fa-repeat"></i>
            </div>
            <input type="range" className="sm:w-[250px] md:w-[420px] lg:w-[745px] accent-[#FACD66]" />
          </div>

          <div className="hidden sm:flex gap-1">
            <i class='fa-solid fa-volume-high text-gray-200 text-sm'></i>
            <input type="range" className="accent-[#FACD66] "/>
          </div>
          <div className="flex gap-5 sm:hidden items-center mr-5">
          <i class='fa-solid fa-circle-play text-[#FACD66] text-3xl'></i>
          <i class="fa-solid fa-forward text-white"></i>
          </div>
        </div>
    </div>
  )
}

export default MusicPlayer
