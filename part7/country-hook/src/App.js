import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [error, setError] = useState(null);

  console.log('error', error)

  let url = `https://studies.cs.helsinki.fi/restcountries/api/${
    name ? `name/${name}` : `all` 
  }`;

  
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
                setCountry(response.data)
              })
      .catch(error => {
        setError(error.message);
      });
  }, [url]);
  
  return country
}

const Country = ({ country }) => {
  
  if (!country || !country.name) {
    return (
      <div>
        <p>Country not found...</p>
      </div>
    );
  }

  const {
    name: { common },
    capital,
    population,
    flags,
  } = country;

  const flagImage = flags ? flags.png : null;

  return (
    <div>
      <h3>{common || 'Common name not available'} </h3>
      <div>capital {capital ? capital[0] : 'Capital not available'} </div>
      <div>population {population || 'Population not available'}</div>
      {flagImage ? (
        <img src={flagImage} height="50" alt={`flag of ${common}`} />
      ) : (
        <p>Flag image not available</p>
      )}
    </div>
  );
};



const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const [error, setError] = useState(null);
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
        setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      {country ? (
      <Country country={country} />
    ) : (
      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <p>Enter a country name and click 'find' to get information.</p>
        )}
      </div>
    )}
    </div>
  )
}

export default App
