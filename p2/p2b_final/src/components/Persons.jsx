import React from 'react'

const Persons = (props) => {
    return(
        <div>
            <div>
                <h4 key={props.id}>
                    {props.name} - {props.number}
                </h4>
            </div>
        </div>
    )
}

export default Persons