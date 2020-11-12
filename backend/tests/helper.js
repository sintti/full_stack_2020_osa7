const Blog = require('../models/blog')
const User = require('../models/user')

const biggerList = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Campasimpukka',
    author: 'CampaSimpukka',
    url: 'https://www.campasimpukka.fi/',
    likes: 23
  },
  {
    title: 'MBnet',
    author: 'true',
    url: 'https://www.mbnet.fi',
    likes: 1,
  }
]

const newBlog = {
  title: 'Iltasanomat',
  author: 'Sanoma',
  url: 'https://www.iltasanomat.fi',
  likes: undefined,
  user: 'asjdaoksopdka'
}

const badBlog = {
  author: 'Sanoma',
  likes: undefined
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  biggerList,
  blogsInDb,
  usersInDb,
  newBlog,
  badBlog
}