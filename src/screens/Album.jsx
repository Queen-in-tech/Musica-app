import { useState } from "react"

import DesktopNav from "../components/DesktopNav"
import Header from "../components/Header"
import MobileNav from "../components/MobileNav"
import MusicPlayer from "../components/MusicPlayer"

const Album = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const handleClick = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <div>
    <div className="bg-[#1E1E1E] h-[100vh] py-6 px-8">
      {isNavOpen && <MobileNav handleClick = {handleClick}/>}
      <Header handleClick = {handleClick}/>
      <DesktopNav />
    </div>
    <MusicPlayer />
    </div>
  )
}

export default Album
