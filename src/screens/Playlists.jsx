import { useEffect, useState, useContext } from "react"
import { ThreeDots } from  'react-loader-spinner'
import qs from "qs"
import DesktopNav from "../components/DesktopNav"
import Header from "../components/Header"
import MobileNav from "../components/MobileNav"
import MusicPlayer from "../components/MusicPlayer"
import AlbumsDetails from "../components/AlbumsDetails"
import { UserContext } from "../../context"


const Album = () => {
  const albumId = localStorage.getItem('albumId')
  const [token, setToken] = useState(localStorage.getItem('accessToken'))
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [album, setAlbum] = useState([]);
  const [track, setTrack] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const clientId = "69373bc5c3094a578305a7e175bbe480";
  const clientSecret = "93449601c6c44e2fb4efce1e190300a2";
  const refreshToken = (localStorage.getItem('refreshToken'))
  const [errorReload, setErrorReload] = useState(false)
  const {currentTracks, currentAlbum} = useContext(UserContext)
  const handleClick = () => {
    setIsNavOpen(!isNavOpen)
  }

  useEffect(() => {
    const fecthData = async() => {
      try{
        const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
             headers: {
               Authorization: `Bearer ${token}`
             },
           })
   
           if(res.ok){
             const data = await res.json()
             let albums = data.tracks
             setTrack(albums)
             setAlbum(data)
             setIsReady(true)
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
       catch (error) {
         console.error(error);
       }
    }
    fecthData()
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


  return (
    <div className="bg-[#1E1E1E]">
    <div className="pt-8 pb-4 px-8">
      {isNavOpen && <MobileNav handleClick = {handleClick}/>}
      <Header handleClick = {handleClick}/>
    </div>
    <div className="min-h-screen flex gap-3 px-2 md:px-6 pb-5">
      <DesktopNav />
      {isReady && albumId ? <AlbumsDetails track={track} album={album} /> : <div className="h-20 w-20 mx-auto sm:h-28 sm:w-32">
      <ThreeDots  
        radius="9"
        color="rgba(239, 238, 224, 0.25)" 
        ariaLabel="three-dots-loading"
        visible={true}/>
        </div>}
      </div>
      {currentAlbum && <MusicPlayer/>}
    </div>
  )
}

export default Album
