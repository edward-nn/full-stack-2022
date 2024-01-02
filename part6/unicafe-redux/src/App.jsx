import counterReducer from './reducers/counterReducer'
import { useSelector, useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()
  const good = () => {
    dispatch({
      type: 'GOOD'
    })
  }
  const ok = () =>{
    dispatch({
      type: 'OK'
    })
  }
  const bad = () =>{
    dispatch({
      type: 'BAD'
    })
  }
  const zero = () =>{
    dispatch({
      type: 'ZERO'
    })
  }

  //const numbers = useSelector(state => state.filter(note => note.good))
  const number = useSelector(state => state)
  console.log('goodNumber', number)
  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
  <div>good {number.good}</div>
  <div>ok {number.ok}</div>
      <div>bad {number.bad}</div>    
    </div>
  )
}

export default App