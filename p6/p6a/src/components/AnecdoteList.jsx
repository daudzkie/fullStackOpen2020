import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  /**take anecdote.id from button onClick */
  const vote = (id) => {
    console.log('vote ', id)
    dispatch({
      type: 'UP_VOTE',
      data: { id }
    })
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {/* <p>{anecdote.id}</p> */}
            <h3>{anecdote.content}</h3>
          </div>
          <div>
            <span>has {anecdote.votes} {''}</span>
            <button onClick={() => vote(anecdote.id)} >
              vote
            </button>
            <hr />
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList