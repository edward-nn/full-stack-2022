import React, { useState } from 'react';
import axios from 'axios'
const API_KEY = process.env.REACT_APP_API_KEY


const processContact = data=> ({
  name: data.name,
  temp: Math.round(data.main.temp),
  wind: data.wind.speed,
  img:  "https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png", 
})


const Forecast = (props) => {
   const initialState = {
    name: '',
    temp: 'unknow',
    wind: 'unknow',
    img: '',
  }

  let [city, setCity]  =  useState(props.capital)
  
  let [unit, setUnit] = useState('metric');
  let [error, setError] = useState(false);
  
  const [data, setData] = useState(initialState);
  
  //console.log('dataSet', data)

  if (city.length === 0) {
    return setError(true);
}
const uriEncodedCity = encodeURIComponent(city).toLocaleLowerCase();

//console.log('uriEncodedCity', uriEncodedCity)

const URL = `http://api.openweathermap.org/data/2.5/weather?q=${uriEncodedCity}&appid=${API_KEY}&units=${unit}`;


/***
const updateData = (data) => {
  console.log('dataUpdate', data)
  return setData({ name: data.name, temp:data.temp, description: data.description, img: data.img })
}
 */

//console.log('responseObj', responseObj)

const eventHandler = response => {
  //console.log('promise fulfilled', response)
  const data = processContact(response.data)
  console.log('dataHandler', data)
  
  setData(data)
}


const promise = axios.get(URL)
promise.then(eventHandler)

//console.log('responseObjForecast2', responseObj)
//console.log('dataState', data)

  return (
      <div><h1>Weather in {city}</h1>
          <p>temperature - {data.temp} Celcius</p>
          <image src={data.img} />
          {console.log(data.img)}
          <p>wind {data.wind} m/s </p>
      </div>
  )
}

export default Forecast;