import { useState, useEffect } from 'react'
import Persons from './Persons';
import Filter from './Filter';
import PersonForm from './PersonForm';
import apiService from './services/api';
import Notification from './components/Notification'

const initialFormState = { id: null, name: '', number: '' }

const App = () => {
  
  const [persons, setPersons] = useState(initialFormState)
  const [colorNew, setColorNew] = useState('green')
  const [message, setMessage] = useState(null)
  
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

  const hook = () => {
    //console.log('effect')
    apiService.getAll()      
      .then(initialNotes => {
        console.log('promise fulfilled', initialNotes)
        setPersons(initialNotes)
      })
  }
  
  useEffect(hook, [])

  const [search, setSearch] = useState("")

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const Filtered = !search
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        );
  
  const addPerson = user => {
    //console.log('userAdd', user)
    const personExists = persons.find(person => person.name === user.name);
    //console.log('personExists', personExists)

if (!personExists) {
  const personObject = {
        name: user.name,
    number: user.number,
    id: generateId(),
    }
apiService.create(personObject).then(
  returnNewPerson =>{
    setPersons(persons.concat(returnNewPerson))
  }
)
setMessage(
  `'${user.name}' was already Add to the server`
)
setColorNew('green');
setTimeout(() => {
  setMessage(null)
}, 5000)  
//setPersons(persons.concat(personObject))
}
else { 
  if (window.confirm(`${user.name} is already added to phonebook, replace the old number with a new one? `)) {
    updateNumber(personExists.id, user)
    //alert(`${user.name} is already added to phonebook`)

  }
  
}
  }

  const deleteUser = (id) => {
    const namePerson = persons.find(person => person.id === id);

    //console.log('userDelete', namePerson.name)
    if (window.confirm(`Delete ${namePerson.name} ? `)) {
      apiService.deleteUser(id).then(
        returnedPerson =>{
              setPersons(persons.filter((user) => user.id !== id));
        }
      )
      //setPersons(persons.filter((user) => user.id !== id));
  }
  }

  const updateNumber = (id, user) => {
    //console.log('userUpdate', user)
    const note = persons.find(n => n.id === id)
    const changedNote = { ...note, number: user.number }
    apiService
    .update(id, changedNote)
    .then(returnedNote => {
      setPersons(persons.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      setMessage(
        `Information of '${user.name}' has already been removed from server`
      )
      setColorNew('red');
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setPersons(persons.filter((user) => user.id !== id));
      
    })
    
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={colorNew}/>
      <Filter handleSearchChange={handleSearchChange}  />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson}      
      />    
      
      
      <h3>Numbers</h3>

      <Persons users={Filtered} deleteUser={deleteUser} />
       
    </div>
  )
}

export default App