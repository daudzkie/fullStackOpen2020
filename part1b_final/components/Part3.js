import React from 'react'

const Part3 = (props) => {   
   
    return(
        <div>
            <h2>Part 3: {props.parts.parts[2].name}</h2>
            <h2># of exercises: {props.parts.parts[2].exercises}</h2>
            <hr />
        </div>
    )
}

export default Part3
