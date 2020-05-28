import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import FilterNames from './components/FilterNames'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()
    const checkName = obj => obj.name === newName

    if (!persons.some(checkName)) {
      const newPersonDetails = {
        name: newName,
        number: number
      }
      setPersons(persons.concat(newPersonDetails))
      setNewName('')
      setNumber('')
    } else {
      alert(newName + ' is already added to Phonebook')
      setNewName('')
      setNumber('')
    }
  }

  const handleChangeName = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleChangeNum = (event) => {
    event.preventDefault()
    setNumber(event.target.value)

  }

  const filterNames = (event) => {
    setFilter(persons.filter(person =>
      person.name.indexOf(event.target.value) !== -1))
  }

  return (
    <div>
      <FilterNames filterNames={filterNames} />

      <PersonForm
        valueName={newName}
        valueNum={number}
        handleChangeName={handleChangeName}
        handleChangeNum={handleChangeNum}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <div>
       {filter.map(person => 
          <Persons
            key={person.name}
            id={person.name}
            name={person.name}
            number={person.number}
          />
        )}
      </div>
    </div>
  )
}

export default App  