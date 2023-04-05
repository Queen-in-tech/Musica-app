import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../context";
import { Link } from "react-router-dom";
import SlideUp from "./SlideUp";


const MusicPlayer = () => {
  const {currentTracks, currentAlbum, updateTracks, isPlaying, setIsPlaying, setSearchIsReady, slideUp, setSlideUp} = useContext(UserContext);
  const songs = currentAlbum.tracks.items;
  let currentIndex = songs.findIndex(song => song.id === currentTracks.id);
  const [index, setIndex] = useState(currentIndex);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [repeatOn, setRepeatOn] = useState(false);
  const audioEl = useRef(null);
  const inputEl = useRef(null);


  const url = currentTracks.preview_url ? currentTracks.preview_url : "";
  const playPauseIcon = isPlaying ? "fa-solid fa-circle-pause text-[#FACD66]" : "fa-solid fa-circle-play text-white";
  const shuffle = shuffleOn ? "text-[#FACD66]": "text-white";
  const repeat = repeatOn ? "text-[#FACD66]": "text-white";
  
  const [currentTime, setCurrentTime] = useState("00:00")
  const [duration, setDuration] = useState("00:00")
  const [inputCurrentTime, setInputCurrentTime] = useState(0);
  const [inputDuration, setInputDuration] = useState(0);


  

  useEffect(() => {
    isPlaying ? audioEl.current.play() : audioEl.current.pause()
    
    if(isPlaying){
      setInputCurrentTime(audioEl.current.currentTime)
      setInputDuration(audioEl.current.duration)

    const totalSeconds = Math.floor(audioEl.current.duration);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const formattedTime = `${minutes}:${seconds}`;
    setDuration(formattedTime)

    const intervalId = setInterval(() => {
      const totalSeconds = Math.floor(audioEl.current.currentTime);
      const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
      const seconds = String(totalSeconds % 60).padStart(2, '0');
      const formattedCurrentTime = `${minutes}:${seconds}`;
      setCurrentTime(formattedCurrentTime);
    }, 1000);

    return () => clearInterval(intervalId);
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

  const handleSeek = () => {
    const newTime = inputEl.current.value;
    setCurrentTime(newTime);
    audioEl.current.currentTime = newTime;
}


  return (
    <div className='z-50 transition duration-[5000ms] ease-in w-full h-auto py-1 px-6 lg:px-24 bg-zinc-900 fixed bottom-0 opacity-95'>

          <Link to="/Playlists" onClick={() => setSearchIsReady(false)}>
          <div className="h-1 w-32 bg-icons rounded-2xl mx-auto mb-3 hidden md:block" ></div>
          </Link>

          <div 
          className="block h-1 w-32 bg-icons rounded-2xl mx-auto mb-2 md:hidden" 
          onClick={() => {
          setSearchIsReady(false)
          setSlideUp(!slideUp)
          }}>
          </div>

          {slideUp && <SlideUp audio={audioEl}/>}
       
    <div className='flex items-center justify-between mb-2'>
          <audio src={url} ref = {audioEl} onEnded={handleEnded}/>
          {!slideUp && <div className="flex gap-3 items-center sm:hidden ">
          <img className="" alt="img" src={currentAlbum.images[2].url}  />
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-sm">{currentTracks.name}</h3>
            <h3 className="text-gray-400 font-light text-xs">{currentTracks.artists[0].name}</h3>
          </div>
          </div>}

          <div className="hidden sm:flex gap-3 items-center ">
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
            <div className="flex justify-between text-lg gap-3 text-white">
            <p>{currentTime}</p>
            <input 
            type="range" 
            className="sm:w-[250px] md:w-[420px] lg:w-[745px] accent-[#FACD66]"
            min={0} 
            max={inputDuration} 
            value={inputCurrentTime} 
            ref={inputEl}
            onChange={handleSeek}
            />
            <p>{duration}</p>
            </div>
          </div>
          

          <div className="hidden sm:flex gap-1">
            <i class='fa-solid fa-volume-high text-gray-200 text-sm'></i>
            <input type="range" className="accent-[#FACD66] "/>
          </div>

          {!slideUp && <div className="flex gap-5 sm:hidden items-center mr-5">
          <i class={`${playPauseIcon} text-3xl`} onClick={() => {
                setIsPlaying(!isPlaying)
              }}></i>
          <i class="fa-solid fa-forward text-white" 
          onClick={() => skipSong(true)}></i>
          </div>}
        </div>
    </div>
  )
}

export default MusicPlayer
