import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { upVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  console.log(props)

  // const dispatch = useDispatch()

  /**take anecdote.id from button onClick */
  const vote = (id) => {

    const anecdote = anecdotes.find(x => x.id === id)
    console.log('vote ', id)
    props.upVote(id)
    props.setNotification(
      `You have voted '${anecdote.content}`,
      5
    )
    /***Below works but above is cleaner with thunk */
    // dispatch({
    //   type: 'NOTIFY',
    //   data: (`You have voted '${anecdote.content}'`)
    // })
    // //dispatch timeout to clear notification after timeout
    // setTimeout(() => {
    //   dispatch({ type: 'CLEAR_NOTIFY' })
    // }, 5000/**timeout */)
  }

  console.log(props)
  const filter = props.filter.toLowerCase()
  const anecdotes = props.anecdotes

  console.log(anecdotes)
  console.log(filter, 'filter')

  //filter anecdotes based on search text (filter)
  const filteredAnecdotes = anecdotes.filter(
    a => a.content.toLowerCase().includes(filter)
  )

  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  upVote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

