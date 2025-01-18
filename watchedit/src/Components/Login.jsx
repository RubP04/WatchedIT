import React, { useState } from 'react'

const Login = ({setScreen}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const credentials = {
            "email": email,
            "password": password
        }
        const url = "http://127.0.0.1:5000/login"

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
        const data = await response.json()
        
        if (data.validated){
            setScreen("findmovies")
        }
        else{
            setError("Invalid credentials!")
            setTimeout(() => {
                setError("")
            }, 2000)
        }
    }

    const handleSignupClick = () => {
        
    }

  return (
    <div className="auth-container">
        <div className="auth-form">
            <div className="auth-title">
                <p1>Login</p1><br/><br/>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <p1>Email</p1><br/>
                <input className="input" value={email} type="email" onChange={() => handleEmailChange(event)}></input><br/><br/>
                <p1>Password</p1><br/>
                <input className="input" value={password} type="password" onChange={() => handlePasswordChange(event)}></input><br/><br/>
                <p1 className="error-msg">{error}</p1>
                <div className="auth-btn-container">
                    <button className="auth-btn" type="submit">Login</button>
                    <button className="auth-btn" onClick={handleSignupClick}>Sign Up</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login