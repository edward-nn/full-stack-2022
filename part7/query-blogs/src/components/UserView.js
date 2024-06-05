import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserView = () => {
  const users = useSelector(state => state.usersReduc)
  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (!user) {
    return null
  }

  return (
    <div>
      <div>
        <h3>{user.name} </h3>
        <h4>added blogs</h4>
        <ul>
          {user.blogs.map(blog =>
            <li key={blog.id}> {blog.title} </li>
          )}
        </ul>
      </div>
    </div>
  )}

export default UserView