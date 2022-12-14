const Header = (props) => {
  return (    
      <p>
        {props.course}
      </p>    
  )
}

const Content = (props) => {
  console.log('props', props)
  return(
    <>
      <p>{props.parts[0]}{' '}{props.parts[1]}</p>
      <p>{props.parts[2]}{' '}{props.parts[3]}</p>
      <p>{props.parts[4]}{' '}{props.parts[5]}</p>
    </>
    
  )
}

const Total = (props) => {
  return(
    <p>Number of exersises {props.parts[1] + props.parts[3] + props.parts[5]}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [part1, exercises1, part2,exercises2, part3, exercises3]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}



export default App