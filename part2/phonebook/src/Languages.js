import React, { useState } from 'react'


const Languages = (props) =>{
    //console.log('propsLang', props)
    const [item, SetItem] =  useState(props.languages)
    //console.log('itemLang', item)
    const keys = Object.keys(item)
    //console.log('keys.length', keys.length)
    let orderLanguages = [];

    if(keys.length === 1){
    for (const key in item) {
      
      //console.log(`${key}: ${item[key]}`);
      if (item.hasOwnProperty(key)) {
  
          console.log(`${key}: ${item[key]}`);
          //console.log(` ${item[key]}`);
          orderLanguages = item[key]
      }
      //console.log('orderLanguages', orderLanguages)
      return (
        <>
        {orderLanguages}
        </>
      )
  }
}

if(keys.length > 1){
  for (const key in item){
    if(item.hasOwnProperty(key)){
      orderLanguages = orderLanguages.concat(( <li>{item[key]}</li>))
    }
  }     
      
  }
return orderLanguages;    
    
  }
  


    


export default Languages