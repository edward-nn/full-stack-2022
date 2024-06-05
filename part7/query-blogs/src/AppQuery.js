import { useEffect } from 'react'
import {  Navbar, Nav, Button } from 'react-bootstrap'
import { useCounterValue, useCounterDispatch } from './components/NotificationContext'
import useGetAllBlogsQuery from './services/useGetAllBlogsQuery'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import Login from './components/LoginForm'
import User from './components/User'
import Notification from './components/Notification'


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom'

import blogService from './services/blogs'

const AppRouter = () => {
  const dispatch = useCounterDispatch()
  const state = useCounterValue()
  console.log('stateApp', state)
  const { data, error, isLoading } = useGetAllBlogsQuery(
    ['blogs'],
    blogService.getAll,
    false,
    1
  )

  useEffect(() => {
    dispatch({ type: 'DATA_LOADED', payload: data })
  }, [data])

  const counter = useCounterValue()
  const user  = counter ? counter.user : []

  const padding = {
    padding: 5
  }
  if ( isLoading ) {    return <div> service not available due to problems in server</div>  }
  if(error){
    return null
  }
  const logoutForm = () => {
    dispatch({ type: 'UNREGISTER_USER' })
  }

  return (
    <div className="container">
      <Notification />
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <em>{user.name ? user.name : 'guest'} logged in <Button onClick={() => logoutForm()}>logout</Button></em>
                : <Link to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>

        <Route path="/blogs" element={ <Blogs/>} />
        <Route path="/blogs/:id" element={ <Blog />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/login" element={<Login />} />


        <Route path="/" element={<Blogs />} />
      </Routes>
      <div>
        <br />
        <em>Note app, Department of Computer Science 2024</em>
      </div>
    </div>
  )
}


const AppQuery = () => {
  return (
    <Router>
      <AppRouter />
    </Router>

  )
}

export default AppQuery