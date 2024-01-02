import { useNotificationValue } from "./NotificationContext"

const Notification = () => {
    const notification = useNotificationValue()
    

    if (!notification) return null

    return (
        <div style={style}>
            {notification}
        </div>
    )
}

export default Notification

const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
}