const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userSchema')
// const logger = require('../utils/logger')
// const logger = require('../utils/logger')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  /**Find user in db from username in request */
  const user = await User.findOne({ username: body.username })

  /**compares pw hash in db to the pw hash in request body*/
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  // logger.info(body.password, 'body-pW')
  // logger.info(user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  /**creates token */
  const token = jwt.sign(userForToken, process.env.SECRET)
  console.log(token)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter