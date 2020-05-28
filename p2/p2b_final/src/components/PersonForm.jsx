import React from 'react'

const PersonForm = (props) => {

    return(
        <div>
            <h3>Add a new</h3>
            <form onSubmit={props.addPerson}>
            <div>
                <p>name: <input value={props.valueName} onChange={props.handleChangeName}></input></p>
                <p>phone: <input value={props.valueNum} onChange={props.handleChangeNum}></input></p>
            </div>
            <button type="submit">add</button> 
            </form>
        </div>
    )
}

export default PersonForm