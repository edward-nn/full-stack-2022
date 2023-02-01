import '../App.css';

const Total = (props) => {
  console.log("propsTotal", props);
  const result = props.result.map(value => value.exercises)
  console.log("result", result)
  const total = result.reduce((a, b) => a + b, 0)
  console.log("total", total)
    return(
      <p className="App-header">Total of exersises {total}</p>
    )
  }

  export default Total;