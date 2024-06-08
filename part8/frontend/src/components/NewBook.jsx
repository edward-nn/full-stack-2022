import { useState } from 'react'
import { useMutation, useSubscription } from '@apollo/client'
import {ADD_NEW_BOOK, ALL_BOOKS, BOOK_ADDED} from '../queries'


export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(null)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => { 
	const addedBook = data.data.bookAdded
      console.log(`${addedBook.title} added`)
      
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      window.alert(`${addedBook.title} added`);     
                        }
  })  
  
  const [  addNewBook  ] = useMutation(ADD_NEW_BOOK, {
        onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log('NewBook_messagesEror', messages)
      //setError(messages)
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        }
      })
    },
  }) 

  if (!props.show) {
    return null
  }

  

  const submit = async (event) => {
    event.preventDefault()
    addNewBook({  variables: { title, author, published, genres } })
    console.log('add book...')


    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook