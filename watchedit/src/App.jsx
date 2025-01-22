import { useState } from "react"
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
  const loginProps = {setScreen}
  const findMovieProps = {movies, setMovies, completed, options, setOptions, setScreen}
  const watchlistProps = {movies, setMovies, completed, setCompleted, setScreen}

  return (
    <>
      <NavBar setScreen={setScreen}/>
      {screen == "home" ? <Home/>:screen=="login" ? <Login {...loginProps}/>:screen=="findmovies" ? <FindMovies {...findMovieProps}/>:<Watchlist {...watchlistProps}/>}
    </>
  )
}

export default App
