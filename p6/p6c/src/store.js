import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
//  import anecdotesService from './services/anecdotesService'

const reducers =  combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer
})

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk)
))

// anecdotesService.getAll().then(anecdotes =>
//   anecdotes.forEach(anecdote => {
//     store.dispatch({ type: 'INIT_ANECDOTES', data: anecdote })
//   })
// )

export default store