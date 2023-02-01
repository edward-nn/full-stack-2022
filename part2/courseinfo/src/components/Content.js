import Part from "./Part";

const Content = (props) => {
console.log('propsContent', props)

return (
  props.parts.map((value) => (    
    <Part key={value.id} part = {value.name} exercise ={value.exercises} />
  ))
    )
  }

  export default Content;

