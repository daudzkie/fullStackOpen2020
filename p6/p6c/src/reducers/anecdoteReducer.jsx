/* eslint-disable no-case-declarations */
// export const anecdotesAtStart = []

import anecdotesService from '../services/anecdotesService'

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action: ', action)


  switch(action.type) {
  case 'NEW_ANECDOTE':
    return [...state, action.data]

  case 'INIT_ANECDOTES':
    return action.data

  case 'UP_VOTE':
    //take id dispatched from buttonclick
    const id = action.data.id

    //find the anecdote with the id
    const anecdoteToUpVote = state.find(
      anecdote => anecdote.id === id)

    //create object anecdote to update, deconstruct, increment votes
    const upVotedAnecdote = {
      ...anecdoteToUpVote,
      votes: anecdoteToUpVote.votes + 1/**increment vote by 1 */
    }
    anecdotesService.update(id, upVotedAnecdote)
    return state.map(anecdote => anecdote.id !== id
      ? anecdote
      : upVotedAnecdote)

    //default case
  default:
    return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

//start here
export const upVote = (id) => {
  return {
    type: 'UP_VOTE',
    data: { id }
  }
}


export default anecdoteReducer
