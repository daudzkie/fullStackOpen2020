import React from 'react'

const Button = (props) => {
    return (
        <div>
            <button onClick = {props.handleClickGood}>{props.good}</button>
            <button onClick = {props.handleClickNeutral}>{props.neutral}</button>
            <button onClick = {props.handleClickBad}>{props.bad}</button>

        </div>
    )
}

export default Button