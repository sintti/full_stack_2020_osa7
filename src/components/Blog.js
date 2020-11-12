import React from 'react'
import Togglable from '../components/Togglable'

const Blog = ({ blog, likeBlog, deleteBlog }) => {

  return (
    <ul className='blog'>
      <li>{blog.title}</li>
      <li>{blog.author}</li>
      <Togglable buttonLabel='Show' secondButtonLabel='Hide'>
        <li>{blog.url}</li>
        <li>
          <span id='likes'>{blog.likes}</span>
          <button
            name='like'
            onClick={likeBlog}
          >Like</button>
        </li>
        <button
          name='delete'
          onClick={deleteBlog}
        >Delete</button>
      </Togglable>
    </ul>
  )
}

export default Blog
