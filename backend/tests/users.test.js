const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./helper')

const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'James Root', passwordHash })

    await user.save()
  })

  describe('when there is initially one user at db', () => {

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'testinen',
        name: 'Testi Testintytär',
        password: 'salainen',
        blogs: []
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creating username shorter than 3 results error and status 400', async () => {
      const newUser = {
        username: 'te',
        name: 'Testi Testintytär',
        password: 'salainen',
        blogs: []
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('creating user with password shorter than 3 results in error and status 400', async () => {
      const newUser = {
        username: 'testi',
        name: 'Testi Testintytär',
        password: 'sa',
        blogs: []
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })


  })
})

afterAll(() => {
  mongoose.connection.close()
})

// test('Username must be unique and at least 3 letters long', () => {

// })

// test('Password minimum length is 3', () => {

// })

// test('User creation fails with proper statuscode and message if already taken', () => {

// })
