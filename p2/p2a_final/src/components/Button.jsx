import React from 'react'

const Button = (props) => {
    return (
        <div>
            <button onClick = {props.handleClick}>next anecdote</button>
        </div>
    )
}

export default Button