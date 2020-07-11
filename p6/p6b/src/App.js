import React from 'react'
import NewAnecdote from './components/NewAnecdote'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = (props) => {
  // const filterValue = (value) => {
  //   console.log(value)
  // }


  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList store={props.store} />
      <NewAnecdote />
    </div>
  )
}

export default App