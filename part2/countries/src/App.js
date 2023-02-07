    import { useState, useEffect } from 'react'
    import axios from 'axios'
    import Filter from './Filter';
    import ContriesView from './ContriesView';

    //const initialState = { }
    const App = () => {  
        const [notes, setNotes] = useState([]) 
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [search, setSearch] = useState("")

    const processContact = contact => ({
      name: contact.name.common
      //name: `${contact.name.first} ${contact.name.last}`,
      //phone: contact.phone,
    })
  
  
    const hook = () => {
      console.log('effect')
      axios
        .get('https://restcountries.com/v3.1/all?fields=name')
        .then(response => {
          //console.log('promise fulfilled', response)
          setNotes(response.data)
        })
    }

  useEffect(hook, [])

  const cites = notes.map(note =>note.name.common)
  console.log('notes', notes)

  const filtered = !search
  ? newNote
  : cites.filter((city) =>
      city.toLowerCase().includes(search.toLowerCase())
    );

    const handleSearchChange = (value) => {
      setSearch(value);
    };

    console.log('filtered', filtered)

    return(
      <div>
          <Filter handleSearchChange={handleSearchChange}  />
          < ContriesView contries={filtered} />
          
      </div>
      
  )

    }


    export default App