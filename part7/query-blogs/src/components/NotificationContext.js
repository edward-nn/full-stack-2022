import { createContext, useReducer, useContext } from 'react'

const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

const initialState = {
  data: null,
  error: null,
  user:null,
  message: null,
  users: null
}

const reducer = (state, action) => {
  switch(action.type) {
  case 'ADD_BLOG':
    console.log('ADD_BLOG', action)
    return {
      ...state,
      data: [...state.data, action.payload]
    }
  case 'DATA_LOADED':
    return {
      ...state,
      data: action.payload
    }
  case 'ERROR_OCCURRED':
    return {
      ...state,
      error: action.payload
    }
  case 'DATA_USER':
    return {
      ...state,
      user: action.payload
    }
  case 'DATA_USERS':
    return {
      ...state,
      users: {
        ...state.users,
        ...action.payload // Merge newLogin data into user object
      }
    }

  case 'UNREGISTER_USER':
    return {
      ...state,
      user: null
    }
  case SHOW_NOTIFICATION:
    console.log('SHOW_NOTIFICATION', action)
    return{
      ...state,
      message: action.payload
    }
  case HIDE_NOTIFICATION:
    console.log('HIDE_NOTIFICATION', action)
    return {
      ...state,
      message: initialState.message
    }
  }
  return state
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [counter, dispatch] = useReducer(reducer, initialState)

  return (
    <NotificationContext.Provider value={[counter, dispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useCounterValue = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[0]
}

export const useCounterDispatch = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[1]
}

export default NotificationContext