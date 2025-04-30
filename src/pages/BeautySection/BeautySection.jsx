import React, { useState, useEffect } from 'react'
import axios from 'axios';
function BeautySection() {

const[BeautyItems , setBeauty] = useState([]);


const fetchBeauty = async () =>{
  try {
    const res = await axios.post("http://localhost:8080/grate/migrate");
    setBeauty(res.data.items || []);
  } catch (error) {
    console.log('Error fetching wishlist:', error);
  }
};

useEffect(() => {
  fetchBeauty();
}, []);

  return (
    <div className="beauty-container">

        <div className="beauty-items">
          {BeautyItems.map((item) => (
            <div key={item.productId} className="beauty-item">
              
              <img className="beauty-img" src={item.image} alt={item.name} />
              <h3 className='beauty-title'>{item.name}</h3>
              <p className='beauty-price'>₹{item.price}</p>
              
            </div>
          ))}
        </div>
      
    </div>
  );
}

export default BeautySection
