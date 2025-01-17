
const NavBar = ({setScreen}) => {

  const handleClick = (navScreen) => {
    if (navScreen === "home"){
      setScreen("home")
    }
    else if (navScreen === "watchlist"){
      setScreen("watchlist")
    }
    else{
      setScreen("findmovies")
    }
  }

  return (
    <div className="navigation-bar">
        <div className="title-container"><p1 className="nav-title">WatchedIt</p1></div>
        <div className="buttons-container">
          <button className="nav-btn" onClick={() => handleClick("home")}>Home</button>
          <button className="nav-btn" onClick={() => handleClick("watchlist")}>Watch List</button>
          <button className="nav-btn" onClick={() => handleClick("findmovies")}>Find Movies</button>
        </div>
    </div>
  )
}

export default NavBar