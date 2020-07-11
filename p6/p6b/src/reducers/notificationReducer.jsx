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

// export const setNotification = (content, duration) => {
//   return dispatch => {
//     dispatch({
//       type: 'NOTIFY',
//       data: content
//     })
//     setTimeout(() => {
//       dispatch({
//         type: 'CLEAR_NOTIFY',
//       })
//     }, duration * 5)
//   }
// }

export default notificationReducer