import React from 'react'

const Total = (props) => {   
   
    return(
        <div>
            <h1>Total # of exercises: {props.parts.parts[0].exercises + 
                props.parts.parts[1].exercises +
                props.parts.parts[2].exercises} </h1>
            <hr />
        </div>
    )
}

export default Total
