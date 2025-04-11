import React from 'react'
import './filter.css'
import { useState } from 'react';

import FilterContainer from './FilterContainer';

function FilterSection() {


  

  
    const [selectedCategories, setSelectedCategories] = useState([
      {
        display: "Women",
        value: "women",
        isSelected: false,
      },
      {
        display: "Men",
        value: "men",
        isSelected: false,
      },
      {
        display: "Kids",
        value: "kids",
        isSelected: false,
      },
      {
        display: "Beauty",
        value: "beauty",
        isSelected: false,
      }
    ]);
     const categories = ["Women" , "Men" , "Kids" , "Beauty"]
  
    const handleCategoryToggle = (e) => {
      const value = e.target.value;
    console.log(value)
      setSelectedCategories((prevCategories) =>
        prevCategories.map((category) => ({
          ...category,
          isSelected: category.value === value,
        }))
      );
    };
    
      const [selectedPrices, setSelectedPrices] = useState([
        {
          display: "200-400",
          value: "200-400",
          isSelected: false,
        },
        {
          display: "400-600",
          value: "400-600",
          isSelected: false,
        },
        {
          display: "600-800",
          value: "600-800",
          isSelected: false,
        },
        {
          display: "800-1000",
          value: "800-1000",
          isSelected: false,
        },

      ]);

      const price= [
        { id: 'p2', label: '200-400', value: '200-400' },
        { id: 'p4', label: '400-600', value: '400-600' },
        { id: 'p6', label: '600-800', value: '600-800' },
        { id: 'p8', label: '800-1000', value: '800-1000' },
      ];
      
    
      const handlePriceToggle = (e) => {
        const value = e.target.value;
      console.log(value)
        setSelectedPrices((prevPrices) =>
          prevPrices.map((price) => ({
            ...price,
            isSelected: price.value === value,
          }))
        );
      };

      
      const [selectedColors, setSelectedColors] = useState([
        {
          display: "Red",
          value: "red",
          isSelected: false,
        },
        {
          display: "Blue",
          value: "blue",
          isSelected: false,
        },
        {
          display: "Pink",
          value: "pink",
          isSelected: false,
        },
        {
          display: "Green",
          value: "green",
          isSelected: false,
        },
        {
          display: "Black",
          value: "black",
          isSelected: false,
        },
        {
          display: "White",
          value: "white",
          isSelected: false,
        },
        {
          display: "Gold",
          value: "gold",
          isSelected: false,
        },
        {
          display: "Gray",
          value: "gray",
          isSelected: false,
        },

      ]);
     

      const colors = ["Red" , "Blue" , "Pink" , "Green" , "Black" , "White" , "Gold" , "Grey"]
      

    const handleColorsToggle = (e) => {
      const value = e.target.value;
    console.log(value)
      setSelectedColors((prevColors) =>
        prevColors.map((color) => ({
          ...color,
          isSelected: color.value === value,
        }))
      );
    };


    const [selectedDiscount, setSelectedDiscount] = useState([
      {
        display: "20% and above",
        value: "20% and above",
        isSelected: false,
      },
      {
        display: "30% and above",
        value: "30% and above",
        isSelected: false,
      },
      {
        display: "40% and above",
        value: "40% and above",
        isSelected: false,
      },
      {
        display: "50% and above",
        value: "50% and above",
        isSelected: false,
      },
      {
        display: "60% and above",
        value: "60% and above",
        isSelected: false,
      },
      {
        display: "70% and above",
        value: "70% and above",
        isSelected: false,
      },
     
    ]);

   
      
    
    const handleDiscountToggle = (e) => {
      const value = e.target.value;
    console.log(value)
      setSelectedDiscount((prevDiscounts) =>
        prevDiscounts.map((discount) => ({
          ...discount,
          isSelected: discount.value === value,
        }))
      );
    };
      
    
    {categories.map((category) => (
      <div key={category}>
        <input
          type="radio"
          id={category}
          name="category"
          value={category}
          checked={selectedCategories === category}
          onChange={(e) => setSelectedCategories(e.target.value)}
        />
        <label htmlFor={category}>{category}</label>
      </div>
    ))}
    


    {price.map((prices) => (
      <div key={prices}>
    <input
  type="range"
  min="200"
  max="1000"
  value={selectedPrices[1]}
  onChange={(e) =>
    setSelectedPrices([selectedPrices[200], Number(e.target.value)])}
/>
<label htmlFor={prices}>{prices}</label>
</div>
))}

      

{colors.map((color) => (
  <div key={color}>
    <input
      type="checkbox"
      id={color}
      value={color}
      checked={selectedColors.includes(color)}
      onChange={(e) => {
        if (e.target.checked) {
          setSelectedColors([...selectedColors, color]);
        } else {
          setSelectedColors(selectedColors.filter((c) => c !== color));
        }
      }}
    />
    <label htmlFor={color}>{color}</label>
  </div>
))}


<select
  value={selectedDiscount}
  onChange={(e) => setSelectedDiscount(Number(e.target.value))}
>
  <option value={0}>All Discounts</option>
  <option value={20}>20% and above</option>
  <option value={30}>30% and above</option>
  <option value={40}>40% and above</option>
  <option value={50}>50% and above</option>
  <option value={60}>60% and above</option>
  <option value={70}>70% and above</option>
</select>



// const filteredProducts = products
//   .filter((value) =>
//     selectedCategories ? value.category === selectedCategories : true
//   )
//   .filter(
//     (value) =>
//       value.price >= selectedPrices[0] &&
//     value.price <= selectedPrices[1]
//   )
//   .filter((value) =>
//     selectedColors.length > 0 ? selectedColors.includes(value.color) : true
//   )
//   .filter((value) =>
//     selectedDiscount > 0 ? value.discount >= selectedDiscount : true
//   );


//   {filteredProducts.map((product) => (
//     <div key={product.id}>
//       <h3>{product.name}</h3>
//       <p>Price: ₹{product.price}</p>
//       <p>Color: {product.color}</p>
//       <p>Discount: {product.discount}%</p>
//     </div>
//   ))}
  
      
  return (
    <div>
      <div className='filter-container'>
        <div className='heading'>
       <h3>FILTERS</h3>
       <h3>CLEAR ALL</h3>
       </div>
     <FilterContainer items={selectedCategories} handleToggle={handleCategoryToggle}/>
     <FilterContainer items={selectedPrices} handleToggle={handlePriceToggle}/>
     <FilterContainer   items={selectedColors} handleToggle={handleColorsToggle}/>
     <FilterContainer  items={selectedDiscount} handleToggle={handleDiscountToggle}/>
    </div>
    </div>
    

  )
  }



export default FilterSection
