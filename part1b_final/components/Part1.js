import React from 'react'


const Part1 = (props) => {   
   
    return(
        <div>
            <h2>Part 1: {props.parts.parts[0].name}</h2>
            <h2># of exercises: {props.parts.parts[0].exercises}</h2>
            <hr />
        </div>
    )
}

export default Part1
