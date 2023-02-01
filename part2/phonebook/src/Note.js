import Languages from './Languages'

const Note = ({ note }) => {
  //console.log('noteNote', note)
  
  return (
      <div>
          
          <span>capital: </span>{note.capital}
          <p><span>area: </span>{note.area}</p>
          
          <p><span>languages: <Languages languages={note.languages} key={note.id}  /></span></p>         
          
          <img src={note.flags} className="App-flags" alt="flags" />


      </div>
    
  )
}

export default Note