import { useSelector } from 'react-redux'

const Notification = () => {
  let notification = null
  notification = useSelector(state => state.notification)
  let color = notification !== null ? notification.color : ''

  let blogStyle = {
    color: '',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const style={ ...blogStyle, color:color }

  console.log('notification', notification)

  return (
    <div >
      <div>{
        notification !== null ?(
          <div style={style}>{notification.text}</div>
        ) : (
          <> </>
        )
      }
      </div>
    </div>
  )
}


export default Notification