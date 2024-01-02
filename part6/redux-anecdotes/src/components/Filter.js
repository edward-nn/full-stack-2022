import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
      // input-field value is in variable event.target.value
      event.preventDefault()
      const content = event.target.value
      console.log('content', content)
      //event.target.value = ''
      dispatch(filterChange(content))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
       <h2>filter</h2> <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter
  