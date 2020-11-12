const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./helper')

const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.biggerList
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('Blogilista API tests', () => {

  test('returns a list of three blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.biggerList.length)
  })

  test('blog.id is named id not named _id', async () => {
    const response = await api.get('/api/blogs')

    const blog = response.body[0]
    expect(blog.id).toBeDefined()
  })

  test('blog can be added to the db', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.biggerList.length + 1)

    const blogTitles = blogsAtEnd.map(blog => blog.title)
    expect(blogTitles).toContain(
      'Iltasanomat'
    )
  })

  test('if likes is undefined set it 0', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const likesOfBlogs = blogsAtEnd.map(blog => blog.likes)
    expect(likesOfBlogs).toContain(0)
  })

  test('if title and url are missing response is 400', async () => {
    await api
      .post('/api/blogs')
      .send(helper.badBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const blogTitles = blogsAtEnd.map(blog => blog.title)

    expect(blogsAtEnd).toHaveLength(helper.biggerList.length - 1)
    expect(blogTitles).not.toContain(blogToDelete.title)
  })
})


afterAll(() => {
  mongoose.connection.close()
})