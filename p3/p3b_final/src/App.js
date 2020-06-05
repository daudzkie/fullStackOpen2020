import React, { useState, useEffect } from 'react'
import phbookService from './services/phbookService'
import Notification from './components/Notification'
import axios from 'axios'

const App = () => {
  const [entries, setEntries] = useState({})
  const [filter, setFilter] = useState([])
  const [searchName, setSearchName] = useState('')
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    phbookService
      .getAll()
      .then(response => {
        setEntries(response.data)
      })
  }, [searchName, newName])

  console.log('Entries Arr', entries)

  const addPerson = (event) => {
    event.preventDefault()
    const checkName = obj => obj.name === newName
    const newEntry = {
      name: newName,
      number: number
    }

    if (!entries.find(checkName)) {      

      phbookService
        .create(newEntry)
        .then(response => {
          setEntries(entries.concat(newEntry))
          setMessage(newName + ' is successfully added')
          setError(false)
        })
        setTimeout(() => {
          setMessage(null)},5000)

        setNewName('')
        setNumber('')      
    } else {
      const result = entries.find(item => item.name === newName)
      // const id = result.id
      
      if (window.confirm(newName + ' is already in your contacts. Would you like to update the info?'))
      phbookService
        .update(result.id, newEntry)
        .then(response => {
          console.log(newName + ' information was updated')
          setMessage(newName + ' information was updated')
          setError(false)
          setNewName('')
          setNumber('')
        })
    }
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)          
  }

  const handleChangeNum = (event) => {
    setNumber(event.target.value)
  }

  const filterNames = (event) => {
    setSearchName(event.target.value)
    setFilter(entries.filter(person => 
      person.name && person.name.indexOf(searchName) !== -1))
  }

  const handleClickDelete = (id, name) => () => {
    // const url = `https://phonebook-bend.herokuapp.com/api/persons/${id}`
    const url = `/api/persons/${id}`
    console.log(id)
    console.log(name)
    console.log(url)

    if (window.confirm('Are your sure you want to remove ' + name + ' ?'))
      axios.delete(url)
        .then(reponse => {
          console.log(reponse)
          setFilter(entries.filter(person =>
            person.id !== id
          ))
        })
      // phbookService
      //   .remove(id)
      //   .then(response => {
      //     setEntries(response.data)
      //     // setFilter(entries.filter(person => 
      //     //   person.id !== id
      //     // ))
      //     console.log(id)
      //     console.log(entries)
          setMessage(name + ' was successfully removed from the server')
          setError(true)
          setSearchName('')

          setTimeout(() => {
            setMessage(null)},5000)
        // })
  }

  const handleClickClear = (event) => {
    setFilter([])
    setSearchName('')
  }

  console.log('Filter Array', filter)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error}/>
      <p>filter shown with {' '}
        <input 
          type='text' 
          value={searchName} 
          onChange={filterNames} ></input>
        <button onClick={handleClickClear} >clear</button>    
      </p>
          
      <form onSubmit={addPerson}>
        <div>
          <p>name:{' '}
            <input
              placeholder='name'
              value={newName}
              onChange={handleChangeName} >
            </input>
          </p>
          <p>number: {' '}
            <input
              placeholder='number'
              value={number}
              onChange={handleChangeNum} >
            </input>
          </p>
        </div>
        <button>Add new</button>
      </form>
      <h2>Numbers</h2>
      {filter.map((person,i) =>
        <h4 key={i}>
          {person.id} {person.name} - {person.number} {' '}
           <button onClick={handleClickDelete(person.id, person.name)}>delete</button>
        </h4>
      )}
      
    </div>
  )
}

export default App