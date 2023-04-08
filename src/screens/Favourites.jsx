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
    <div className="bg-[#1E1E1E] h-full pb-10 font-body p-5 lg:p-8">
      {isNavOpen && <MobileNav handleClick = {handleClick}/>}
    <div className=" px-5 py-5 lg:py-8 lg:px-8">
      <Header handleClick = {handleClick}/>
    </div>
    <div className="flex gap-3 min-h-screen px-5 lg:px-8">
      <DesktopNav handleClick={deskHandleClick}/>
      {searchIsReady ? <Searchs/> : likedIds.length > 0 ? <Likes/> : likedIds.length === 0 && <NoFavourites /> }
    </div>
      {currentAlbum && <MusicPlayer/>}
    </div>
  )
}

export default Favourites
