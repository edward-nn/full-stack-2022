import Flag from "./Flag"

const City = (props) =>{
    console.log('propsCity', props)
    const city = props.city
    return ( 
        <div  className="City">
            {city.map(i => (
                <div>
                    <h1>{i.name}</h1>
                <div> <p><span>Capital: </span>{i.capital}</p>
                <p><span>Languages: </span>{i.languages.map(lang => lang.name).join(", ")}</p>
                </div>
                < Flag flag={i.flag} />
                </div>
                
            ))}
        </div>
    )
    
}

export default City