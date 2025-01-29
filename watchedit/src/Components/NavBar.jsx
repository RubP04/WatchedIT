
const NavBar = ({setScreen}) => {

  const handleClick = (navScreen) => {
    setScreen(navScreen)
  }

  return (
    <div className="navigation-bar">
        <div className="title-container">
          <p className="nav-title">WatchedIt</p>
        </div>
        <div className="buttons-container">
          <button className="nav-btn" onClick={() => handleClick("home")}>Home</button>
          <button className="nav-btn" onClick={() => handleClick("watchlist")}>Watch List</button>
          <button className="nav-btn" onClick={() => handleClick("findmovies")}>Find Movies</button>
          <button className="nav-btn" onClick={() => handleClick("login")}>Login</button>
        </div>
    </div>
  )
}

export default NavBar