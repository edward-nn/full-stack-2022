/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'

//const initialFormState = { title: '', author: '', url: '' }
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
  const dispatch = useDispatch()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  // eslint-disable-next-line
  let color = ''

  const handleSubmit = () => {
    console.log('nameLogin', title.value)
    dispatch(createBlog(title.value, author.value, url.value))
      .then(() => dispatch(showNotification(`Added blog '${title.value}' `, 5, color ='green')))
      .catch(error => {
        dispatch(showNotification(`Error adding blog '${title.value} ${error}' `, 5, color ='red'))
      })

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