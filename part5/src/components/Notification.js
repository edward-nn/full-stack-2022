const Notification = ({ message, color }) => {
  let blogStyle = {
    color: '',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  blogStyle={ ...blogStyle, color:color }

  if (message === null) {
    return null
  }

  return (
    <div className="error" style={blogStyle}>
      {message}
    </div>
  )
}

export default Notification