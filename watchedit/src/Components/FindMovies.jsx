import React, { useEffect, useState } from 'react'
import Loader from "./Loader"

const FindMovies = ({movies, setMovies, completed, options, setOptions}) => {

    /*const [options, setOptions] = useState([])*/
    const [isLoading, setIsLoading] = useState(false)
    const [genres, setGenres] = useState([])
    const [select, setSelect] = useState()
    const [query, setQuery] = useState("")

    useEffect(() =>{
        fetch("http://127.0.0.1:5000/tmdb/genres")
            .then(response => response.json())
            .then(data => {
                setGenres(data)
            })
        startLoader(400)
    }, [])

    const startLoader = (loadTime) => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, loadTime)
    }

    const handleAdd = (movie, event) => {
        setMovies([...movies, movie])
        event.target.innerHTML = "SUCCESS!"
        setTimeout(() => {
            event.target.innerHTML = "Add to Watchlist"
        }, 250)
    }

    const handleOptionClick = (option) => {
        startLoader(400)
        fetch(`http://127.0.0.1:5000/tmdb/${option}`)
            .then((response) => response.json())
            .then((data) => {
                setOptions(data)
            })
    }

    const handleQueryChange = (event) => {
        setQuery(event.target.value)
    }

    const api_post_call = async (url, val) =>{
        setIsLoading(true)
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(val)
        })
        const data = await response.json()
        setOptions(data)
        setIsLoading(false)
    }

    const handleSelect = async (selectVal) => {
        setSelect(s => s = selectVal)
        api_post_call("http://127.0.0.1:5000/tmdb/search/genre", selectVal)
    }

    const handleRecommendationClick = async () => {
        const data = {
            completedMovies: [...completed],
            watchlistMovies: [...movies]
        }
        api_post_call("http://127.0.0.1:5000/tmdb/recc", data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        api_post_call("http://127.0.0.1:5000/tmdb/search", query)
    }

    const optionsList = options.map((movie, index) => (
        <li key={index} className="movie">
            {movie.title}<br/>{movie.vote_average.toFixed(1)}/10<br/>
            <img className="images" src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`} alt="IMAGE NOT FOUND"></img> <br/>
            <button className="add-btn" onClick={() => handleAdd(movie, event)}>Add to Watchlist</button>
        </li>
    ))

    const optionList = genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
            {genre.name}
        </option>
    ))

  return (
    <>
        <div className="watchlist-title">
            <h1>Find Movies</h1>
        </div>
        <div className="options-container">
            <button className="reg-btn" onClick={() => handleOptionClick("toprated")}>Top Rated</button>
            <button className="reg-btn" onClick={() => handleOptionClick("trending")}>Trending</button>
            <button className="reg-btn" onClick={() => handleOptionClick("upcoming")}>Upcoming</button>
            <select value={select} className="reg-btn" defaultValue="default" onChange={() =>{handleSelect(event.target.value)}}>
                <option value="default" disabled>Popular by Genre</option>
                {optionList}
            </select>
            <button className="reg-btn" onClick={() => handleRecommendationClick()}>Recommendations</button>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input className="input" value={query} onChange={(e) => handleQueryChange(e)}></input>
                <button className="reg-btn"type="submit">Search</button>
            </form>
        </div>
        {isLoading ? <div className="loader-container"><Loader/></div>:<div class="grid-container"><ol class="grid-list">{optionsList}</ol></div>}
    </>
  )
}

export default FindMovies