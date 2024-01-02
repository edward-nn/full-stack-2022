import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../components/requests'
import { getId } from '../components/GetId'
import { useNotificationDispatch } from "./NotificationContext"


const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newCreateMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']) 
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote)) 
 },
 onError: function () {
  dispatch({ type: 'ERROR_NOTIFICATION' });
  setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), 5000);
},
  })
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newCreateMutation.mutate({ content, id: getId(), votes: 0, })  
    console.log('new anecdote')
}


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
