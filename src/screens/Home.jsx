import { useState } from "react"

import DesktopNav from "../components/DesktopNav"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Charts from "../components/Charts"
import MobileNav from "../components/MobileNav"
import Releases from "../components/Releases"

const Home = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const handleClick = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <div className="bg-[#1E1E1E] p-5 h-auto sm:py-6 sm:px-8 font-body">
    {isNavOpen && <MobileNav handleClick = {handleClick}/>}
    <Header handleClick = {handleClick}/>
    <div className="md:flex">
    <DesktopNav />
    <Hero />
    <Charts />
    </div>
    <Releases />
    </div>
  )
}

export default Home
