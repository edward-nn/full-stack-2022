import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const initialState = window.localStorage.getItem('loggedAppUser')
  ? JSON.parse(window.localStorage.getItem('loggedAppUser'))
  : {    user: null }

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setToken: (state, action) => action.payload,
    // eslint-disable-next-line
    unregiterUser(state, action) {
      state.user = null
    },
    // eslint-disable-next-line
    initial_User(state, action){state.user =initialState}
  }
})
export const setUserToken = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')

    let user = null
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
    dispatch(setUser({ user }))
  }
}
//export const selectUser = (state) => state.user.user
export const selectUser =(state) => {
  if (state && state.user) {
    return state.user.user
  } else {
    // обработать случай, когда state не определен или не содержит поле blog
    return initialState
  }
}
export const initialUser = () => {
  return async dispatch => {
    dispatch(initial_User())
  }
}

export const removeToken = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedAppUser')
    blogService.setToken(null)
    dispatch(unregiterUser())
  }
}

export const registerUsers = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password
    })
    window.localStorage.setItem(
      'loggedAppUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }}

export const { setUser, setToken, unregiterUser, initial_User } = userSlice.actions

export default userSlice.reducer