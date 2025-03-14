import { useEffect, useState } from "react"
import NavBar from "./Components/NavBar"
import Home from "./Components/Home"
import Watchlist from "./Components/Watchlist"
import FindMovies from "./Components/FindMovies"
import Login from "./Components/Login"

function App() {

  const [screen, setScreen] = useState("Home")
  const [movies, setMovies] = useState([])
  const [options, setOptions] = useState([])
  const [completed, setCompleted] = useState([])
  const [validated, setValidated] = useState(false)
  const baseURL = "http://127.0.0.1:5000"
  const navBarProps = {screen, setScreen, setOptions, validated, setValidated, baseURL}
  const loginProps = {setScreen, baseURL, validated, setValidated}
  const findMovieProps = {movies, setMovies, completed, options, setOptions, baseURL}
  const watchlistProps = {movies, setMovies, completed, setCompleted}

  useEffect(() =>{
    fetch(`${baseURL}/retrieve/data`, {credentials:"include"})
    .then(response => response.json())
    .then(data => {
      setMovies(data.movies)
      setCompleted(data.completed)
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
    if(validated){
      sendData()
    }
  }, [movies, completed])

  return (
    <>
      <NavBar {...navBarProps}/>
      {screen == "Home" ? <Home/>:screen=="Login" ? <Login {...loginProps}/>:screen=="Find Movies" ? <FindMovies {...findMovieProps}/>:<Watchlist {...watchlistProps}/>}
    </>
  )
}

export default App
