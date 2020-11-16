import React from 'react'
import { useRouteMatch } from 'react-router-dom'

const User = ({ users }) => {
  const match = useRouteMatch('/users/:id')
  const user = users
    ? users.find(u => u.id === match.params.id)
    : null

  const ListOfBlogs = () => {
    if (!user) {
      return null
    }
    return (
      <div className='container'>
        <h2>{user.name}</h2>
        <p>added blogs</p>
        <ul>
          {user.blogs.map(b => 
            <li key={b.id}>{b.title}</li>
          )}
        </ul>
      </div>
    )
  }
  
  return (
    <ListOfBlogs />
  )
}

export default User