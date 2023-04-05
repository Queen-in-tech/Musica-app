import { useState, useContext } from "react"
import { UserContext } from "../../context"

import DesktopNav from "../components/DesktopNav"
import Header from "../components/Header"
import Likes from "../components/Likes"
import MobileNav from "../components/MobileNav"
import MusicPlayer from "../components/MusicPlayer"
import NoFavourites from "../components/NoFavourites"
import Searchs from "../components/Searchs"


const Favourites = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [likedIds, setLikedIds] = useState(JSON.parse(localStorage.getItem("likedIds")) || [])
  const {currentAlbum, searchIsReady, setSearchIsReady} = useContext(UserContext)

  const handleClick = () => {
    setIsNavOpen(!isNavOpen)
  }

  const deskHandleClick = () => {
    setSearchIsReady(false)
  };
  
  
  return (
    <div className="bg-[#1E1E1E] h-full pb-10 font-body">
    <div className="pt-6 pb-2 px-8">
      {isNavOpen && <MobileNav handleClick = {handleClick}/>}
      <Header handleClick = {handleClick}/>
    </div>
    <div className="p-1 lg:px-8 flex gap-3 min-h-screen">
      <DesktopNav handleClick={deskHandleClick}/>
      {searchIsReady ? <Searchs/> : likedIds.length > 0 ? <Likes/> : <NoFavourites /> }
      </div>
      {currentAlbum && <MusicPlayer/>}
    </div>
  )
}

export default Favourites
