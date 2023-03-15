import { useEffect, useState } from "react"

import DesktopNav from "../components/DesktopNav"
import Header from "../components/Header"
import MobileNav from "../components/MobileNav"
import MusicPlayer from "../components/MusicPlayer"
import AlbumsDetails from "../components/AlbumsDetails"


const Album = () => {
  const albumId = localStorage.getItem('albumId')
  const token = localStorage.getItem('accessToken')
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [album, setAlbum] = useState([]);
  const [track, setTrack] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const handleClick = () => {
    setIsNavOpen(!isNavOpen)
  }

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        .then((res) => (res.json()))
        .then((data) => {
          let albums = data.tracks
          setTrack(albums)
          setAlbum(data)
          setIsReady(true)
          console.log(data.tracks)
        })
  }, [albumId])

  console.log(track)

  return (
    <div className="bg-[#1E1E1E] h-full">
    <div className="pt-8 pb-4 px-8">
      {isNavOpen && <MobileNav handleClick = {handleClick}/>}
      <Header handleClick = {handleClick}/>
    </div>
    <div className="min-h-screen flex gap-3 px-2 md:px-6 pb-5">
      <DesktopNav />
      {isReady && albumId ? <AlbumsDetails track={track} album={album} /> : <div className="text-2xl md:text-4xl text-gray-300 p-3 font-body">loading...</div>}
      </div>
    <MusicPlayer />
    </div>
  )
}

export default Album
