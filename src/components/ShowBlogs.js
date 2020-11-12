import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const ShowBlogs = ({ blogs, setBlogs, setNotification }) => {
  const functionService = require('../functions/blogsSorter')

  const likeBlog = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    try {
      const returnedBlog = await blogService.update(updatedBlog, updatedBlog.id)
      setBlogs(
        functionService.blogsSorter(
          blogs.map(b => b.id !== blog.id ? b : returnedBlog)
        ))
      setNotification('Blog updated succesfully')
      setTimeout(() => {
        setNotification('')
      }, 5000)
    } catch (error) {
      setNotification('update failed', error)
    } setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find(b => b.id === id)
    const loggedUser = JSON.parse(localStorage.getItem('loggedBlogilistaUser')).username
    if (loggedUser === blogToDelete.user.username) {
      const result = window.confirm(`Delete ${blogToDelete.title}?`)
      if (result === true) {
        try {
          await blogService.remove(id)
          setBlogs(
            functionService.blogsSorter(
              blogs.filter(b => b.id !== id)
            ))
          setNotification('Blog deleted succesfully')
          setTimeout(() => {
            setNotification('')
          }, 5000)
        } catch (error) {
          setNotification('Blog was already deleted')
        } setTimeout(() => {
          setNotification('')
        }, 5000)
      }
    } else {
      setNotification('Cannot delete blogs saved by another user')
    } setTimeout(() => {
      setNotification('')
    }, 5000)
  }



  return (
    <div className="blogs">
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={() => likeBlog(blog)}
          deleteBlog={() => deleteBlog(blog.id)}
        />
      )}
    </div>
  )
}

export default ShowBlogs