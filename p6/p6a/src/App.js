import React from 'react'
import NewAnecdote from './components/NewAnecdote'
import AnecdoteList from './components/AnecdoteList'
// import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  // const anecdotes = useSelector(state => state)
  // const dispatch = useDispatch()

  // /**take anecdote.id from button onClick */
  // const vote = (id) => {
  //   console.log('vote ', id)
  //   dispatch({
  //     type: 'UP_VOTE',
  //     data: { id }
  //   })
  // }

  return (
    <div>
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default App