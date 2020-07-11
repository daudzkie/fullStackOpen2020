import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
// import anecdotesService from '../services/anecdotesService'

const NewAnecdote = (props) => {
  // const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log(content, 'createnew')
    event.target.anecdote.value = ''
    // const newAnecdote = await anecdotesService.createNew(content)
    props.createNewAnecdote(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

// const mapDispatchToProps = dispatch => {
//   return {

//   }
// }

export default connect(
  null,
  { createNewAnecdote }
)(NewAnecdote)