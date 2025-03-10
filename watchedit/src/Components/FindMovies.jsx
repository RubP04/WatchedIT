import React, { useEffect, useState } from 'react'
import Loader from "./Loader"

const FindMovies = ({movies, setMovies, completed, options, setOptions, baseURL}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [genres, setGenres] = useState([])
    const [select, setSelect] = useState()
    const [query, setQuery] = useState("")
    const [pageNo, setPageNo] = useState(1)
    const [error, setError] = useState("")
    const moviesPerPage = 16

    useEffect(() =>{
        try{
            fetch(`${baseURL}/tmdb/genres`, {credentials:"include"})
            .then(response => response.json())
            .then(data => {
            setGenres(data)
            })
        } catch (error){
            console.log(error)
        }
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
        event.target.innerHTML = "SUCCESS"
        setTimeout(() => {
            event.target.innerHTML = "Add to Watchlist"
        }, 250)
    }

    const handleOptionClick = async (option) => {
        setIsLoading(true)
        setPageNo(1)
        try{
            await fetch(`${baseURL}/tmdb/${option}`, {credentials:"include"})
            .then((response) => response.json())
            .then((data) => {
                setOptions(data)
            })
        } catch(error){
            console.log(error)
        }
        setIsLoading(false)
    }

    const handleQueryChange = (event) => {
        setQuery(event.target.value)
    }

    const api_post_call = async (url, val) =>{
        setIsLoading(true)
        setPageNo(1)
        try{
            const response = await fetch(url, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(val)
            })
            const data = await response.json()
            setOptions(data)
        } catch(error){
            console.log(error)
        }
        setIsLoading(false)
    }

    const handleSelect = async (selectVal) => {
        setSelect(s => s = selectVal)
        api_post_call(`${baseURL}/tmdb/search/genre`, selectVal)
    }

    const handleRecommendationClick = async () => {
        if(movies.length == 0 && completed.length == 0){
            setError(e => e = "Please add movies to your watchlist and/or completed list to get recommendations!")
            setTimeout(() => {
                setError(e => e = "")
            }, 1000)
        }
        else{
            const data = {
                completedMovies: [...completed],
                watchlistMovies: [...movies]
            }
            api_post_call(`${baseURL}/tmdb/recc`, data)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        api_post_call(`${baseURL}/tmdb/search`, query)
    }

    const handlePageDecrease = () => {
        if (pageNo > 1){
            setPageNo(pageNo - 1)
        }
    }

    const handlePageIncrease = () => {
        if (pageNo < options.length / moviesPerPage){
            setPageNo(pageNo + 1)
        }
    }

    const optionsList = options.map((movie, index) => (
        <li key={index} className="movie">
            {movie.title}<br/>{(movie.vote_average ?? 0).toFixed(1)}/10<br/>
            <img className="images" src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`} alt="IMAGE NOT FOUND"></img> <br/>
            <button className="add-btn" onClick={() => handleAdd(movie, event)}>Add to Watchlist</button>
        </li>
    ))

    const genreList = genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
            {genre.name}
        </option>
    ))

  return (
    <>
    <div className="test-container">
        <div className="watchlist-title">
            <h1 style={{marginBottom: 20, marginTop: 70,}}>Find Movies</h1>
        </div>
        <div className="options-container">
            <button className="reg-btn" onClick={() => handleOptionClick("toprated")}>Top Rated</button>
            <button className="reg-btn" onClick={() => handleOptionClick("trending")}>Trending</button>
            <button className="reg-btn" onClick={() => handleOptionClick("upcoming")}>Upcoming</button>
            <select value={select} className="reg-btn" defaultValue="default" onChange={() =>{handleSelect(event.target.value)}}>
                <option value="default" disabled>Popular by Genre</option>
                {genreList}
            </select>
            <button className="reg-btn" onClick={() => handleRecommendationClick()}>Recommendations</button>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input className="input" value={query} onChange={(e) => handleQueryChange(e)}></input>
                <button className="reg-btn"type="submit" style={{marginRight: 200}}>Search</button>
            </form>
        </div>
    </div>
    {
        isLoading ?
        <div className="loader-container">
            <Loader/>
        </div>
        :
        error !== "" ?
        <p className="rec-error">{error}</p>
        :
        <>
            <div className="grid-container">
                <ol className="grid-list">{optionsList.slice((pageNo - 1) * moviesPerPage, pageNo * moviesPerPage)}</ol>
            </div>
            {options.length > 0 ? 
            <div className="page-btn-container">
                <button className="reg-btn" onClick={handlePageDecrease}>&lt;</button>
                <p>Page {pageNo} of {Math.ceil(options.length / moviesPerPage)}</p>
                <button className="reg-btn" onClick={handlePageIncrease}>&gt;</button>
            </div> : <></>}
        </>
    }
    </>
  )
}

export default FindMovies