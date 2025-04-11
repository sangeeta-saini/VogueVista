import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'



function SearchBar() {
    const[input , setInput] = useState("")
  return (
    <div>
      <div className='search-container'>
        <FontAwesomeIcon  className='search-icon'icon={faMagnifyingGlass} /> 
            <input className=" search-box" type="text" placeholder='Search for products , brands and more '  value = {input}
            onChange={(e) =>setInput(e.target.value)} />
        </div>
    </div>
  )
}

export default SearchBar
