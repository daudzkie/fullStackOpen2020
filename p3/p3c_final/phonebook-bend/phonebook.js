const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('dev'))

let persons = [
    {
      name: "Dodskie Gwapo",
      number: "123-456",
      date: "2020-01-10T17:30:31.098Z",
      id: 1
    },
    {
      name: "Dodskie Cutelang",
      number: "125-96385",
      date: "2020-01-10T17:30:31.098Z",
      id: 2
    },
    {
      name: "Dodskie Medyogwapo",
      number: "132-9517",
      date: "2020-01-10T17:30:31.098Z",
      id: 3
    }
]

app.get('/', (req, res) => {
    res.send('Dodskie Gwapo')
})

app.get('/api/persons', (req, res) => {
    res.send(persons)
})

app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people <br/><br/> ${Date()}`)
})

app.delete('api/persons/:id', (req, res) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

const generateID = () => {
    return Math.floor(Math.random() * 99999 + 1)
}

app.use(morgan('dev'))
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

    const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateID(),
    }

    persons = persons.concat(person)

    response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
