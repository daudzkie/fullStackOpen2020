import React from 'react'

const Total = ({ course }) => {

    const total = course.parts.reduce((prevTotal, currTotal) => 
        prevTotal + currTotal.exercises,0)
    
    return(
        <div>
            <h3>total of {total} exercises</h3>
            <hr />
        </div>
    )
}

export default Total
