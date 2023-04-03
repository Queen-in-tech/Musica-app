import { useContext, useRef, useState } from "react"
import qs from "qs"
import { UserContext } from "../../context"

const Header = ({handleClick}) => {
  const searchRef = useRef(null)
  const clientId = "69373bc5c3094a578305a7e175bbe480";
  const clientSecret = "93449601c6c44e2fb4efce1e190300a2";
  const refreshToken = (localStorage.getItem('refreshToken'))
  const [token, setToken] = useState(localStorage.getItem("token"))
  const {setSearchAlbums, setSearchTracks, setSearchIsReady} = useContext(UserContext)

    const getSearchKey = async (e) => {
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

      if(e.key == "Enter" ) {
        try {
          const res = await fetch(`https://api.spotify.com/v1/search?q=${searchRef.current.value}&type=album,track`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          if(res.ok){
            const data = await res.json()
            setSearchAlbums(data.albums.items)
            setSearchTracks(data.tracks.items)
            setSearchIsReady(true)
            searchRef.current.value = "" 
          }
          else if(res.status === 401){
            const newToken = await refreshAccessToken();
            setToken(newToken); 
            setSearchIsReady(false)
          }
          else{
            throw new error('Resquest failed')
          } 
        } 
        catch (error) {
          console.error(error)
        }
      }
    }
  
  return (
   
    <div className='mb-8 flex justify-between px-3 pt-4 sm:p-0 shrink-o items-center'>
        <div className='flex'>
        <i class="fa-solid fa-bars text-white mr-4 text-2xl cursor-pointer lg:hidden" onClick ={handleClick}></i>
        <img src="logo.svg" alt="" className='mr-16 ml-2'/>
        </div>
        <div className='bg-iconsBg p-3 rounded-2xl bg-[#0505052c] items-center w-full hidden sm:flex'>
        <i class="fa-solid fa-search text-gray-600 mr-4" onClick={getSearchKey}></i> 
        <input type="text" onKeyDown={getSearchKey} ref={searchRef} className='bg-transparent text-zinc-300 placeholder:text-gray-500 outline-none w-full' placeholder='Search artists'/>
        </div>
        <i class="fa-solid fa-search text-icons text-2xl sm:hidden"></i> 
    </div>
  )
}

export default Header
