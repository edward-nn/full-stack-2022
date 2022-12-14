import { useState } from 'react'
import './App.css';

const Header = (props) => {
  //console.log('propsHeder', props)
  return (    
      <p className="App-header">
        {props.course}
      </p>    
  )
}

const course = {
  name: '',
  
}

const Button = ({ handleClick, text }) => (  <button onClick={handleClick}>    {text}  </button>)

const StatisticLine = ({ text, value, percent }) => {
  return (
    <tbody>
      <tr>
        <td>{text}&nbsp;</td>
        <td>&nbsp;{value} {percent}</td>
      </tr>
    </tbody>
  );
};

const Statistics = (props) => {
  //console.log('propsContent', props)
  if (props.all === 0){
    return(<div>Please give feedback using buttons above</div>)
}
  return(
    <div>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={props.all} />
      <StatisticLine text="average" value ={props.average} />      
      <StatisticLine text="positive" value ={props.positive} percent={<span>&#37;</span>} />      
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () =>{
    setGood(good + 1 )
  }

  const handleNeutralClick = () =>{
    setNeutral(neutral + 1)
  }

  const handleBadClick = () =>{
    setBad(bad + 1)
  }

  //const average = (arr) =>() => console.log('arr', arr);

  return (
    <div>
      <Header course={course.name='Give feedback'} />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Header course={course.name='Statictics'} />
      < Statistics
                good = {good}
                neutral = {neutral}
                bad={bad}
                all = {good + neutral + bad}
                average ={([bad, good, neutral]).reduce((a, b) => a + b, 0) / ([bad, good, neutral]).length}
                positive= {(( good ) / (bad + good + neutral)) * 100}
/>
    </div>
  )
}


export default App