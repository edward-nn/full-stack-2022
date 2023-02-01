import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './Note'
import './App.css';
//import {fetchUsers} from './api'
//import City from './City'
//import Row from './Row'

const processContact = contact => ({
  capital: `${contact.capital} `,
  area: contact.area,
  languages: contact.languages,
  flags: contact.flags.png,   

})

const One = (props) => { 
  console.log('propsOne', props) 
  const [city, setCity] = useState(props.contries)
  //const { contries } = props
  const [notes, setNotes] = useState([])
  //const [city, setCity] = useState(props.contries)
console.log('city', city)
  
  useEffect(() => {
    console.log('effect')
  
    const eventHandler = response => {
      console.log('promise fulfilled', response)
      const data = response.data.map(processContact)
      setNotes(data)
    }
  
    const promise = axios.get(`https://restcountries.com/v3.1/name/${city}`)
    promise.then(eventHandler)
  }, [])

   console.log('notes', notes)

  return (
    <div className='One'>
      <h1>{city}</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
    
    
  )
 }
  
  export default One