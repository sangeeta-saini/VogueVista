import React from 'react'
import './filter.css'

function FilterContainer({items,handleToggle}) {

  

  return (
    
      <div className='main-box'>
      <h3 className='box-1'>Category</h3>
      <div className='box-1-data'>
        {items.map((item) => (
          <div key={item.value}>
            <input
              type="radio"
              id={item.value}
              name={item.value}
              value={item.value}
              checked={item.isSelected}
              onChange={handleToggle}
            />
            <label htmlFor={item.value}>{item.display}</label>
          </div>
        )) }
        
      </div>
    </div>
  
    
  )
}

export default FilterContainer
