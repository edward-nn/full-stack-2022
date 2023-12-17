/* eslint-disable linebreak-style */
import React, { useState } from 'react'

const initialFormState = { title: '', author: '', url: '' }

const BlogForm = (props) => {
  const [user, setUser] = useState(initialFormState)
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  return (
    <div>
      <h2>create new </h2>
      <form
        onSubmit={event => {
          event.preventDefault()
          props.addBlog(user)
          setUser(initialFormState)
        }}
      >
        <div>
          <label>title</label>
          <input
            id='title-input'
            type="text"
            name="title"
            value={user.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>author</label>
          <input
            id='author-input'
            type="text"
            name="author"
            value={user.author}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>url</label>
          <input
            id='url-input'
            type="text"
            name="url"
            value={user.url}
            onChange={handleInputChange}
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