import { useContext } from "react"
import { UserContext } from "../../context"

const Search = () => {
    const {currentTracks, currentAlbum, searchAlbums, searchTracks,searchIsReady} = useContext(UserContext)
  return (
    <div className="bg-[#1E1E1E] text-white fixed bottom-0 top-24 h-screen w-screen ml-24 p-6 z-50">
      <div>
        <img src={searchAlbums[0].images[0].url} alt="" />
      </div>
    </div>
  )
}

export default Search
