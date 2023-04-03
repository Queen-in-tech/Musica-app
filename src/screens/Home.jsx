import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../context"
import qs from "qs"

import DesktopNav from "../components/DesktopNav"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Charts from "../components/Charts"
import MobileNav from "../components/MobileNav"
import Releases from "../components/Releases"
import MusicPlayer from "../components/MusicPlayer"
import Searchs from "../components/Searchs"


const Home = () => {
  const [albums, setAlbums] = useState([]);
  const clientId = "69373bc5c3094a578305a7e175bbe480";
  const clientSecret = "93449601c6c44e2fb4efce1e190300a2";
  const refreshToken = localStorage.getItem('refreshToken')
  const [token, setToken] = useState(localStorage.getItem('accessToken'))
  const [resStatus, setResStatus] = useState(false)
  const [errorReload, setErrorReload] = useState(false)
  const {currentAlbum, searchIsReady,  setSearchIsReady} = useContext(UserContext)
  useEffect(() => {
    const getAlbums = async () => {
    try{
        const res = await fetch(`https://api.spotify.com/v1/search?q=album&type=album`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        setResStatus(res.status)
        if(res.ok){
          const data = await res.json()
          let albums = data.albums.items
          setAlbums(albums)
        }
        else if(res.status === 401){
          const newToken = await refreshAccessToken();
             setToken(newToken);
             setErrorReload(true) 
        }
        else{
          throw new error('Resquest failed')
        }
      }
    catch(error){
      console.error(error)
    }
  }
    getAlbums()
}, [errorReload])

const refreshAccessToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: qs.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    }),
    });
    const data = await response.json();
    return data.access_token
}


    const randomAlbums = [];
    const numAlbums = albums.length;
    if (numAlbums >= 3) {
    while (randomAlbums.length < 3) {
    const randomIndex = Math.floor(Math.random() * numAlbums);
    const randomAlbum = albums[randomIndex];

    if (!randomAlbums.includes(randomAlbum)) {
      randomAlbums.push(randomAlbum);
    }
  }
   }

  const [isNavOpen, setIsNavOpen] = useState(false)
  const handleClick = () => {
    setIsNavOpen(!isNavOpen)
    setSearchIsReady(false)
  };

  const deskHandleClick = () => {
    setSearchIsReady(false)
  };
  
  return (
    <div className="">
    <div className="bg-[#1E1E1E] px-5 py-5 h-full w-full lg:py-8 lg:px-8 font-body min-h-screen">
    {isNavOpen && <MobileNav handleClick = {handleClick}/>}
    <Header handleClick = {handleClick}/>
    <div className="lg:flex">
    <DesktopNav handleClick = {deskHandleClick}/>
    {searchIsReady ? <Searchs/> : <div className="lg:flex">
    <Hero />
    <Charts charts = {randomAlbums}/>
    </div>}
    </div>
    {!searchIsReady && <Releases albums= {albums} />}
    </div>
    {currentAlbum && <MusicPlayer/>}
    </div>
  )
}

export default Home
