import { createSlice } from '@reduxjs/toolkit'
import { initialUser } from './userReducer'
import blogsService from '../services/blogs'

const initialState = {
  blogs: []
}

const blogSlice = createSlice({
  name: 'blog',
  initialState: initialState,
  reducers: {
    updateLike(state, action){
      console.log('Like_action.payload', action.payload.id)
      // const { someId, someValue } = action.payload
      return state.blogs.map(blog =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
    addBlog: (state, action) => {
      //return [...state, ...state.blogs, action.payload]
      const newBlogs = [...state.blogs]
      newBlogs.push(action.payload)
      state.blogs = newBlogs
    },
    add_Blog(state, action){
      return [...state, ...state.blogs, action.payload]
    },
    addBlogs(state, action){return [...state.blogs, action.data]},
    removeBlog: (state, action) => {
      state.blogs.filter(blog => blog.id !== action.payload.id)
    },
    appendBlog(state, action) {
      state.blogs.push(action.payload)
    },
    setBlogs(state, action) {      return action.payload    },

    updateBlog(state, action){
      return state.blogs.map(blog =>
        Number(blog.id) !== Number(action.payload.id) ? blog : action.payload
      )
    }
  }
})
export const { addBlog, removeBlog, setBlogs, appendBlog, updateBlog, addBlogs, updateLike, add_Blog } = blogSlice.actions

export const initializeBlog = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    //console.log('blogsInisialBlog', blogs)
    dispatch(setBlogs({ blogs }))  }
}

export const   createBlog = (title, author, url) => {  return async dispatch => {
  //console.log('contentCreateBlog', content)
  const newBlog = await blogsService.create({ title, author, url })
  console.log('newBlogService', newBlog)
  dispatch(addBlog(newBlog))
  dispatch(initialUser())
}}


export const updateLikes = (blog) => {
  console.log('blogLikes', blog)
  if (blog) {
    console.log('The blog has ${blog.likes} likes.', blog.id)

  } else {
    console.log('‘The blog is not found.')
  }
  //if (!blog) return console.log('No blogs');

  if (blog && blog.id && Object.keys(blog.id).length > 0) {
    //console.log('The blog has ${blog.likes} likes.', Object.keys(blog.id));
  } else {
    console.log('ID not found or is empty')
  }
  console.log('blogLikesIn', blog)
  if (Array.isArray(blog)) {
  // блог является массивом
    console.log('блог является массивом')
  } else {
    console.log('блог не является массивом')
  // блог не является массивом
  }
  const sortedBlogs = { ...blog }
  const changedBlog = {
    ...sortedBlogs,
    likes: sortedBlogs.likes + 1
  }
  /*** */
  return async dispatch => {
    const updatedBlog = await blogsService.update(changedBlog.id, changedBlog)
    dispatch(updateLike(updatedBlog))
    dispatch(initializeBlog())
  }
}

export const deleteBlog =  (id) => {
  return async dispatch => {
    await blogsService.remove(id)
    dispatch(removeBlog(id))
    dispatch(initializeBlog())
  }
}
export const saveBlog = blog => {
  return async dispatch => {
    const newBlog = await blogsService.create(blog)
    dispatch(addBlogs(newBlog))
    dispatch(initializeBlog())
  }
}

export default blogSlice.reducer