import { useSelector } from 'react-redux'

const Notification = () => {
  let notification = null
   notification = useSelector(state => state.notification)
  
  /*** setTimeout(() => {
   notification = null
  }, 5000) 
   */

  console.log('notification', notification)
  
  return (
    <div style={style}>
      <div>{
            notification !== null ?(
              <>`You voted on {notification}`</>
            ) : (
              <> </>
            )
          }
          </div>
    </div>
  )
}

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1
}

export default Notification