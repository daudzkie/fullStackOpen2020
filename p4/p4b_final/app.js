const config = require('./utils/config')
const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors')
const blogRouter = require('./controllers/blogRouter')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const app = express()
const cors = require('cors')

logger.info('connecting to', config.MONGO_URI)

mongoose.connect(config.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app