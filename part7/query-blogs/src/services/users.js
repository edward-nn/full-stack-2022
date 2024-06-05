import axios from 'axios'
const baseUrl = '/api/users'

const addUser = async credentials => {
  console.log('credentials', credentials)
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

export default { getAll, addUser }