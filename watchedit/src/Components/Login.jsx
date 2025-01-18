import React, { useState } from 'react'
import Signup from './Signup'

const Login = ({setScreen}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async() => {
        
    }

    const handleSignupClick = () => {
        
    }

  return (
    <div className="auth-container">
        <div className="auth-form">
            <div className="auth-title">
                <p1>Login</p1><br/><br/>
            </div>
            <form onSubmit={() => handleSubmit}>
                <p1>Email</p1><br/>
                <input className="input" value={email} type="email" onChange={() => handleEmailChange(event)}></input><br/><br/>
                <p1>Password</p1><br/>
                <input className="input" value={password} type="password" onChange={() => handlePasswordChange(event)}></input><br/><br/>
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