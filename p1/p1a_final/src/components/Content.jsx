import React from 'react'

const Content = (props) => {
    
       
    return (
        <div>
            {props.part1} ({props.ex1} exercises)
            <hr/>
            {props.part2} ({props.ex2} exerciese)
            <hr/>
            {props.part3} ({props.ex3} exerciese)
        </div>

    )
}
export default Content