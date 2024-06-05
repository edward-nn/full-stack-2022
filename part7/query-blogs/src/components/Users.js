import {  useEffect } from 'react'
import { useCounterValue, useCounterDispatch } from '../components/NotificationContext'
import useGetAllBlogsQuery from '../services/useGetAllBlogsQuery'
import userService from '../services/users'
import BlogList from './BlogList'

const Users = () => {
  const dispatch = useCounterDispatch()
  const state = useCounterValue()
  const { data } = useGetAllBlogsQuery(
    ['users'],
    userService.getAll,
    false,
    1
  )

  useEffect(() => {
    dispatch({ type: 'DATA_USERS', payload: data })
  }, [data])

  const users  = state ? state.users : []

  if (users && Object.keys(users).length === 1) {
    return (
      <div>
        <h2>Users</h2>
        <div key={users[0].id}>
          <h5>{users[0].name}</h5>
          <table>
            <tbody>
              <tr>
                <th>Blogs Created</th>
              </tr>
              <tr>
                <td>{users[0].blogs.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        {users && Object.keys(users).length  > 1 ? (
          <div>
            <h4>Users</h4>
            <BlogList blogs={users} />
          </div>

        ) : (
          <div>No blogs available</div>
        )
        }
      </div>
    )
  }

}

export default Users