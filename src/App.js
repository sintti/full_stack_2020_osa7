import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import ShowBlogs from './components/ShowBlogs'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const functionService = require('./functions/blogsSorter')

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( functionService.blogsSorter(blogs) )
      )
  }, [functionService])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogilistaUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div className="login-form">

        <div className='header'>
          <h1>Blogilista</h1>
          <Notification message={notification} />
        </div>

        <div className='container'>
          <LoginForm
            user={user}
            setUser={setUser}
            setNotification={setNotification}
          />
        </div>

      </div>
    )
  }

  return (
    <div>
      <div className='header'>

        <h1>Blogilista</h1>

        <LogoutForm user={user} />

      </div>

      <Notification message={notification} />

      <div className='container'>
        <Togglable buttonLabel='Create blog' secondButtonLabel='Cancel'>
          <CreateBlog
            blogs={blogs}
            setBlogs={setBlogs}
            setNotification={setNotification}
          />
        </Togglable>

        <ShowBlogs
          blogs={blogs}
          setBlogs={setBlogs}
          setNotification={setNotification}
        />
      </div>

    </div>
  )
}

export default App