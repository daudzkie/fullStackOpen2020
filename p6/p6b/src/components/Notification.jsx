import React from 'react'
import { useSelector } from 'react-redux'
// import { setNotification } from '../reducers/notificationReducer'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  /***timeout does not work */
  // setTimeout(() => {
  //   setNotification('')
  // }, 1000)

  return (
    <div style={style} >
      {notification}
    </div>
  )
}

export default Notification