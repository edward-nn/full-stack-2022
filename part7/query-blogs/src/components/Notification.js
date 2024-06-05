import React from 'react' // Don't forget to import React!
import { Alert } from 'react-bootstrap'
import { useCounterValue } from './NotificationContext'

const Notification = () => {
  const state = useCounterValue()

  if (!state.message) return null

  return (
    <Alert variant={state.message.variant === 'success' ? 'success' : 'danger'}>
      {state.message.content}
    </Alert>
  )
}

export default Notification
