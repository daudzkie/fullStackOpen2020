// import { connect } from 'react-redux'

const filterReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action: ', action.filter)

  switch(action.type) {
  case 'SET_FILTER':
    return action.filter
    // return {
    //   ...statefilter(a => a.includes(action.filter))
    // }
  default:
    return state
  }
}

export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    filter,
  }
}

// const mapStateToProps = state => {
//   return {
//     anecdotes: state.anecdotes
//   }
// }

export default filterReducer
