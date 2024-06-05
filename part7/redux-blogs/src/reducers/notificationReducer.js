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
      console.log('actionNotific:', action)
      return state = []
    }
  }
})

export const { createNotification, clearNotification } = notificationSlice.actions

export const showNotification = (text, displayTime, color ) => {
  console.log('text:', text, 'displayTime:', displayTime, 'color:', color)
  let timer
  return async dispatch => {
    clearTimeout(timer)
    //{ notification: notification, style: style }
    dispatch(createNotification({ text, color } ))
    timer = setTimeout(() => {
      dispatch(clearNotification() )
    }, displayTime * 1000)
  }
}

export default notificationSlice.reducer