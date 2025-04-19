import React from 'react'
import './filter.css'
import { useState } from 'react';

import FilterContainer from './FilterContainer';

function FilterSection() {

  const products = [{
    
  }]

const filter = [

  {
    id: "category",
    name: "Category",
    options: [
      { value: "women", label: "Women" },
      { value: "men", label: "Men" },
      { value: "kids", label: "Kids" },
      { value: "beauty", label: "Beauty" },
    ],
  },

  {
    id: "price",
    name: "Price",
    options: [
      { value: "200-400", label: "200-400" },
      { value: "400-600", label: "400-600" },
      { value: "600-800", label: "600-800" },
      { value: "800-1000", label: "800-1000" },
      
    ],
  },

  {
    id: "color",
    name: "Color",
    options: [
      { value: "red", label: "Red" },
      { value: "blue", label: "Blue" },
      { value: "pink", label: "Pink" },
      { value: "green", label: "Green" },
      { value: "black", label: "Black" },
      { value: "white", label: "White" },
      { value: "gold", label: "Gold" },
      { value: "grey", label: "Grey" },
    ],
  },
  
  {
    id: "discount",
    name: "Discounts",
    options: [
      { value: "20% and above", label: "20% and above" },
      { value: "30% and above", label: "30% and above" },
      { value: "40% and above", label: "40% and above" },
      { value: "50% and above", label: "50% and above" },
      { value: "60% and above", label: "60% and above" },
      { value: "70% and above", label: "70% and above" },
    ],
  },
];

  
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
