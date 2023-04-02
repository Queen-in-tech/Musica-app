import { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../../context";
import Tracks from "./Tracks";

const AlbumsDetails = ({track, album}) => {
    const likedIds = JSON.parse(localStorage.getItem('likedIds')) || [];
    const [isInFavourite, setIsInFavourite] = useState();
    const {setCurrentTracks, setCurrentAlbum, updateTracks, isPlaying , setIsPlaying} = useContext(UserContext);

    
    
    const playPauseIcon = isPlaying ? "fa-solid fa-circle-pause" : "fa-solid fa-circle-play";
    const playPauseText = isPlaying ? "Pause all" : "Play all";

    const handleCurrentTrack = (track) => {
        setCurrentTracks(track)
        setCurrentAlbum(album)
        setIsPlaying(!isPlaying)
      }

    useEffect(() => {
        if(likedIds.includes(album.id)){
            setIsInFavourite(true)
        }
        else{
            setIsInFavourite(false)
        }
      }, [likedIds]);


    const isAlreadyLiked = isInFavourite ? "fa-solid fa-heart" : "fa-regular fa-heart" 
    const faveId = isInFavourite ? "Remove from favourites": "Add to favourites"

    const favourite = (albumId) => {
        const likedIds = JSON.parse(localStorage.getItem('likedIds')) || []; 

    if (likedIds.includes(albumId)) {
        const updatedIds = likedIds.filter(id => id !== albumId);
        localStorage.setItem('likedIds', JSON.stringify(updatedIds));
        setIsInFavourite(false)
    } else {
        likedIds.push(albumId);
        localStorage.setItem('likedIds', JSON.stringify(likedIds));
        setIsInFavourite(true)
    }
} 


    
  return (
    <div className="mx-auto lg:mx-0 shrink md:shrink-0">
    <div className='flex flex-col sm:flex-row sm:gap-8 font-body md:mx-0'>
        <img src={album.images[1].url} alt="album-img" className="rounded-lg w-[350px] mx-auto sm:mx-0 sm:w-80 sm:mb-8"/>
        <div className='text-white mt-3 sm:mt-32 pl-2'>
            <p className='text-4xl text-[#A4C7C6] font-bold capitalize mb-3 max-w-sm md:max-w-md'>{album.name}</p>
            <p className='text-xs mb-1 text-gray-300 w-[340px] sm:w-80 md:w-96 lg:w-[564px]'>{album.copyrights[0].text}</p>
            <p className="text-sm mb-4 text-gray-300 w-[350px] sm:w-80 md:w-96 lg:w-[564px]">{`${album.total_tracks} tracks - ${album.release_date}`}</p>
            <div className="flex gap-6 mb-5">
                <div className="bg-[#33373B] py-2 px-3 flex rounded-xl items-center">
                    <i class={`${playPauseIcon} mr-3 text-[#FACD66]`}></i>
                    <span className="text-xs font-light" onClick={() => handleCurrentTrack(track.items[0])}>{`${playPauseText}`}</span>
                </div>
                <div className="bg-[#33373B] py-2 px-3 rounded-xl flex items-center">
                    <i class={`${isAlreadyLiked} mr-3 text-[#FACD66] text-xs cursor-pointer`} onClick={() => favourite(album.id)}></i>
                    <span className="text-xs font-light">{`${faveId}`}</span>
                </div>
            </div>
        </div>
    </div>
        <div className="pb-20">
        <Tracks tracks={track.items} album={album}/>
        </div>
    </div>
  )
}

export default AlbumsDetails
