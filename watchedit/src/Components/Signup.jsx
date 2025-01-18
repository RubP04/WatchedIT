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
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <p1>Email</p1>
                <input value={email} onChange={() => handleEmailChange(event)}></input>
                <p1>Password</p1>
                <input value={password} onChange={() => handlePasswordChange(event)}></input>
                <button type="submit">Sign Up</button>
                <button onClick={handleLoginClick}>Login</button>
            </form>
        </div>
    )
}

export default Signup