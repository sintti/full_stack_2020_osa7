import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ blogs, setBlogs, setNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url
    }

    try {
      const response = await blogService.create(blog)
      setBlogs(blogs.concat(response))
      setNotification('Blog added succesfully.')
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setNotification('')
      }, 5000)
    } catch (e) {
      setNotification('Missing required information about blog')
    }
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return (
    <div className='create-blog'>
      <h2>Create new blog</h2>
      <form className='create-blog-form' onSubmit={createBlog}>
        <div className='input-blog'>
          Title:
          <input
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className='input-blog'>
          Author:
          <input
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className='input-blog'>
          Url:
          <input
            id='url'
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='create-blog' type='submit'>Create</button>
      </form>
    </div>
  )
}

export default CreateBlog