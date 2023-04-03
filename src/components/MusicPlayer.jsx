import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../context";
import { Link } from "react-router-dom";


const MusicPlayer = () => {
  const {currentTracks, currentAlbum, updateTracks, isPlaying, setIsPlaying} = useContext(UserContext);
  const songs = currentAlbum.tracks.items;
  let currentIndex = songs.findIndex(song => song.id === currentTracks.id);
  const [index, setIndex] = useState(currentIndex);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [repeatOn, setRepeatOn] = useState(false);
  const audioEl = useRef(null);

  const url = currentTracks.preview_url ? currentTracks.preview_url : "";
  const playPauseIcon = isPlaying ? "fa-solid fa-circle-pause text-[#FACD66]" : "fa-solid fa-circle-play text-white";;
  const shuffle = shuffleOn ? "text-[#FACD66]": "text-white";;
  const repeat = repeatOn ? "text-[#FACD66]": "text-white";;
  
  useEffect(() => {
    if(isPlaying){
      audioEl.current.play()
    } else {
      audioEl.current.pause()
    }
  })

    const playNext = () => {
      if (shuffleOn) {
        let randomIndex = Math.floor(Math.random() * songs.length - 1);
        randomIndex = randomIndex < 0 ? 0 : randomIndex;
        updateTracks(songs[randomIndex])
      } 
      else if(repeatOn){
        audioEl.loop = true
      }
      else {
        setIndex(index => {
          let next = index + 1
          if(next > songs.length - 1){
            next = 0
            setIsPlaying(false)
          }
          updateTracks(songs[next])
          return next
        }
          )
      }
      setIsPlaying(true)
    };

  const handleEnded = () => {
    playNext()
  }

  const skipSong = (forwards = true) => {
    if(forwards){
      setIndex((prevIndex) => {
        let temp = prevIndex
        temp++;


        if(temp > songs.length - 1){
          temp = 0
        }

        updateTracks(songs[temp])
        return temp;
      })
    } else {
      setIndex((prevIndex) => {
        let temp = prevIndex
        temp--;


        if(temp === 0){
          temp = songs.length - 1
        }
        
        updateTracks(songs[temp]);
        return temp;
      })
    }
  }

  return (
    <div className='z-50 transition duration-[5000ms] ease-in w-full h-auto py-1 px-6 lg:px-24 bg-zinc-900 fixed bottom-0 opacity-95'>

          <Link to="/Playlists">
          <div className="h-1 w-32 bg-icons rounded-2xl mx-auto mb-3 hidden md:block"></div>
          </Link>

          <div className="block h-1 w-32 bg-icons rounded-2xl mx-auto mb-3 md:hidden"></div>
       
    <div className='flex items-center justify-between mb-2'>
          <audio src={url} ref = {audioEl} onEnded={handleEnded}/>
          <div className="flex gap-3 items-center ">
          <img className="" alt="img" src={currentAlbum.images[2].url}  />
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-sm">{currentTracks.name}</h3>
            <h3 className="text-gray-400 font-light text-xs">{currentTracks.artists[0].name}</h3>
          </div>
          </div>
         
          <div className="hidden sm:flex flex-col items-center gap-4">
            <div className="text-gray-200 text-lg flex gap-8">
              <i class={`${shuffle} fa-solid fa-shuffle`} onClick={() => {setShuffleOn(!shuffleOn)}}></i>
              <i class="fa-solid fa-backward" onClick={() => skipSong(false)}></i>
              <i class={`${playPauseIcon}`} onClick={() => {
                setIsPlaying(!isPlaying)
              }}></i>
              <i class="fa-solid fa-forward" onClick={() => skipSong(true)}></i>
              <i class={`${repeat} fa-solid fa-repeat`} onClick={() => {setRepeatOn(!repeatOn)}}></i>
            </div>
            <input type="range" className="sm:w-[250px] md:w-[420px] lg:w-[745px] accent-[#FACD66]" />
          </div>

          <div className="hidden sm:flex gap-1">
            <i class='fa-solid fa-volume-high text-gray-200 text-sm'></i>
            <input type="range" className="accent-[#FACD66] "/>
          </div>
          <div className="flex gap-5 sm:hidden items-center mr-5">
          <i class={`${playPauseIcon} text-3xl`} onClick={() => {
                setIsPlaying(!isPlaying)
              }}></i>
          <i class="fa-solid fa-forward text-white" 
          onClick={() => skipSong(true)}></i>
          </div>
        </div>
    </div>
  )
}

export default MusicPlayer
