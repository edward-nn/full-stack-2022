//import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { registerUsers } from '../reducers/userReducer'

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

const LoginForm = () => {
  const dispatch = useDispatch()

  const password = useField('password')
  //const name = useField('text')
  const username =useField('text')
  // eslint-disable-next-line
  let color = ''

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('nameLogin', username.value)
    // dispatch(saveToken(username, password))
    dispatch(registerUsers(username.value, password.value))
      .then(() => dispatch(showNotification(`Welcome '${username.value}' `, 5, color ='green')))
      .catch(() => {
        dispatch(showNotification('Wrong username or password: ', 5, color ='red'))
      })

  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
         username
          <input
            id='username'
            {...username}
          />
        </div>
        <div>
          password
          <input
            id='password'
            {...password}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}


export default LoginForm