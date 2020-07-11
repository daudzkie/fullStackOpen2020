const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return action.data
  case 'CLEAR_NOTIFY':
    return ''
  default:
    return state
  }
}

export const setNotification = (notification, duration) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: notification
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFY'
      })
    }, duration * 1000)
  }
}

export default notificationReducer