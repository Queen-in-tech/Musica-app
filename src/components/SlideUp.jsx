import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../context";

const SlideUp = ({ audio }) => {
  const { currentTracks, currentAlbum, updateTracks, isPlaying, setIsPlaying } =
    useContext(UserContext);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [repeatOn, setRepeatOn] = useState(false);
  const songs = currentAlbum.tracks.items;
  let currentIndex = songs.findIndex((song) => song.id === currentTracks.id);
  const [index, setIndex] = useState(currentIndex);
  const shuffle = shuffleOn ? "text-[#FACD66]" : "text-white";
  const repeat = repeatOn ? "text-[#FACD66]" : "text-white";
  const playPauseIcon = isPlaying
    ? "fa-solid fa-circle-pause text-[#FACD66]"
    : "fa-solid fa-circle-play text-white";
  const inputEl = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const totalSeconds = Math.floor(audio?.current?.duration);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  const formattedTime =
    audio?.current?.duration > 0 ? `${minutes}:${seconds}` : "00:00";

  const skipSong = (forwards = true) => {
    if (forwards) {
      setIndex((prevIndex) => {
        let temp = prevIndex;
        temp++;

        if (temp > songs.length - 1) {
          temp = 0;
        }

        updateTracks(songs[temp]);
        return temp;
      });
    } else {
      setIndex((prevIndex) => {
        let temp = prevIndex;
        temp--;

        if (temp === 0) {
          temp = songs.length - 1;
        }

        updateTracks(songs[temp]);
        return temp;
      });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const totalSeconds = Math.floor(audio.current.currentTime);
      const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
      const seconds = String(totalSeconds % 60).padStart(2, "0");
      const formattedCurrentTime = `${minutes}:${seconds}`;
      setCurrentTime(formattedCurrentTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying, index, currentIndex, songs, inputEl, shuffleOn, repeatOn]);

  const handleSeek = () => {
    const newTime = inputEl.current.value;
    setCurrentTime(newTime);
    audio.current.currentTime = newTime;
  };

  return (
    <div
      className="text-white text-2xl sm:hidden h-[75
    vh] items-center mx-auto pb-6"
    >
      <img
        className="pt-16 mx-auto"
        alt="img"
        src={currentAlbum.images[1].url}
      />

      <div className="flex flex-col mt-6 items-center">
        <h3 className="text-white font-bold text-md text-center">
          {currentTracks.name}
        </h3>
        <h3 className="text-gray-400 font-light text-sm">
          {currentTracks.artists[0].name}
        </h3>
      </div>

      <div className="flex sm:hidden flex-col items-center gap-6 mt-12">
        <div>
          <input
            type="range"
            className="w-[340px] accent-[#FACD66]"
            min={0}
            max={audio.current.duration}
            value={audio.current.currentTime}
            ref={inputEl}
            onChange={handleSeek}
          />
          <div className="flex justify-between text-lg">
            <p>{currentTime}</p>
            <p>{formattedTime}</p>
          </div>
        </div>
        <div className="text-gray-200 text-2xl flex gap-10">
          <i
            class={`${shuffle} fa-solid fa-shuffle`}
            onClick={() => {
              setShuffleOn(!shuffleOn);
            }}
          ></i>
          <i class="fa-solid fa-backward" onClick={() => skipSong(false)}></i>
          <i
            class={`${playPauseIcon}`}
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}
          ></i>
          <i class="fa-solid fa-forward" onClick={() => skipSong(true)}></i>
          <i
            class={`${repeat} fa-solid fa-repeat`}
            onClick={() => {
              setRepeatOn(!repeatOn);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default SlideUp;
