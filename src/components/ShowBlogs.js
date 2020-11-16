import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ShowBlogs = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div className="blogs">
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Link
        key={blog.id} 
        to={`/blogs/${blog.id}`}
        >
          <div>
            {blog.title}
          </div>
        </Link>
      )}
    </div>
  )
}

export default ShowBlogs