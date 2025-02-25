
const NavBar = ({setScreen, setOptions, validated, setValidated, baseURL}) => {

  const navButtons = [
    
  ]
  const func = () => handleClick("home")

  const handleClick = async(navScreen) => {
    if(navScreen === "logout"){
      handleLogout()
    }
    else{
      setScreen(navScreen)
    }
  }

  const handleLogout = async() => {
    try{
      await fetch(`${baseURL}/logout`, {credentials: "include"})
      setValidated(!validated)
      setOptions([])
      setScreen("home")
    } catch (error) {
      console.log(error)
    }
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
          <button className="nav-btn" onClick={() => handleClick("logout")}>Logout</button>
        </div>
    </div>
  )
}

export default NavBar