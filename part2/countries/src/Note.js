import Languages from './Languages'
import Forecast from './components/Forecast/Forecast'

const Note = ({ note }) => {
  //console.log('noteNote', note)
  
  return (
      <div>
          
          <span>capital: </span>{note.capital}
          <p><span>area: </span>{note.area}</p>
          
          <p><span>languages: <Languages languages={note.languages} key={note.id}  /></span></p>         
          
          <img src={note.flags} className="App-flags" alt="flags" />

          < Forecast capital={note.capital}/>


      </div>
    
  )
}

export default Note