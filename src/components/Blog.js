import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { createNotification } from '../reducers/notificationReducer'
import { updateBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { useRouteMatch } from 'react-router-dom'

const Blog = () => {
  const [ comment, setComment ] = useState('')
  const blogs = useSelector(state => state.blogs)
  const match = useRouteMatch('/blogs/:id')
  const blog = blogs
    ? blogs.find(b => b.id === match.params.id)
    : null
  const dispatch = useDispatch()
  
  const likeBlog = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    try {
      dispatch(updateBlog(updatedBlog))
      dispatch(createNotification('Blog updated succesfully'))
    } catch (error) {
      dispatch(createNotification('update failed', error))
    }
  }

  const handleDeleteBlog = (blog) => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogilistaUser'))
    if (loggedUser.username === blog.user.username) {
      const result = window.confirm(`Delete ${blog.title}?`)
      if (result) {
        try {
          dispatch(deleteBlog(blog.id))
          dispatch(createNotification('Blog deleted succesfully'))
        } catch (error) {
          dispatch(createNotification('Blog was already deleted'))
        }
      }
    } else {
      dispatch(createNotification('Cannot delete blogs saved by another user'))
    }
  }
  
  const handleCommentBlog = (e) => {
    e.preventDefault()
    const commentedBlog = {
      ...blog,
      comments: blog.comments.concat(comment)
    }
    try {
      dispatch(commentBlog(commentedBlog))
      dispatch(createNotification('New comment added for blog'))
      setComment('')
    } catch (e) {
      dispatch(createNotification('Commenting failed'))
    }
  }
  
  if (!blog) {
    return null
  }
  
  const margin = {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 5
  }

  return (
    <div className='container'>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes}
        <Button style={margin} onClick={() => likeBlog(blog)}>Like</Button>
        <Button style={margin} onClick={() => handleDeleteBlog(blog)}>Delete</Button>
        <ul>
          {blog.comments.map(c =>
            <li>{c}</li>)}
        </ul>
        <Form onSubmit={handleCommentBlog}>
          <Form.Label className='comment'>
            Comment blog
          </Form.Label>
          <Form.Control
            id='comment'
            type='text'
            value={comment}
            name='Comment'
            onChange={({ target }) => setComment(target.value)}
          />
          <Button style={margin} id='create-comment' type='submit'>Comment</Button>
        </Form>
      </div>
    </div>
  )
}

export default Blog
