require('dotenv').config()
// const logger = require('./logger')

let PORT = process.env.PORT
let MONGO_URI = process.env.MONGO_URI

module.exports = {
  MONGO_URI,
  PORT
}