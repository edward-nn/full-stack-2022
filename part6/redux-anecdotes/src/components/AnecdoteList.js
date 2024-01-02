import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//import {votesOf } from '../reducers/anecdoteReducer'
import { initializeAnecdotes, saveVoteAnecdote} from '../reducers/anecdoteReducer'
import { createNotification, clearNotification, showNotification } from '../reducers/notificationReducer'


  const sortByVotes = (a, b) => {
    return b.votes - a.votes
  }

  
  const AnecdoteList = () => {
    const filterAnecdote = useSelector(state => state.filter)
    const anecdotes = useSelector(state => {
      if ( state.filter === 'ALL' ) {
        return state.anecdotes
      }
      return state.filter  === 'SET_FILTER' 
      ? state.anecdotes
      : state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterAnecdote.toLowerCase()))
    })
    const arrayForSort = [...anecdotes]
console.log('anecdotes', anecdotes)
  const dispatch = useDispatch()
  
  const vote = (id, content) => {
    console.log('vote', id)
    console.log('voteContent', content)
       
        dispatch(saveVoteAnecdote(id))
    dispatch(showNotification(content, 5))  
    
  }
  

  return (
    <div>
        {arrayForSort.sort(sortByVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )}

  export default AnecdoteList