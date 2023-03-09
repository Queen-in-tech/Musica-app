import { useState, useEffect } from "react"
import Liked from "./Liked"

const Likes = ({album}) => {
  const [albums, setAlbums] = useState([])
  useEffect(() => {
    const likedIds = JSON.parse(window.localStorage.getItem("likedIds"))
    const token = window.localStorage.getItem("token")
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
        console.log(albums)
        setAlbums(albums)
      })
    } 
    showLiked()
  }, [])

  return (
    <div className="grid grid-flow-row grid-rows-4">
      {albums.map((album) => {
        <Liked album={album} />
      })}
    </div>
  )
}

export default Likes
