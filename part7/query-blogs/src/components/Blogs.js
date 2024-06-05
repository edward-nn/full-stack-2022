import { Link } from 'react-router-dom'
import { useCounterValue  } from './NotificationContext'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = () => {
  const counter = useCounterValue()
  const blogs  = counter ? counter.data : []

  if (!blogs) {    return null  }

  return <div>
    <h2>Blogs</h2>
    <Togglable buttonLabel="create new">
      <BlogForm />
    </Togglable>
    {blogs.map(blog => (
      <li key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </li>
    ))}
  </div>
}

export default Blogs