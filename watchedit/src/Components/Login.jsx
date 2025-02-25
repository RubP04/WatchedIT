import React, { useState } from 'react'

const Login = ({setScreen, baseURL, validated, setValidated}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const authEndpoint = async(url) => {
        const credentials = {
            "email": email,
            "password": password
        }

        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
        const data = await response.json()
        
        return data
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        const data = await authEndpoint(`${baseURL}/login`)

        if (data.validated){
            setScreen("Find Movies")
            setValidated(!validated)
        }
        else{
            setError("Invalid credentials!")
            setTimeout(() => {
                setError("")
            }, 2000)
        }
    }

    const handleSignupClick = async(e) => {
        e.preventDefault()

        const data = await authEndpoint(`${baseURL}/signup`)

        if (data.validated){
            setScreen("Find Movies")
            setValidated(!validated)
        }
        else{
            setError(data.message)
            setTimeout(() => {
                setError("")
            }, 2000)
        }
    }

  return (
    <div className="auth-container">
        <div className="auth-form">
            <div className="auth-title">
                <span>Login</span><br/><br/>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <span>Email</span><br/>
                <input className="input" value={email} type="email" onChange={() => handleEmailChange(event)}></input><br/><br/>
                <span>Password</span><br/>
                <input className="input" value={password} type="password" onChange={() => handlePasswordChange(event)}></input><br/><br/>
                <p className="error-msg">{error}</p>
                <div className="auth-btn-container">
                    <button className="auth-btn" type="submit">Login</button>
                    <button className="auth-btn" onClick={() => handleSignupClick(event)}>Sign Up</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login