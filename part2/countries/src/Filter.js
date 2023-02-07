import React, { useState } from 'react'

const Filter=(props)=>{
  //console.log('propsFilter', props)
    const [search, setSearch] = useState("");
    const handleSearchChange= props.handleSearchChange;
    const handleChange = (e) => {
            setSearch(e.target.value);
    };

    handleSearchChange(search);    
  
        return (
          <input
              placeholder="Search by name..."
              type="text"
              name="name"   
              value={search}
              onChange={handleChange}
            />
          )
  };
  

export default Filter