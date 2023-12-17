/* eslint-disable linebreak-style */
import { useState } from 'react'
import style from '../index.css'

const Blog = ({  blog, updateBlog, deleteBlog, user ='' }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const buttonLabel = visible ? 'hide' : 'view'

  const userNameBlog = blog.user ?  blog.user.name : ''
  const name = user.name ? user.name : ''

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(updatedBlog)
  }

  const showRemoveButton = (id) => {
    if(window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      deleteBlog(id)
    }
  }


  
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
          <span className='blogLikes'>  likes: {blog.likes}<button onClick={handleLike}>like</button><br /></span>
          <span className='blogUser'>  user: {userNameBlog}<br /></span>
          <div>{
            userNameBlog === name ?(
              <button className="deleteButton"style={style.deleteButton} onClick={() => showRemoveButton(blog.id)}>remove</button>
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

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

export default Blog