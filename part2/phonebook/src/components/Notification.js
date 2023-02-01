
const Notification = ({ message, color }) => {
  let noteStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  noteStyle={ ...noteStyle, color:color}

  if (message === null) {
    return null
  }

  return (
    <div style={noteStyle}>
      {message}
    </div>
  )
}

export default Notification