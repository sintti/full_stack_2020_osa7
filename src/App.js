import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Switch, Route, useRouteMatch } from 'react-router-dom'

import blogService from './services/blogs'
import Notification from './components/Notification'
import ShowBlogs from './components/ShowBlogs'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { setUserFromLocalStorage } from './reducers/loginReducer'
import { intializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.login)
  const users = useSelector(state => state.users)

  // Get initial blogs from db
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  
  // Keep user logged after refresh
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogilistaUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserFromLocalStorage(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])
  
  // Get initial userinfo from db
  useEffect(() => {
    dispatch(intializeUsers())
  }, [dispatch])

  if (!loggedUser) {
    return (
      <div className='container'>
          <Notification />
          <LoginForm />
      </div>
    )
  }

  return (
    <div className='container'>
        <Menu />
        <Notification />
        <Switch>
          <Route path='/users/:id'>
            <User users={users}/>
          </Route>
          <Route path='/blogs'>
            <Togglable buttonLabel='Create blog' secondButtonLabel='Cancel'>
              <CreateBlog />
            </Togglable>
            <ShowBlogs />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
        </Switch>
    </div>
  )
}

export default App