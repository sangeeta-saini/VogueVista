import React from 'react'
import { useEffect, useState } from 'react'
// import cart from './pages/cart.jsx'

import axios from "axios";
import './ProductCard.css'

function ProductCard({onAddToBag, loading}) {

  
  const [data ,setData ] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://dummyjson.com/products/categories")
      
      setData(response.data.products);
      console.log(response.data);
    }

fetchData();
  }, []);
  
  
  


  let show = data.map((res ,index)=> (
    <div 
    key={index}
    className='all-cards'>
      <button className='wishlist-icon' onClick={toggleWishlist}>
<svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.10892 9.71235C4.21728 13.1607 8.59615 15.949 9.75985 16.6392C10.9275 15.9419 15.338 13.1228 16.4108 9.71551C17.1152 7.51303 16.4614 4.72317 13.8636 3.88598C12.605 3.482 11.137 3.72787 10.1235 4.51209C9.91163 4.67495 9.61755 4.67811 9.4041 4.51684C8.33053 3.70968 6.92809 3.47331 5.64976 3.88598C3.05596 4.72238 2.40454 7.51224 3.10892 9.71235ZM9.76027 17.9167C9.66225 17.9167 9.56501 17.893 9.47647 17.8447C9.22902 17.7095 3.40027 14.4967 1.97965 10.0744C1.97886 10.0744 1.97886 10.0736 1.97886 10.0736C1.08712 7.28926 2.08005 3.79028 5.28574 2.75702C6.79096 2.27004 8.43135 2.48428 9.7579 3.32148C11.0433 2.50879 12.7509 2.28427 14.2261 2.75702C17.435 3.79186 18.4311 7.29005 17.5401 10.0736C16.1653 14.4453 10.2939 17.7064 10.0449 17.8431C9.95633 17.8922 9.8583 17.9167 9.76027 17.9167Z" fill="#211A1E"/>
</svg>

</button>
<img src={res.images[0]} className="card-img-top" alt="..." />
      <div className="card-body">
      
        <h5 className="card-title" >
          { res.title}
        </h5>
        <p className="description" >
          {res.description}
        </p>
        <div className='btns'>
        <a href="#" className="price-btn" >
           ₹{res.price}
        </a >
        <div >
        <button
        onClick={() => onAddToBag(res._id)}
        disabled={loading}
        className="add-bag-btn"
      >
        {loading ? 'Adding...' : 'Add to Bag'}
      </button>
        </div>
        </div>
      </div>
    </div>
  ));
  
  return (
    <>
    
     <div className="parent">{show}</div>;
    </>
  )
}




export default ProductCard
