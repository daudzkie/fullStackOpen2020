const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
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
    name: String,
    number: String,
    date: Date
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

module.exports = mongoose.model('Person', personSchema)
