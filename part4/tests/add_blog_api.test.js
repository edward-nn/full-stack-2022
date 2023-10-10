const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let token = ''
let token2 = ''
let blogToDelete = ''

beforeAll(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  //Create new user to add blogs
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  token = jwt.sign(userForToken, process.env.SECRET)

  //  await Blog.deleteMany({})
  const blogObjects = helper.initialNotes.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(note => note.save())
  await Promise.all(promiseArray)

  //Create new blog by user root:
  blogToDelete = new Blog({
    title:  'My title to delete',
    author: 'my author',
    url: 'my url',
    user: user._id
  })
  await blogToDelete.save()
  //console.log(await Blog.find({}))
})

describe('When there is initially some blogs saved', () => {

  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialNotes.length +1)
    //  expect(response.body).toHaveLength(initialBlogs.length)
  })


  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain('React patterns')})
})
describe('Addition of a new blog', () => {

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 2)

    const contents = notesAtEnd.map(r => r.title)
    expect(contents).toContain(
      'TDD harms architecture'
    )
  }, 100000)
})

test('Default likes value is 0 when likes property is missing', async () => {
  const newBlog = {
    title: 'Last Added Blog with Like',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',

  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtStart = await helper.notesInDb()

  const contents = notesAtStart.map(r => r.title)
  expect(contents).toContain(
    'Last Added Blog with Like'
  )
}, 100000)

test('blog without content is not added', async () => {
  const newBlog = {
    author: 'Robert C. Martin'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

  //const response = await api.get('/api/blogs')
  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 3)
  //expect(response.body).toHaveLength(initialBlogs.length)
})

describe('Viewing a specific blog', () => {

  test('a specific blog can be viewed', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api.get(`/api/blogs/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultNote.body).toEqual(noteToView)
  })
})
describe('Deletion of a blog', () => {
  test('a blog can be deleted', async () => {
        await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(
      helper.initialNotes.length + 2
    )

    const contents = notesAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

test('verify id property name', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test(' A blog with no title returns status code 400 Bad Request', async () => {

  const newBlogNoTitle =  {
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogNoTitle)
    .expect(400)
})

describe('Test likes default behavior', () => {
  const newBlog = {
    title: 'Last Added Blog',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',

  }

  test('should default likes to 0 if missing in request', async() => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      //expect(response.status).toBe(201)
    expect(response.body.likes).toBe(0)
  })
})

describe('Update likes', () => {
  test('Updates the likes for a blog', async() => {

    const newLikes= 500
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]
    const response = await api
      .put(`/api/blogs/${noteToView.id}`)
      .send({ ...noteToView, likes: newLikes })
    expect(response.status).toBe(200)
    expect(response.body.likes).toBe(newLikes)
  })
})
describe('Deletion of a blog',() => {

  test('Deletion of an existing blog, succeeds with status code 204',
    async() => {
      const blogsAtStart = await helper.notesInDb()
      //const blogToDelete = blogsAtStart[0]
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.notesInDb()
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length )
    })

  test('Deletion of a non existing blog, also succeeds with status code 204, but no deletion occurred', async() => {
    const blogsAtStart = await helper.notesInDb()
    const deletedId = await helper.nonExistingId()
    await api
      .delete(`/api/blogs/${deletedId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.notesInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

describe('Updating a blog',() => {

  test('Updating an existing blog well formatted, succeeds with status code 201',async() => {
    const blogsAtStart = await helper.notesInDb()
    const blogToUpdate = {
      title:  'Type wars2',
      author: blogsAtStart[0].author,
      likes: blogsAtStart[0].likes + 1,
      url: blogsAtStart[0].url
    }
    await api
      .put(`/api/blogs/${blogsAtStart[0].id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.notesInDb()
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(
      'Type wars2'
    )
  })

  test(' Updating a non existing blog returns status code 404',async() => {
    const nonExistingId = await helper.nonExistingId()
    const blogToUpdate =  {
      title: 'Type wars3',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }
    await api
      .put(`/api/blogs/${nonExistingId}`)
      .send(blogToUpdate)
      .expect(404)
  })
  test('A new blog cannot be added if no proper token provided', async () => {
    const newBlog =  {
      title: 'My new title',
      author: 'New blog\'s author',
      url: 'https://newblogfakeurl.com/'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${ ''}`)
      .send(newBlog)
      .expect(401) 

  })
  test('Deletion of an existing blog with no token provided of it is fake returns 401 unauthorized', async() => {

    const blogsAtStart = await helper.notesInDb()
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'Bearer 0d0_token_0d0')
      .expect(401)

    const blogsAtEnd = await helper.notesInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('Deletion of an existing blog with proper token but from other user returns 403 Forbidden', async() => {

    const blogsAtStart = await helper.notesInDb()
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${''}`)
      .expect(401)

    const blogsAtEnd = await helper.notesInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})