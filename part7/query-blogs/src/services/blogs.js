import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
export const setToken = newToken => {  token = `Bearer ${newToken}`}
console.log('token', token)


const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}
const create = async newObject => {
  const config = {    headers: { Authorization: token },  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const update = async (id, newObject) => {
  const response =  await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}
const updateComent = async (id, newObject) => {
  const response =  await axios.post(`${baseUrl}/${id}/comments`, { comments:newObject })
  return response.data
}
const updateComment = async (id) => {
  try {
    const response = await axios.post(
      `${baseUrl}/${id.id}/comments`,
      { comments: id.blog }
    )
    return response.data
  } catch (error) {
    // Handle any errors (e.g., network issues, server errors)
    console.error('Error sending comment:', error.message)
    throw error // Rethrow the error or handle it appropriately
  }
}

const updateComments = async (updatedBlog) => {
  const { id, comments } = updatedBlog
  const data = { comments }

  const res = await axios.post(`${baseUrl}/${id}/comments`, data)
  return res.data
}

const addComment = async (comments, blogId) => {
  const response = await fetch(`${baseUrl}/${blogId}/comments`, {
    method: 'POST',
    //headers,
    body: JSON.stringify({ comments })
  })
  if (response.ok) {
    return response.json()
  } else {
    const { error } = await response.json()
    if (error) throw new Error(error)
    else throw new Error(response.statusText)
  }
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}
const updateBlog = updatedBlog =>
  axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog).then(res => res.data)

export  const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}


export default { getAll, create, update, setToken, remove, updateBlog, getById, updateComment, updateComments,  addComment, updateComent  }