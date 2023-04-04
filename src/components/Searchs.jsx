import React from 'react'
import { ThreeDots } from  'react-loader-spinner'
import Search from './Search'
import qs from "qs"
import { useContext, useState} from "react"
import { UserContext } from "../../context"

const Searchs = () => {
    const {nextData, setNextData, prevData, setPrevData, setSearchIsReady, searchAlbums, setSearchAlbums, searchIsReady} = useContext(UserContext)
    const clientId = "69373bc5c3094a578305a7e175bbe480";
    const clientSecret = "93449601c6c44e2fb4efce1e190300a2";
    const refreshToken = (localStorage.getItem('refreshToken'))
    const [token, setToken] = useState(localStorage.getItem("token"))
  

    const loadNext = async() => {
        try {
          const res = await fetch(`${nextData}`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          if(res.ok){
            const data = await res.json();
            console.log(data)
            setNextData(data.albums.next);
            setPrevData(data.albums.previous);
            setSearchAlbums(data.albums.items)
            setSearchIsReady(true)
          }
          else if(res.status === 401){
            const newToken = await refreshAccessToken();
            setToken(newToken); 
          }
          else{
            throw new error('Resquest failed')
          } 
        } 
        catch (error) {
          console.error(error)
        }
  }

  const loadPrev = async() => {
    try {
      const res = await fetch(`${prevData}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      if(res.ok){
        const data = await res.json();
        setPrevData(data.albums.previous);
        setSearchAlbums(data.albums.items)
        setSearchIsReady(true)
      }
      else if(res.status === 401){
        const newToken = await refreshAccessToken();
        setToken(newToken); 
      }
      else{
        throw new error('Resquest failed')
      } 
    } 
    catch (error) {
      console.error(error)
    }
}

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
    <div className='flex flex-col pb-20'>
    <div className="h-full grid gap-y-7 gap-x-3 mx-auto grid-cols-2 sm:grid-cols-3 sm:gap-7 md:grid-cols-4 md:gap-10 lg:grid-cols-6 lg:mx-0 pb-10 md:shrink">
      {searchIsReady? searchAlbums.map((album) => {
       return <Search album={album} key={album.id}/>
      }) : <ThreeDots 
      height="80" 
      width="100" 
      radius="9"
      color="rgba(239, 238, 224, 0.25)" 
      ariaLabel="three-dots-loading"
      visible={true}/>}
    </div>
    <div className='mx-auto flex gap-5'>
    {prevData && <button className='text-white text-2xl text-center hover:text-[#FACD66]' onClick={loadPrev}>Prev</button>}
    <button className='text-white text-2xl text-center hover:text-[#FACD66]' onClick={loadNext}>Next</button>
    </div>
    </div>
  )
}

export default Searchs
