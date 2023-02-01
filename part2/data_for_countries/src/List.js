import React, { useState } from 'react'
import One from "./One"
import ContriesView from "./ContriesView"

//const Button = ({ handleClick, text }) => (<button onClick={hello()}>    {text}  </button>)

const Button = (props) => (
  <button onClick={console.log('helloProps', props)}>
    {props.text}
  </button>
  
)

const hello = (who) => {
  console.log('propsWho', who)
  return () => {    
    console.log('helloProps', who)
  }
}

const List = (props) => {
  const [show, setShow] = useState(false);
  console.log('propsList', props)
  const [forecast, setForecast] = useState(null);

  //setForecast({city: searchData.label,...forecastResponse});

  const handleClick =() =>{
  
    console.log('clicked the button')
  }
  

    
      return (
      <div> 
        <div>{    props.contries.sort().map((contry) =>    
      (
        <tr key={contry.id}>
          <td>{contry } 
          <button  onClick={() => setShow(!show)}>
            {show ? "hide" : "show"}
          </button>
          {show && ( // use show flag to conditionally render country info
            <One 
            contries={contry}              
            />
          )}
  </td>          
          <td>
          </td>
        </tr>
      )  
      )
    }      
    </div> 
        </div>
      ) 
  }   
    
      
  
  
  
   
  export default List