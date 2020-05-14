import React from 'react'

const Statistics = (props) => {    

return(
    <table>
        <tbody>
            <tr>
                <th style={{textAlign: "left"}}>good</th>
                <th>{props.good}</th>
            </tr>
            <tr>
                <th style={{textAlign: "left"}}>neutral</th>
                <th>{props.neutral}</th>
            </tr>
            <tr>
                <th style={{textAlign: "left"}}>bad</th>
                <th>{props.bad}</th>
            </tr>
            <tr>
                <th style={{textAlign: "left"}}>all</th>
                <th> {props.good + props.bad + props.neutral}</th>
            </tr>
            <tr>
                <th style={{textAlign: "left"}}>average</th>
                <th> {props.good + props.bad*-1}</th>
            </tr>
            <tr>
                <th style={{textAlign: "left"}}>positive</th>
                <th> {(100 * props.good / (props.good + props.neutral + props.bad)).toFixed(2)}%</th>
            </tr>
        </tbody>
    </table>
    ) 
}

export default Statistics