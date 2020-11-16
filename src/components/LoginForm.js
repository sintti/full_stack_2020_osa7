import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'

import { loginUser } from '../reducers/loginReducer'
import { createNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(loginUser({
        username: username,
        password: password
      }))
      setUsername('')
      setPassword('')
    } catch (e) {
      dispatch(createNotification('Username or password wrong'))
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div className="container">
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
        <Form.Label>
            Username
          <Form.Control
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Label>
        <Form.Label>
            Password
          <Form.Control
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Label>
        <Button id='login-button' type="submit">Login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm