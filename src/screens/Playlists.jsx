import { useEffect, useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import qs from "qs";
import DesktopNav from "../components/DesktopNav";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import MusicPlayer from "../components/MusicPlayer";
import AlbumsDetails from "../components/AlbumsDetails";
import Searchs from "../components/Searchs";
import { UserContext } from "../../context";

const Album = () => {
  const albumId = localStorage.getItem("albumId");
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [album, setAlbum] = useState([]);
  const [track, setTrack] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const refreshToken = localStorage.getItem("refreshToken");
  const [errorReload, setErrorReload] = useState(false);
  const { currentAlbum, searchIsReady, setSearchIsReady } =
    useContext(UserContext);
  const handleClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const fecthData = async () => {
    try {
      const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        let albums = data.tracks;
        setTrack(albums);
        setAlbum(data);
        setIsReady(true);
      } else if (res.status === 401) {
        const newToken = await refreshAccessToken();
        setToken(newToken);
        setErrorReload(true);
      } else {
        throw new error("Resquest failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fecthData();
  }, [errorReload, searchIsReady]);

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
    return data.access_token;
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      {isNavOpen && <MobileNav handleClick={handleClick} />}
      <div className="px-5 py-5 lg:py-8 lg:px-8 ">
        <Header handleClick={handleClick} />
      </div>
      <div className="min-h-screen flex gap-3 px-5 lg:px-8 ">
        <DesktopNav />
        {searchIsReady ? (
          <Searchs />
        ) : isReady && albumId ? (
          <AlbumsDetails track={track} album={album} />
        ) : (
          <div className="h-20 w-20 mx-auto sm:h-28 sm:w-32">
            <ThreeDots
              radius="9"
              color="rgba(239, 238, 224, 0.25)"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        )}
      </div>
      {currentAlbum && <MusicPlayer />}
    </div>
  );
};

export default Album;
