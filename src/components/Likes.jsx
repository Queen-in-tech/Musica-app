import { useState, useEffect } from "react"
import Liked from "./Liked"

const Likes = ({album}) => {
  const [albums, setAlbums] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    const likedIds = JSON.parse(window.localStorage.getItem("likedIds"))
    const token = window.localStorage.getItem("accessToken")
    const showLiked = () => {
      Promise.all(
        likedIds.map((liked) => {
          return fetch(`https://api.spotify.com/v1/albums/${liked}`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then((res) => (res.json()))
        })
      )
      .then((res) => {
        const albums = res.map((album) => album)
        setData(res)
        setAlbums(albums)
      })
    } 
    showLiked()
  }, [data])

  return (
    <div className="h-full grid gap-y-7 gap-x-3 mx-auto grid-cols-2 sm:grid-cols-3 sm:gap-7 md:grid-cols-4 md:gap-10 lg:grid-cols-6 lg:mx-0 pb-20 md:shrink">
      {albums.map((album) => {
       return <Liked album={album} />
      })}
    </div>
  )
}

export default Likes
