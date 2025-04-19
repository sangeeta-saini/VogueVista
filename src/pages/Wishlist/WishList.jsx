import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Wishlist.css'

const WishlistPage = ({ userId }) => {
  const [wishlist, setWishlist] = useState([]);
  

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/wishlist/${userId}`);
      setWishlist(res.data.items || []);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    } 
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/wishlist/${userId}/${productId}`);
      setWishlist(prev => prev.filter(item => item.productId !== productId));
    } catch (err) {
      console.error('Error in removing item:', err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [userId]);

 

  return (
    <div  className='wishlist-container'>
      <h2 >Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p >Your wishlist is empty.</p>
      ) : (
        <div >
          {wishlist.map(item => (
            <div key={item.productId} >
             <img src={item.images[0]} className="card-img-top" alt="..." />
              <h3 >{ item.title}</h3>
              <p >₹{item.price}</p>
              <button onClick={() => removeItem(item.productId)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
