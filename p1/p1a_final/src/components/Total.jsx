import React from 'react'

const Total = (props) => {   
   
    return(
        <div>
            <h1>Total # of exercises: {props.ex1 + 
                props.ex2 + props.ex3} </h1>
            <hr />
        </div>
    )
}

export default Total
