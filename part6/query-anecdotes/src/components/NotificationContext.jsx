/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useEffect} from "react";

const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION' 
const ERROR_NOTIFICATION = 'ERROR_NOTIFICATION'

const initialState =[ ]

const notificationReducer = (state, action) => {
    switch(action.type) {
        case SHOW_NOTIFICATION:
            console.log("SHOW_NOTIFICATION", action);
            return action.payload
        case HIDE_NOTIFICATION:
                console.log("HIDE_NOTIFICATION", action);
                return initialState
         case ERROR_NOTIFICATION:
                    return 'too shot anecdote, must have length 5 or more'        
                default:
                  return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = props => {
    
    const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

        return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}
const useHideNotification = () =>{
    useNotificationDispatch({
      type: HIDE_NOTIFICATION
    })
  }

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext