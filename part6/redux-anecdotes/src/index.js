import React from 'react'
import ReactDOM from 'react-dom/client'
//import { createStore, combineReducers  } from 'redux'
//import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'





//anecdotesService.getAll().then(notes =>  notes.forEach(note => {    store.dispatch(appendAnecdote(note))  }))

//const store = createStore(reducer)
console.log(store.getState())
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)