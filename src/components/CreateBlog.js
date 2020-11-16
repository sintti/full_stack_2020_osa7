import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'

const CreateBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleBlogCreate = async (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url
    }

    try {
      dispatch(createBlog(blog))
      dispatch(createNotification('Blog added succesfully.'))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (e) {
      dispatch(createNotification('Missing required information about blog'))
    }
  }

  return (
    <div className='create-blog'>
      <h2>Create a new blog</h2>
      <Form className='create-blog-form' onSubmit={handleBlogCreate}>
        <Form.Group>
        <Form.Label className='input-blog'>
          Title:
          </Form.Label>
          <Form.Control
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        <Form.Label className='input-blog'>
          Author:
          </Form.Label>
          <Form.Control
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        <Form.Label className='input-blog'>
          Url:
          </Form.Label>
          <Form.Control
            id='url'
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        <Button id='create-blog' type='submit'>Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CreateBlog