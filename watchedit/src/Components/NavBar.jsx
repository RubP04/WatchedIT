
const NavBar = ({screen, setScreen, setOptions, validated, setValidated, baseURL}) => {

  var renderButtons

  if(screen === "Home"){
    renderButtons = ["Login"]
  }
  else if(screen === "Login"){
    renderButtons = ["Home"]
  }
  else{
    renderButtons = ["Watch List", "Find Movies", "Logout"]
  }

  const handleLogout = async() => {
    try{
      await fetch(`${baseURL}/logout`, {credentials: "include"})
      setValidated(!validated)
      setOptions([])
      setScreen("Home")
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = async(navScreen) => {
    if(navScreen === "Logout"){
      handleLogout()
    }
    else{
      setScreen(navScreen)
    }
  }

  const buttonList = renderButtons.map((title, index) => (
    <button key={index} className="nav-btn" onClick={() => handleClick(title)}>{title}</button>
  ))

  return (
    <div className="navigation-bar">
        <div className="title-container">
          <p className="nav-title">WatchedIt</p>
        </div>
        <div className="buttons-container">
          {buttonList}
        </div>
    </div>
  )
}

export default NavBar