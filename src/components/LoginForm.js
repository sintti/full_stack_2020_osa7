import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogilistaUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setNotification('Username or password wrong')
      setUsername('')
      setPassword('')
    }
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return (
    <div className="login-form">
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
            Username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            Password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm