const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor
const Blog = require('../models/blog')
//const User = require('../models/user')

/***
  const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
***/


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
//.catch(error => next(error))

blogRouter.get('/:id', async(request, response) => {
  const note = await Blog.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', userExtractor, async(request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  //const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  //const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or token invalid' })
  }
  const user = request.user
  //const user = await User.findById(decodedToken.id)
  //const user = await User.findById(body.userId)
  if (!user) {
    return response.status(404).send({ error: 'user missing or invalid' })
  }
  //console.log('user', user._id)
  //const likes = body.likes === 'underfined' ? 0 : body.likes
  //  const blog = new Blog(request.body)
  //if(body.likes === underfined)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes:  body.likes || 0,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const token = request.token
  console.log('token: ' + token)
  //const body = request.body
  //console.log('body', body)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log('decodedToken', decodedToken)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)

  if(!blog) {
    response.status(204).end()
  } else if ( blog.user && blog.user.toString() === decodedToken.id.toString() ) {
    //    await Blog.findByIdAndRemove(request.params.id)
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else{
    response.status(403).json({ error: 'Not Authorized: only creator can delete the blog' })
  }
})

blogRouter.put('/:id', async(request, response) => {
  //const post = Blog.findById(request.params.id)
  //console.log(JSON.parse(JSON.stringify(post)))
  //console.log(JSON.parse(post)


  /***
    if(post === null){
    response.status(404).json({ error: 'Post not found' })
  }
***/
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true }
  )
  //console.log('updatedBlog', updatedBlog)
  if (!updatedBlog) {
    return response.status(404).send()
  }
  response.status(200).json(updatedBlog)
})

/***
  blogRouter.put('/:id', async(request, response) => {
  const post = Blog.findById(request.params.id)
  //console.log('post', post)
  if(!post){
    response.status(404).json({ error: 'Post not found' })
  }

  const newLikes = request.body.likes

  const blog = {
    ...post,
    likes:newLikes,
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true })
  response.status(200).json(result)
})
***/

module.exports = blogRouter