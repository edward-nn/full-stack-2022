const Header = (props) => {
  console.log('propsHeder', props)
  return (    
      <p>
        {props.course}
      </p>    
  )
}

const Part = (props)=>{
  console.log('propsPart', props)
  return(
    <p>{props.part} {props.exercise}</p>
  )
}

const Content = (props) => {
  //console.log('propsContent', props)
  const part = props.parts.map(value => 
  (
    <>
      <Part part = {value.name} exercise ={value.exercises} />
    </>    
  )
  )
  return part;
}

const Total = (props) => {
  const summary = props.parts.map(value => value.exercises )
  //console.log('summary', summary)
  return(
    <p>Number of exersises {summary[0] + summary[1] + summary[2]}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const parts = [part1, part2, part3]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}



export default App