import { createSlice } from '@reduxjs/toolkit'
const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        createNotification(state, action) {
          console.log('actionNotific:', action)
          return action.payload  
      },
      clearNotification(state, action){
        return state = null
      }      
    }
})  

export const { createNotification, clearNotification } = notificationSlice.actions

export const showNotification = (text, displayTime ) => {
  console.log('text:', text, 'displayTime:', displayTime)
  let timer
  return async dispatch => {
    clearTimeout(timer)
    dispatch(createNotification(text )) 
    timer = setTimeout(() => {
      dispatch(clearNotification() )
    }, displayTime * 1000)
  }
}

export default notificationSlice.reducer