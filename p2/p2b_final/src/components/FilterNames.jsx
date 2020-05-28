import React from 'react'

const FilterNames = (props) => {
    return(
        <div>
            <h2>Phonebook</h2>
            filter shown with <input onChange={props.filterNames}></input>
        </div>
    )
}

export default FilterNames