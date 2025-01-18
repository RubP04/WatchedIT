import React, { useState } from 'react'
import Login from './Login'

const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        console.log("clicked")
        e.preventDefault()
        console.log(email)
    }

    const handleLoginClick = () => {
        
    }

    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="auth-title">
                    <p1>Sign Up</p1><br/><br/>
                </div>
                <form onSubmit={handleSubmit}>
                    <p1>Email</p1><br/>
                    <input className="input" value={email} type="email" required onChange={() => handleEmailChange(event)}></input><br/><br/>
                    <p1>Password</p1><br/>
                    <input className="input" value={password} type="password" required onChange={() => handlePasswordChange(event)}></input><br/><br/>
                    <div className="auth-btn-container">
                        <button className="auth-btn" type="submit">Sign Up</button>
                        <button className="auth-btn" onClick={handleSignupClick}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup