const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/phbook')
const mongoose = require('mongoose')
const url = 'mongodb+srv://daudzkie:${password}@cluster0-mm8os.mongodb.net/phonebook?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser:true, useUnifiedTopology:true })

app.use(express.static('build'))
app.use(cors())

app.use(bodyParser.json())
app.use(express.json())
app.use(morgan('dev'))

let persons = [
    {
      name: "Dodskie Gwapo",
      number: "123-456",
      date: "2020-01-10T17:30:31.098Z"
    },
    {
      name: "Dodskie Cutelang",
      number: "125-96385",
      date: "2020-01-10T17:30:31.098Z"
    },
    {
      name: "Dodskie Medyogwapo",
      number: "132-9517",
      date: "2020-01-10T17:30:31.098Z"
    }
]

app.get('/', (req, res) => {
    res.send('Dodskie Gwapo')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(person =>  {
        res.json(person)
    })
})

app.get('/info', (req, res) => {
  Person.countDocuments({}, function(err, count) {
    if (err) {
      res.send(err)
    } else {
      res.send(`Phonebook has info for ${count} people <br/><br/> ${Date()}`)
    }
  })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById({_id: request.params.id})
        .then(person => {
            if (person) {
                response.json(person)
                console.log(person)
            } else {
                response.status(404).end()
            }        
        })
        .catch(error => next(error))
})

/**remove id generator since mongodb autocreates id */
// const generateID = () => {
//     return Math.floor(Math.random() * 99999 + 1)
// }

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
app.post('/api/persons', (request, response) => {
    
    const body = request.body
    console.log(body)
    const checkName = persons.find(person => person.name === body.name)

    if (!body.number || !body.name) {
    return response.status(400).json({ 
        error: 'content missing' 
    })
    } else if(checkName) {
        return response.status(409).json({
            error: 'name must be unique'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
        date: new Date(),
        // id: generateID(),/**removed id field, mongodb already has id */
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
  })

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    console.log(body)
    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate({_id: request.params.id}, person, { new: true })
        .then(updatedPerson => {
        response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, next) => {
    console.log(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformed id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log(`Server running on port ${process.env.NODE_ENV}`)
})
