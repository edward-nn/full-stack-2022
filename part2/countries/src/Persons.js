import './App.css'

const Persons = (props) =>{
 //console.log('propsPersons', props)
  return (
    <div>
      <div>{
          props.users.length > 0 ? (
        
            props.users.map((user) => (
              <tr key={user.id}>
                <td>{user.name }</td>
                <td>{user.number}</td>
                <td><button   onClick={() => props.deleteUser(user.id)}
                  className="click">  Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No users</td>
            </tr>
          )}      
    </div>
    </div>
    )
}
    


export default Persons