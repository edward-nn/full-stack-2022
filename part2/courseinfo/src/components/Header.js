import '../App.css';

const Header = (props) => {  
//console.log(props) 
 const { course } = props
return (
<p className="App-header">
        {course}
</p> 
)
}

export default Header