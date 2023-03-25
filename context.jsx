import { createContext, useState } from "react";

export const UserContext = createContext({
  currentTracks: null,
  setCurrentTracks: () => {},
});

export const UserProvider = ({ children }) => {
  const [currentTracks, setCurrentTracks] = useState(null);
  const [currentAlbum, setCurrentAlbum] = useState(null);

  return (
    <UserContext.Provider value={{ currentTracks, setCurrentTracks, currentAlbum,setCurrentAlbum}}>
      {children}
    </UserContext.Provider>
  );
};
