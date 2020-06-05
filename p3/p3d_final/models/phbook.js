const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI
// const url = 'http://localhost:3001/api/persons'

console.log(url)
console.log('Connecting to ', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology:true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongogDB: ', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  number: {
    type: String,
    index: true,
    required: true,
    minlength: 5
  },
  date: Date
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

module.exports = mongoose.model('Person', personSchema)
