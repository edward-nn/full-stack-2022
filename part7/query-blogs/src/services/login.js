/* eslint-disable linebreak-style */
import axios from 'axios'
const baseUrl = '/api/login'

export const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export const createNote = newNote =>
  axios.post(baseUrl, newNote).then(res => res.data)
