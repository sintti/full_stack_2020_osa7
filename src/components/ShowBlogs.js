import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'
import { createNotification } from '../reducers/notificationReducer'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

const ShowBlogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)

  const likeBlog = blog => {
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

  const handleDeleteBlog = id => {
    const blogToDelete = blogs.find(b => b.id === id)
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogilistaUser'))
    if (loggedUser.username === blogToDelete.user.username) {
      const result = window.confirm(`Delete ${blogToDelete.title}?`)
      if (result) {
        try {
          dispatch(deleteBlog(id))
          dispatch(createNotification('Blog deleted succesfully'))
        } catch (error) {
          dispatch(createNotification('Blog was already deleted'))
        }
      }
    } else {
      dispatch(createNotification('Cannot delete blogs saved by another user'))
    }
  }

  return (
    <div className="blogs">
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={() => likeBlog(blog)}
          deleteBlog={() => handleDeleteBlog(blog.id)}
        />
      )}
    </div>
  )
}

export default ShowBlogs