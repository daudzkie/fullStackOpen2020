import React from 'react'
// import axios from 'axios'

const PersonForm = ({ newName, newNum, handleChangeName, handleChangeNum, addPerson }) => {

    return(
        <div>
            <h3>Add a new</h3>
            <form onSubmit={addPerson}>
            <div>
                <p>name: <input value={newName} onChange={handleChangeName}></input></p>
                <p>phone: <input value={newNum} onChange={handleChangeNum}></input></p>
            </div>
            <button type="submit">add</button> 
            </form>
        </div>
    )
}

export default PersonForm