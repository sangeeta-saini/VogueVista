
import './Cart.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BagPage = ({ userId }) => {
  const [bagItems, setBagItems] = useState([]);
  const [loading, setLoading]   = useState(true);

  
  const fetchBag = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/cart/${userId}`);
      setBagItems(res.data.items || []);
    } catch (err) {
      console.error('Error fetching bag:', err);
    } finally {
      setLoading(false);
    }
  };

  
  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/cart/${userId}/${productId}`);
      setBagItems(prev => prev.filter(item => item.productId !== productId));
    } catch (err) {
      console.error('Error removing from bag:', err);
    }
  };

  
  const updateQty = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      await axios.put(`http://localhost:8080/cart/${userId}/${productId}`, { quantity: newQty });
      setBagItems(prev =>
        prev.map(item =>
          item.productId === productId ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  useEffect(() => {
    fetchBag();
  }, [userId]);

  if (loading) return <div >Loading your bag…</div>;

  // Cart total
  const total = bagItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div  className='cart-container'>
      <h1 >Your Bag</h1>

      {bagItems.length === 0 ? (
        <p >Your bag is empty.</p>
      ) : (
        <>
          <div >
            {bagItems.map(item => (
              <div
                key={item.productId}
                
              >
                <img
                  src={item.image}
                  alt={item.name}
                  
                />
                <div >
                  <h2 >{item.name}</h2>
                  <p >₹{item.price.toFixed(2)}</p>
                  <div >
                    <button
                      onClick={() => updateQty(item.productId, item.quantity - 1)}
                      
                    >−</button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.productId, item.quantity + 1)}
                      
                    >+</button>
                  </div>
                </div>
                <div >
                  <p >
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.productId)}
                    
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

         
          <div >
            <p >
              Total: <span >${total.toFixed(2)}</span>
            </p>
            <button
              onClick={() => alert('Proceeding to checkout…')}
              
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BagPage;
