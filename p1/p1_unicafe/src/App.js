import React, { useState } from 'react'
import Button from './components/Button'
import Statistics from './components/Statistics'  


const App = () => {
 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAllClicks] = useState([])

  const handleClickGood=()=> {
    setGood(good +1)
    setAllClicks(allClicks.concat('good'))
  }
  const handleClickBad=()=> {
    setBad(bad +1)
    setAllClicks(allClicks.concat('bad'))
  }
  const handleClickNeutral=()=> {
    setNeutral(neutral +1)
    setAllClicks(allClicks.concat('neutral'))
  }
  
  return (
    <div>
      <h2>give feedback</h2>

      <div>
        <Button
          handleClickGood = {handleClickGood} good='good'
          handleClickNeutral = {handleClickNeutral} neutral='neutral'
          handleClickBad = {handleClickBad} bad='bad' />

        {/* <Button handleClick={handleClickGood} good='good' />
        <Button handleClick={handleClickNeutral} neutral='neutral' />
        <Button handleClick={handleClickBad} bad='bad' /> */}
      </div>

      <h2>statistics</h2>

      {allClicks.length > 0 ?
      <Statistics good={good} bad={bad} neutral={neutral}/> :
      "No feedback given"}  

{/* Below works as well: 
      {(good + bad + neutral) > 0 ?
      <Statistics good={good} bad={bad} neutral={neutral}/> :
      "No feedback given"}      
       */}

    </div>
    )
}

export default App