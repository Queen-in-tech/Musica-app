import { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import LogIn from "./components/LogIn";
import Home from "./screens/Home"
import Favourites from "./screens/Favourites"
import Album from "./screens/Album"
import Videos from "./screens/Videos"



const App = () => {
    const [token, setToken] = useState("")

    useEffect(() => {
        const _token = window.localStorage.getItem("token")
        const hash = window.location.hash;
        window.location.hash = ''
        if (!_token && hash){
        const token = hash.substring(1).split("&")[0].split('=')[1]
        window.localStorage.setItem("token", token)
        setToken(token)
        } else {
            setToken(_token)
        }
      }, [])
    

  return (
    !token ? <LogIn/> : 
    <div>
        <Router>
            <Routes>
                <Route path="/" element= {<Home/>}/>
                <Route path="/Album" element= {<Album/>}/>
                <Route path="/Favourites" element= {<Favourites/>}/>
                <Route path="/Video" element= {<Videos/>}/>
            </Routes>
        </Router>
        
    </div>
    
  )
}

export default App
