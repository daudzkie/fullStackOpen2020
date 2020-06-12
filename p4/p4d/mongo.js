const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
console.log(process.argv)

const url =
  `mongodb+srv://daudzkie:${password}@cluster0-mm8os.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
  date: new Date()
})

/**Creats document and save to db */
// person.save().then(result => {
//   console.log('entry saved')
//   mongoose.connection.close()
// })

/**find objects from mongodb */
Person.find({}).then(result => {
  console.log('Phonebook:')
  result.forEach(person => {    
    console.log(person.name, person.number)
  })
  mongoose.connection.close()
})
