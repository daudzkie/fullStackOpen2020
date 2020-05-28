import React from 'react'
import phboookService from '../services/phbookService'

const Persons = ({ id, name, number, entryID }) => {
    
    const delEntry = () => {        
        
        if (window.confirm('Are you sure you want to delete ' + name + ' ?')) {
            phboookService
            .remove(entryID)
            .then(response => {
                console.log(name, ' is removed')
                alert(name + ' is removed')
            })
            .catch(error => {
                alert(name + ' is already removed')
            })
        }
    }

    return(
        <div>
            <div>
                <h4 key={id}>
                   {entryID} {name} - {number} <button onClick={delEntry}>delete</button>
                   
                </h4>
            </div>
        </div>
    )
}

export default Persons