import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Footer from './components/Footer'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import { setUserToken, removeToken } from './reducers/userReducer'

const App = () => {

  const user = useSelector((state) => state.user.user)
  const blogs = useSelector((state) => state.blog.blogs)


  //console.log('user', user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUserToken())

  }, [dispatch])

  const blogFormRef = useRef()

  const logoutForm = () => {
    dispatch(removeToken())

  }

  if (!blogs) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <Notification />
      {user ? (
        <div>
          <p>{user.username ? user.username : 'guest'} logged in <button onClick={() => logoutForm()}>logout</button></p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <Blogs />
        </div>
      ) : (
        <Togglable buttonLabel="log in">
          <LoginForm />
        </Togglable>
      )}
      <Footer />
    </div>

  )
}

export default App