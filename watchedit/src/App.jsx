import { useEffect, useState } from "react"
import NavBar from "./Components/NavBar"
import Home from "./Components/Home"
import Watchlist from "./Components/Watchlist"
import FindMovies from "./Components/FindMovies"
import Login from "./Components/Login"

function App() {

  const [screen, setScreen] = useState("home")
  const [movies, setMovies] = useState([])
  const [options, setOptions] = useState([])
  const [completed, setCompleted] = useState([])
  const baseURL = "http://127.0.0.1:5000"
  const loginProps = {setScreen, baseURL}
  const findMovieProps = {movies, setMovies, completed, options, setOptions, setScreen, baseURL}
  const watchlistProps = {movies, setMovies, completed, setCompleted, setScreen, baseURL}

  useEffect(() =>{
    fetch(`${baseURL}/sync/data`, {credentials:"include"})
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  }, [])

  return (
    <>
      <NavBar setScreen={setScreen}/>
      {screen == "home" ? <Home/>:screen=="login" ? <Login {...loginProps}/>:screen=="findmovies" ? <FindMovies {...findMovieProps}/>:<Watchlist {...watchlistProps}/>}
    </>
  )
}

export default App
