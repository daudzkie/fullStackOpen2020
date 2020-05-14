import React, { useState } from 'react'

const App = () => {

  const [selected, setSelected] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [votesArr, setArr] = useState(Array(anecdotes.length).fill(0))
  
  const handleClick = () => {
    const rand = 1 + Math.floor(Math.random() * (anecdotes.length -1))
    setSelected(rand)

  }
 
  const upVote = () => {
    const votes = [...votesArr]
    votes[selected] += 1
    setArr(votes)
    console.log(votes)
  }
  
  const indexMax = votesArr.indexOf(Math.max(...votesArr))
 
  return (
    
    <div>
      {anecdotes[selected]} <br />
      <p>has {votesArr[selected]} votes</p>
      <button onClick={upVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <hr />
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[indexMax]}</p>
    </div>

  )
}
export default App
