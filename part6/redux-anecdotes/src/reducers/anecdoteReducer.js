import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  export const getId = () => (100000 * Math.random()).toFixed(0)
  
  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }
  
  //const initialState = anecdotesAtStart.map(asObject)
  const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers:{
        incrementVote(state, action){
          const updatedAnecdote = action.payload
          console.log('updatedAnecdote', updatedAnecdote)
            const id = Number(action.payload.id)
      console.log(typeof id)
      console.log('id', id)
      //const anecdotesToChange2 = state.find(n => console.log(Number(n.id) ))  
      //const anecdotesToChange = state.find(n => Number(n.id) === id)  
      //console.log(anecdotesToChange)
    
      /**const changedState = {
        ...anecdotesToChange,
        votes: anecdotesToChange.votes ++
        }
        console.log('changedState', changedState)
      ***/  
      const newState =  state.map(anecdote =>
        Number(anecdote.id) !== id ? anecdote : {...updatedAnecdote }
        )
        return void newState      
        },
        appendAnecdote(state, action) {
                state.push(action.payload)
                  },
        setAnecdote(state, action) {      return action.payload    }

            }
  })
  

  export const { incrementVote, appendAnecdote, setAnecdote } = anecdoteSlice.actions
  export const initializeAnecdotes = () => { 
     return async dispatch => { 
       const anecdotes = await anecdoteService.getAll()
           dispatch(setAnecdote(anecdotes))  }
          }
         
          export const   createAnecdote = content => {  return async dispatch => {  
              const newNote = await anecdoteService.createNew(content) 
                 dispatch(appendAnecdote(newNote))  }}

  export const saveVoteAnecdote = (id) => {
  return async dispatch => {
    const anecdoteToVote = await anecdoteService.getById(id)
    const votedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }
    const updatedAnecdote = await anecdoteService.updateById(id, votedAnecdote)
    dispatch(incrementVote(updatedAnecdote))   
    dispatch(initializeAnecdotes()) 
  }
  
}                  

  export default anecdoteSlice.reducer