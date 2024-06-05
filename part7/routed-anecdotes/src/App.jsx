import { useState } from 'react'
import PropTypes from 'prop-types'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"

import  { useField } from '../src/hooks'
//const content = useField('text')

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    
      <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
    
    
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
    {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    <br />
    <em>
      Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  
    </em>
    </div>
)

const CreateNew = (props) => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()    
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} /> 
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info } />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
      </div>
  )

}

const Anecdote = ({ anecdote }) => {

    return (
      <div>
        <h2><strong>{anecdote.content}</strong></h2>
                <div>has {anecdote.votes} votes</div>
      </div>
    )
  }

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  const addNew = (anecdote) => {
    console.log('anecdote', anecdote)
    const newAnecdote = {
      content: anecdote.content.value,
      author: anecdote.author.value,
      info: anecdote.info.value,
      votes: anecdote.votes.value || 0,
      id: Math.round(Math.random() * 10000)
    }
    
    setNotification(newAnecdote)
    //anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(newAnecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  const Notification = () => {
    const style = {
      border: 'solid',      
      padding: 10,
      borderWidth: 3, 
      borderColor:'red'
    }
    if (!notification.content) return null

    setTimeout(() =>{
      setNotification('')
  }, 5000 )
    
    return (
      <div style={style}>
       a new anecdote {notification.content} created!
      </div>
    )
  }

  return (
    
      <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification />
      <Routes>      
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
      </Routes>
      <br />
      <Footer />
    </div>
    
    
  )
}

const AppWrapper = () => {
    return (
      <Router>
        <App />
      </Router>
    );
  };

  export default AppWrapper

  Anecdote.propTypes = {
    anecdote: PropTypes.object    
  }
  AnecdoteList.propTypes = {
    anecdotes: PropTypes.array
    }
    CreateNew.propTypes = {
      handleSubmit: PropTypes.func,
      addNew:PropTypes.func
    }  