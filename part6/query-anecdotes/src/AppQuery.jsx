import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../src/components/requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from "./components/NotificationContext"

const AppQuery = () => {
  
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const {data, error, isLoading} = useQuery({ 
    queryKey: ['anecdotes'], 
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
    })
//console.log(JSON.parse(JSON.stringify(data)))

if ( isLoading ) {    return <div>anecdote service not available due to problems in server</div>  }
if(error){
      return null
}
const anecdotes  = data ? data : []

  const handleVote = (anecdote) => {
    //console.log('vote')
    const message = ` anecdote ${anecdote.content} voted `
    const changedState = {
        ...anecdote,
        votes: anecdote.votes + 1
        }
        
      
    updateAnecdoteMutation.mutate(changedState) 
     notificationDispatch({type: 'SHOW_NOTIFICATION', payload: `anecdote '${anecdote.content}' voted`},
    setTimeout(() =>{
      notificationDispatch({
          type: 'HIDE_NOTIFICATION'
      })
  }, 5000 )
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppQuery
