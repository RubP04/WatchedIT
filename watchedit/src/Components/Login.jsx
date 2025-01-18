import React, { useState } from 'react'

const Login = () => {

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

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <p1>Email</p1>
            <input value={email} onChange={() => handleEmailChange(event)}></input>
            <p1>Password</p1>
            <input value={password} onChange={() => handlePasswordChange(event)}></input>
            <button type="submit">Login</button>
            <button>Sign Up</button>
        </form>
    </div>
  )
}

export default Login