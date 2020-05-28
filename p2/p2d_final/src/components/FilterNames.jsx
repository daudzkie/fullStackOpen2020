import React from 'react'

const FilterNames = ({ filterNames }) => {
  

    return(
        <div>
            <h2>Phonebook</h2>
            filter shown with <input onChange={filterNames}></input>
        </div>
    )
}

export default FilterNames