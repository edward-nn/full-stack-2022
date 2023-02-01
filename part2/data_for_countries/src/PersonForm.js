import React, { useState } from 'react'

const initialFormState = { id: null, name: '', number: '' }

const PersonForm = (props) => {
  
  const [user, setUser] = useState(initialFormState)

  const handleInputChange = (event) => {
    
    const { name, value } = event.target
    
    setUser({ ...user, [name]: value })
  }

  return (
    <form
    onSubmit={event => {
      event.preventDefault()
      if (!user.name || !user.number) return

      props.addPerson(user)
      setUser(initialFormState)
    }}
  >
            <div>
  <label>Name</label>
  <input
    type="text"
    name="name"
    value={user.name}
    onChange={handleInputChange}
  />
  </div>
  <div>
  <label>Number</label>
  <input
    type="text"
    name="number"
    value={user.number}
    onChange={handleInputChange}
  />
  </div>
  <div>
  <button className="click">Add</button>
  </div>
</form>
  )
}

export default PersonForm