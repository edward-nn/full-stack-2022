import { useState } from 'react'
import {
  useNavigate
} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useMutation } from '@tanstack/react-query'
import { login } from '../services/login'
import { setToken } from '../services/blogs'
import { useCounterDispatch } from '../components/NotificationContext'

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
  const navigate = useNavigate()
  const dispatch = useCounterDispatch()

  const password = useField('password')
  const username =useField('text')
  let message = null

  const newNoteMutation = useMutation({
    mutationFn: login,
    onSuccess(newLogin) {
      setToken(newLogin.token)
      dispatch({ type: 'DATA_USER', payload: newLogin })
      message = {
        content: `Logged as ${username.value}`,
        variant: 'success'
      }
      dispatch({ type: 'SHOW_NOTIFICATION', payload: message },
        setTimeout(() => {
          dispatch({
            type: 'HIDE_NOTIFICATION'
          })
        }, 5000 ))
    },
  })

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      await newNoteMutation.mutateAsync({
        username: username.value,
        password: password.value
      })
    } catch (err) {
      console.error(err)
      message = {
        content: ` Wrong credential with error: ${err.message}`,
        variant: 'danger'
      }
      dispatch({ type: 'SHOW_NOTIFICATION', payload: message },
        setTimeout(() => {
          dispatch({
            type: 'HIDE_NOTIFICATION'
          })
        }, 5000 ))
    }
    navigate('/')
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={onSubmit}>
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
        <Button id="login-button" type="submit">login</Button>
      </form>
    </div>
  )
}


export default LoginForm