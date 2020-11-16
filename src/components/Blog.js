import React from 'react'
import Togglable from './Togglable'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, likeBlog, deleteBlog }) => {

  return (
    <ul className='blog'>
      <li>{blog.title}</li>
      <li>{blog.author}</li>
      <Togglable buttonLabel='Show' secondButtonLabel='Hide'>
        <li>{blog.url}</li>
        <li>
          <span id='likes'>{blog.likes}</span>
          <Button
            name='like'
            onClick={likeBlog}
          >Like</Button>
        </li>
        <Button
          name='delete'
          onClick={deleteBlog}
        >Delete</Button>
      </Togglable>
    </ul>
  )
}

export default Blog
