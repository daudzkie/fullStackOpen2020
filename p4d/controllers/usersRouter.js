const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/userSchema')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('users', { username: 1, name: 1, id: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = await request.body
    console.log(body)

    if (!body.username || !body.password) {
      return response.status(400).json({
        message: 'username and/or password required'
      })
    } else {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
      })

      const savedUser = await user.save()

      response.json(savedUser)
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter