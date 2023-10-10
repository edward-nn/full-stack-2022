const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let noteObject = new Blog(helper.initialNotes[0])
  await noteObject.save()

  noteObject = new Blog(helper.initialNotes[1])
  await noteObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/bloges')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/bloges')

  expect(response.body).toHaveLength(helper.initialNotes.length)})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/bloges')

  const contents = response.body.map(r => r.title)

  expect(contents).toContain(
    'First class tests'
  )
})

test('a valid note can be added ', async () => {
  const newNote = {
    title: 'Second class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 1,
  }

  await api
    .post('/api/bloges')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
  const contents = notesAtEnd.map(n => n.title)
  expect(contents).toContain(
    'Second class tests'
  )
})

test('note without content is not added', async () => {
  const newNote = {
    likes: 1111,
  }

  await api
    .post('/api/bloges')
    .send(newNote)
    .expect(400)

  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length)})

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()

  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/bloges/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(resultNote.body).toEqual(noteToView)
})

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api
    .delete(`/api/bloges/${noteToDelete.id}`)
    .expect(204)
  const notesAtEnd = await helper.notesInDb()

  expect(notesAtEnd).toHaveLength(
    helper.initialNotes.length - 1
  )

  const contents = notesAtEnd.map(r => r.content)

  expect(contents).not.toContain(noteToDelete.content)
})



afterAll(async () => {
  await mongoose.connection.close()
})

