import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import FilterNames from './components/FilterNames'
import Persons from './components/Persons'
import phbookService from './services/phbookService'

const App = () => { 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filtered, setFilter] = useState([])
  const [persons, setPersons] = useState({})  

  useEffect(() => {
    phbookService
      .getAll()
      .then(response => {
        console.log('person promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const checkName = obj => obj.name === newName
    
    const newPersonDetails = {
      name: newName,
      number: number
    }

    if (!persons.some(checkName)) {
      
      phbookService
        .create(newPersonDetails)
        .then(response => {
          alert(newName + ' is added')
          setPersons(persons.concat(newPersonDetails))
          setNewName('')
          setNumber('')
      })
    } else {
      const checkPerson = persons.find(checkName)
      const id = checkPerson.id

      if (window.confirm(newName + ' is already added. Would you like to replace the old number')) {
        phbookService
          .update(id, newPersonDetails)
          .then(response => {
            alert(newName + ' is updated')
          })
        phbookService
          .getAll()
          .then(response => {
            setPersons(response.data)
          })
      }
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
      person.name && person.name.indexOf(event.target.value) !== -1))
  }

  return (
    <div>
      <FilterNames filterNames={filterNames} />

      <PersonForm
        newName={newName}
        newNum={number}
        handleChangeName={handleChangeName}
        handleChangeNum={handleChangeNum}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <div>
       {filtered.map(person => 
          <Persons
            key={person.name}
            id={person.name}
            name={person.name}
            number={person.number}
            entryID={person.id}
          />
        )}
      </div>
    </div>
  )
}

export default App  