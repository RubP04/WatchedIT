import React, { useEffect, useState } from 'react'
import Loader from './Loader'

const Watchlist = ({movies, setMovies, completed, setCompleted, setScreen, baseURL}) => {

    const [selected, setSelected] = useState("Watchlist")
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 400)

        return () => clearTimeout(timer)
    }, [isLoading])

    const startLoader = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 200)
    }

    const handleRemove = (index) => {
        event.preventDefault()
        setMovies(movies.filter((_, i) => i !== index))
        startLoader()
    }

    const handleRemoveCompleted = (index) => {
        setCompleted(completed.filter((_, i) => i !== index))
        startLoader()
    }

    const handleCompleted = (movie, index) => {
        setCompleted([movie, ...completed])
        handleRemove(index)
        startLoader()
    }

    const handleMoveUp = (index) => {
        var moviesCopy = [...movies]
        if (index > 0){
            const temp = moviesCopy[index]
            moviesCopy[index] = moviesCopy[index - 1]
            moviesCopy[index - 1] = temp
        }
        setMovies(moviesCopy)
        startLoader()
    }

    const handleMoveDown = (index) => {
        var moviesCopy = [...movies]
        if (index < movies.length - 1){
            const temp = moviesCopy[index]
            moviesCopy[index] = moviesCopy[index + 1]
            moviesCopy[index + 1] = temp
        }
        setMovies(moviesCopy)
        startLoader()
    }

    const handleClearAllDoubleClick = () => {
        if (selected === "Watchlist"){
            setMovies([])
        }
        else{
            setCompleted([])
        }
    }

    const handleClearAllSingleClick = (event) => {
        event.target.innerHTML = "Double Click to Confirm"
        setTimeout(() => {
            event.target.innerHTML = "Clear All"
        }, 450)
    }

    const movieList = movies.map((movie, index) => (
        <li className="movie"
            key={index}>{movie.title}
            <img className="images" src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}></img>
            <div className="btn-container">
                <button className="remove-btn" onClick={() => handleRemove(index)}>Remove</button>
                <button className="add-btn" onClick={() => handleCompleted(movie, index)}>Completed</button>
                <button className="move-btn" disabled={index == 0} onClick={() => handleMoveUp(index)}>Move Up ⬆️</button>
                <button className="move-btn" disabled={index == movies.length - 1} onClick={() => handleMoveDown(index)}>Move Down ⬇️</button>
            </div>
        </li> 
    ))

    const completedList = completed.map((movie, index) => (
        <li className="movie" key={index}>
            {movie.title}
            <img className="images" src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}></img>
            <button className="remove-btn" onClick={() => handleRemoveCompleted(index)}>Remove</button>
        </li>
    ))

  return (
    <>
        <div className="watchlist-container">
            <div className="watchlist-title">
                <h1>Watch List</h1>
            </div>
            <div className="sel-container">
                <select className="reg-btn" value={selected} onChange={() => {
                    setSelected(event.target.value)
                    setIsLoading(true)}}>
                    <option>Watchlist</option>
                    <option>Completed</option>                
                </select>
                <button className="reg-btn" onClick={() => handleClearAllSingleClick(event)} onDoubleClick={() => handleClearAllDoubleClick()}>Clear All</button>
            </div>
            <div>
                <ol className="watchlist">
                    {isLoading ? <div className="loader-container"><Loader/></div>:selected == "Watchlist" ? movieList:completedList}
                </ol>
            </div>
        </div>
    </>
  )
}

export default Watchlist