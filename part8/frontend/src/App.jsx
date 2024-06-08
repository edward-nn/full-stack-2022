import { useState } from 'react'
import { useQuery, useApolloClient   } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS } from './queries'
import LoginForm from './components/LoginForm'
import User from './components/User'

const App = () => {
  const result = useQuery(ALL_AUTHORS)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  if (result.loading)  {
    return <div>loading...</div>
  }


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <>        
        <LoginForm setToken={setToken} />
      </>
    )
  }


  return (
    <div>
      <div>
      <button onClick={logout}>logout</button>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
      <User show={page === 'recommended'} />
    </div>
  )
}

export default App
