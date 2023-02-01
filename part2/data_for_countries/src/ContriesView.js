import List from './List'
import One from './One';

const ContriesView = (props) =>{
      //console.log('propsContries', props)
      return (
        <div>
          <div>
            {
              props.contries.length > 10 ? (`Too many matches, specify another filter`):

              props.contries.length > 1 && props.contries.length < 10 ? (
                < List contries = {props.contries} key={props.id}/>
                
              ) : props.contries.length === 1 ? (
                < One  contries = {props.contries}/>
              ) : (`No matches, specify another filter`)
            }      
        </div>
        </div>
        )
    }
        
    
    
    export default ContriesView