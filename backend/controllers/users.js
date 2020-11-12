const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { body, validationResult } = require('express-validator')

usersRouter.post('/', [

  body('password').isLength({ min: 3 })

], async (request, response) => {
  const errors = validationResult(request)
  if (!(errors.isEmpty())) {
    return response.status(400).json({
      error: 'username and password must be longer than 3'
    })
  }

  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter