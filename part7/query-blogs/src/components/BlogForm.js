import  { useState } from 'react'
import {  useMutation, useQueryClient } from '@tanstack/react-query'
import {  useCounterDispatch } from '../components/NotificationContext'
import blogService from '../services/blogs'

const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  return {
    type,
    value,
    onChange
  }
}
const BlogForm = () => {
  const dispatch = useCounterDispatch()
  const queryClient = useQueryClient()
  let message = null
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  // eslint-disable-next-line
  let color = ''
  // eslint-disable-next-line
  const handleSubmit = (e) => {      
    message = {
      content: `Blog ${title.value} added `,
      variant: 'success'
    }

    try{
      newBlogMutation.mutate({
        title: title.value,
        author:author.value,
        url:url.value
      })
      dispatch({ type: 'SHOW_NOTIFICATION', payload: message },
        setTimeout(() => {
          dispatch({
            type: 'HIDE_NOTIFICATION'
          })
        }, 5000 ))
    }catch(error){
      // Handle errors here
      console.log('error', error)
      message = {
        content: ` Blog with error: ${error.message}`,
        variant: 'danger'
      }
      dispatch({ type: 'SHOW_NOTIFICATION', payload: message },
        setTimeout(() => {
          dispatch({
            type: 'HIDE_NOTIFICATION'
          })
        }, 5000 ))
    }
    //newCreateMutation.mutate({ content, id: getId(), votes: 0, })
  }


  return (
    <div>
      <h2>create new </h2>
      <form onSubmit={handleSubmit} >
        <div>
          <label>title</label>
          <input
            id='title-input'
            {...title}
          />
        </div>
        <div>
          <label>author</label>
          <input
            id='author-input'
            type="text"
            {...author}
          />
        </div>
        <div>
          <label>url</label>
          <input
            id='url-input'
            {...url}
          />
        </div>
        <div>
          <button className="click">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm