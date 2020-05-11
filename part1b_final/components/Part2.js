import React from 'react'

const Part2= (props) => {   
   
    return(
        <div>
            <h2>Part 2: {props.parts.parts[1].name}</h2>
            <h2># of exercises: {props.parts.parts[1].exercises}</h2>
            <hr />
        </div>
    )
}

export default Part2
