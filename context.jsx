import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [currentTracks, setCurrentTracks] = useState(null);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchAlbums, setSearchAlbums] = useState()
  const [searchTracks, setSearchTracks] = useState()
  const [searchIsReady, setSearchIsReady] = useState(false)
  

  const updateTracks = (tracks) => {
    setCurrentTracks(tracks);
  };

  const updateAlbum = (album) => {
    setCurrentAlbum(album);
  };


  return (
    <UserContext.Provider value={{ currentTracks, setCurrentTracks, currentAlbum,setCurrentAlbum, updateTracks, updateAlbum, isPlaying ,setIsPlaying, searchAlbums, setSearchAlbums, searchTracks, setSearchTracks, searchIsReady, setSearchIsReady}}>
      {children}
    </UserContext.Provider>
  );
};
