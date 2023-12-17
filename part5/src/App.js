import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Footer from './components/Footer'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [colorNew, setColorNew] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const sortByLikes = (a, b) => {
    return b.likes - a.likes
  }

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs( blogs )
  }


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getAllBlogs()
    }  }, [])

  const blogFormRef = useRef()

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      getAllBlogs()
    } catch (exception) {
      setErrorMessage('Invalid blog id')
      setColorNew('red')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = user => {
    blogFormRef.current.toggleVisibility()
    //event.preventDefault()
    const blogObject = {
      title: user.title || '',
      author: user.author || '',
      url: user.url || '',
      likes: user.likes || ''
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(
          `a new blog:'${user.title}' by '${user.author}' added`
        )
        getAllBlogs()
        setColorNew('green')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }


  const logoutForm = () => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
  }


  const updateBlog = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService
        .update(blogToUpdate.id, blogToUpdate)
      setErrorMessage(
        `Blog ${blogToUpdate.title} was successfully updated`
      )
      setColorNew('green')
      setBlogs(blogs.map(blog => blog.id !== blogToUpdate.id ? blog : updatedBlog))
      getAllBlogs()
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage(
        `Cannot update blog ${blogToUpdate.title}`
      )
      setColorNew('red')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      getAllBlogs()
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setColorNew('red')
      setTimeout(() => { setErrorMessage(null)}, 5000)
    }
  }

  return (
    <div>
      <Notification message={errorMessage} color={colorNew} />
      {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }
      {user && <div>
        <div><h2>blogs</h2></div>
        <p>{user.username} logged in <button onClick={() => logoutForm()}>logout</button></p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
        {blogs.sort(sortByLikes).map((blog, i) =>
          <Blog key={i} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
        )}

        <Footer />
      </div>
      }
    </div>
  )
}

export default App