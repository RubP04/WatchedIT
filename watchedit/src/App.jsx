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
  const findMovieProps = {movies, setMovies, completed, options, setOptions}
  const watchlistProps = {movies, setMovies, completed, setCompleted}

  return (
    <>
      <NavBar setScreen={setScreen}/>
      {screen == "home" ? <Home {...loginProps}/>:screen=="login" ? <Login/>:screen=="findmovies" ? <FindMovies {...findMovieProps}/>:<Watchlist {...watchlistProps}/>}
    </>
  )
}

export default App
