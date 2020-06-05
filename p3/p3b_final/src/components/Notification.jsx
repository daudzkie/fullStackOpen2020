import React from 'react'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  let styleCheck = ({})

  if (error) {
    styleCheck = {
      color: 'red',
      backgroundColor: '#lime',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,   
    }
  } else {
    styleCheck = {
      color: 'green',
      backgroundColor: '#00968',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,   
    }
  }

  return (
    <div style={styleCheck}>
      {message}
    </div>
  )
}

export default Notification