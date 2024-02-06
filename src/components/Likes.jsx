import { useState, useEffect } from "react";
import Liked from "./Liked";
import qs from "qs";
import { ThreeDots } from "react-loader-spinner";

const Likes = () => {
  const [albums, setAlbums] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [liked, setLiked] = useState(true);
  const likedIds = JSON.parse(window.localStorage.getItem("likedIds"));
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    const showLiked = async () => {
      if (likedIds.length > 0) {
        const likedAlbums = await Promise.all(
          likedIds.map(async (liked) => {
            try {
              const res = await fetch(
                `https://api.spotify.com/v1/albums/${liked}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (res.ok) {
                const data = await res.json();
                setIsReady(true);
                return data;
              } else if (res.status === 401) {
                const newToken = await refreshAccessToken();
                setToken(newToken);
              }
            } catch (error) {
              console.error(error);
            }
          })
        );
        setAlbums(likedAlbums.filter((album) => album !== undefined));
      }
    };
    showLiked();
  }, [likedIds]);

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
    <div className="h-full grid gap-y-7 gap-x-3 mx-auto grid-cols-2 sm:grid-cols-3 sm:gap-7 md:grid-cols-4 md:gap-10 lg:grid-cols-6 lg:mx-0 pb-20 md:shrink">
      {isReady ? (
        albums.map((album) => {
          return <Liked album={album} key={album.id} />;
        })
      ) : (
        <ThreeDots
          height="80"
          width="100"
          radius="9"
          color="rgba(239, 238, 224, 0.25)"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      )}
    </div>
  );
};

export default Likes;
