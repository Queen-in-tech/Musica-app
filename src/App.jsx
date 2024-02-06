import { useEffect, useState } from "react";
import qs from "qs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "../context";
import LogIn from "./components/LogIn";
import Home from "./screens/Home";
import Favourites from "./screens/Favourites";
import Playlists from "./screens/Playlists";
import Videos from "./screens/Videos";

const App = () => {
  const [code, setCode] = useState("");
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || ""
  );
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const redirectPath = "/";
  const redirectUri = window.location.origin + redirectPath;

  useEffect(() => {
    const queryString = window.location.search;
    if (queryString.length > 0) {
      const params = new URLSearchParams(queryString);
      const code = params.get("code");
      setCode(code);
    }
    window.history.pushState(" ", " ", redirectUri);
  }, []);

  const exchangeCodeForToken = async () => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: qs.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      console.log(data.access_token, data.refresh_token);
      window.localStorage.setItem("refreshToken", data.refresh_token);
      window.localStorage.setItem("accessToken", data.access_token);
    } else {
      console.log("Error exchanging code for token:", data.error);
    }
  };

  useEffect(() => {
    if (code) {
      exchangeCodeForToken();
    }
  }, [code]);

  return !accessToken ? (
    <LogIn />
  ) : (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Playlists" element={<Playlists />} />
          <Route path="/Favourites" element={<Favourites />} />
          <Route path="/Video" element={<Videos />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
