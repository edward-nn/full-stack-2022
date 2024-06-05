import { configureStore } from '@reduxjs/toolkit'

import blogsReducer  from './reducers/blogsReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import  usersReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    blog: blogsReducer,
    filter: filterReducer,
    notification: notificationReducer,
    user: usersReducer
  }
})

export default store