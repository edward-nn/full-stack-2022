import React from 'react'
import { useGetUser } from './useGetUser'

const MyComponent = ( username, password ) => {
  const { data, isLoading } = useGetUser(username, password)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <div>Data: {data.user}</div>
}

export default MyComponent