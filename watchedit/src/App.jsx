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
  const [validated, setValidated] = useState(false)
  const baseURL = "http://127.0.0.1:5000"
  const loginProps = {setScreen, baseURL, validated, setValidated}
  const findMovieProps = {movies, setMovies, completed, options, setOptions, setScreen, baseURL}
  const watchlistProps = {movies, setMovies, completed, setCompleted, setScreen, baseURL}

  useEffect(() =>{
    fetch(`${baseURL}/retrieve/data`, {credentials:"include"})
    .then(response => response.json())
    .then(data => {
      setMovies(data.movies)
      console.log(movies)
    })
  }, [validated])

  useEffect(() => {
    const sendData = async () =>{
      await fetch(`${baseURL}/update/data`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          user_movies: movies,
          completed_list: completed,
        })
      })
    }
    sendData()
  }, [movies, completed])

  return (
    <>
      <NavBar setScreen={setScreen}/>
      {screen == "home" ? <Home/>:screen=="login" ? <Login {...loginProps}/>:screen=="findmovies" ? <FindMovies {...findMovieProps}/>:<Watchlist {...watchlistProps}/>}
    </>
  )
}

export default App
