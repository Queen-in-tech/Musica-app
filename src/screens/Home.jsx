import { useState, useEffect } from "react"

import DesktopNav from "../components/DesktopNav"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Charts from "../components/Charts"
import MobileNav from "../components/MobileNav"
import Releases from "../components/Releases"
import MusicPlayer from "../components/MusicPlayer"


const Home = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");

    const searchArtiste = () => {
      fetch(`https://api.spotify.com/v1/search?q=album&type=album`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then((res) => (res.json()))
      .then((data) => {
        let albums = data.albums.items
        console.log(albums)
        setAlbums(albums)
      })
    }
    searchArtiste()
}, [])

    const randomAlbums = [];
    const numAlbums = albums.length;
    if (numAlbums >= 3) {
    while (randomAlbums.length < 3) {
    const randomIndex = Math.floor(Math.random() * numAlbums);
    const randomAlbum = albums[randomIndex];

    if (!randomAlbums.includes(randomAlbum)) {
      randomAlbums.push(randomAlbum);
    }
    console.log(randomAlbums)
  }
   }

  const [isNavOpen, setIsNavOpen] = useState(false)
  const handleClick = () => {
    setIsNavOpen(!isNavOpen)
  };
  
  return (
    <div className="">
    <div className="bg-[#1E1E1E] px-5 py-5 h-full w-full lg:py-8 lg:px-8 font-body min-h-screen">
    {isNavOpen && <MobileNav handleClick = {handleClick}/>}
    <Header handleClick = {handleClick}/>
    <div className="lg:flex">
    <DesktopNav />
    <Hero />
    <Charts charts = {randomAlbums}/>
    </div>
    <Releases albums= {albums} />
    </div>
    <MusicPlayer />
    </div>
  )
}

export default Home
