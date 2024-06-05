import { useMatch } from 'react-router-dom'

import { useCounterValue } from '../components/NotificationContext'

const User = () => {
  const counter = useCounterValue()
  const users  = counter ? counter.users : []
  const match = useMatch('/users/:id')
  const  user = match
    ? Object.values(users).find((obj) => obj._id === match.params.id)
    : null
  if (!user) return null
  const upperCaseName = user && user.name[0].toUpperCase() + user.name.slice(1)
  return (
    <div className="user">
      <h2>{upperCaseName}</h2>
      <h3>Added blogs:</h3>
      <ul style={{ padding: 0 }}>
        {user.blogs &&
          user.blogs.map((blog) => {
            return (
              <li key={blog.id} className={'blog-list-item'}>
                {blog.title}
              </li>
            )
          })}
      </ul>
    </div>
  )
}
export default User