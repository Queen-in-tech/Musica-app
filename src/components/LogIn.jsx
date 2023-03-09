const LogIn = () => {

const handleClick = () => {
    const clientId = "69373bc5c3094a578305a7e175bbe480";
    const redirectUrl = "http://localhost:5173/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token&show_dialogue=true`;
}

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw] gap-4 bg-[#1db954]">
      <img src="http://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="Spotify logo" className="h-[20vh]"/>
      <button className="py-2 px-5 rounded-2xl bg-black text-[#49f585] hover:ring-2" onClick={handleClick}>Connect To Spotify</button>
    </div>
  )
}

export default LogIn
