import React from 'react'
import ReactDOM from 'react-dom'
// import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
// import filterReducer from './reducers/filterReducer'
// import anecdoteReducer from './reducers/anecdoteReducer'
// import reducer from './reducers/andecdoteReducer'
import store from './store'

// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   filter: filterReducer
// })

// const store = createStore(reducer)
// console.log(store.getState())

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
)