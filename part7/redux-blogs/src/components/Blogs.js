import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, initializeBlog, updateLikes } from '../reducers/blogsReducer'
import { showNotification } from '../reducers/notificationReducer'
import style from '../index.css'

const sortByLikes = (a, b) => {
  return b.likes - a.likes
}


const Blog = ({  blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  // eslint-disable-next-line
  let color = ''

  const updateBlog = (blog) => {
    dispatch(updateLikes(blog))
      .then(() => {
        dispatch(showNotification(`Blog '${blog.title}'was successfully updated `, 5, color ='green'))
      })
      .catch(error => {
        dispatch(showNotification(`Cannot update blog '${blog.title}' '${error}' `, 5, color ='red'))
      })
  }

  const deleteBlogs = blog => {
    console.log('blogDelete', blog)
    dispatch(deleteBlog(blog.id))
      .then(() => {
        dispatch(showNotification(`Deleted '${blog.title}' `, 5, color ='green'))
      })
      .catch(error => {
        dispatch(showNotification(`Invalid blog id '${error}'`, 5 , color ='red'))
      })
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const buttonLabel = visible ? 'hide' : 'view'

  const userNameBlog = blog.user ?  blog.user.name : ''
  const name = user.name ? user.name : ''

  const showRemoveButton = (blog) => {
    if(window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      deleteBlogs(blog)
    }
  }


  //console.log('userName', userName)
  return (
    <div className='blog' style={blogStyle}>
      <div className='hideWhenVisible' style={hideWhenVisible}>
        <div className='blogShot'>
          <span className="blogTitle">{blog.title}</span>
          <span className="blogAuthor">{blog.author}</span>   <button className='hideVisible' onClick={toggleVisibility}>{buttonLabel}</button>
        </div>
      </div>
      <div className='showWhenVisible' style={showWhenVisible}>
        <div className='blogFull'>
          <p> <span className="blogTitle">{blog.title}</span> <span className="blogAuthor">{blog.author}</span> <button className='showWhenVisible' onClick={toggleVisibility}>{buttonLabel}</button> </p>
          <span className='blogUrl'>  https: {blog.url}<br /></span>
          <span className='blogLikes'>  likes: {blog.likes}<button onClick={() => updateBlog(blog)}>like</button><br /></span>
          <span className='blogUser'>  user: {userNameBlog}<br /></span>
          <div>{
            userNameBlog === name ?(
              <button className="deleteButton"style={style.deleteButton} onClick={() => showRemoveButton(blog)}>remove</button>
            ) : (
              <> </>
            )
          }
          </div>
          <div>
          </div>
        </div>
      </div>

    </div>
  )
}

const Blogs = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlog())
  },[dispatch])

  //const blogs = useSelector(state => state.blogs)
  //const sortedBlogs = [...blogs].sort((a, b) => sortByLikes(a, b));
  const blogs = useSelector((state) => state.blog.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => sortByLikes(a, b))
  console.log('blogsUseSelect', blogs)
  /**
    {blogs.sort(sortByLikes).map((blog, i) =>
        <Blog key={i} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
      )}
       ***/

  return (
    <div>
      {!blogs &&<p>No blogs found</p>}

      {blogs && <div>
        <div><h2>blogs</h2></div>
        {sortedBlogs.map((blog, i) =>
          <Blog key={i} blog={blog}/>
        )}
      </div>
      }
    </div>
  )
}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

export default Blogs