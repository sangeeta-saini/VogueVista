import "./Cart.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import QuantityInput from "./QuantityInput";
const BagPage = () => {
  const [bagItems, setBagItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist items from backend
  const fetchBag = async () => {
    try {
      const userId = localStorage.getItem("user_id");

      const res = await axios.get("http://localhost:8080/cart/", {
        headers: {
          user_id: userId,
        },
      });
      setBagItems(res.data.items || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false); // ✅ This is missing
    }
  };

  const updateQty = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      const userId = localStorage.getItem("user_id");

      await axios.put(
        `http://localhost:8080/cart/${productId}`,
        {
          quantity: newQty,
        },
        {
          headers: {
            user_id: userId,
          },
        }
      );
      setBagItems((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  useEffect(() => {
    fetchBag();
  }, []);

  if (loading) return <div>Loading your bag…</div>;

  // Cart total
  const total = bagItems.reduce(
    (sum, res) => sum + res.price * res.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-head">Your Bag</h1>

      {bagItems.length === 0 ? (
        <p>Your bag is empty.</p>
      ) : (
        <>
          <div className="cart-section">
            <div className="cart-items">
              {bagItems.map((res) => (
                <div key={res.productId} className="cart-item">
                  <img className="cart-img" src={res.images[0]} />
                  <div>
                    <h2 className="cart-name">{res.name}</h2>
                    <p className="cart-price">₹{res.price.toFixed(2)}</p>

                    <QuantityInput
                      quantity={res.quantity}
                      onChange={(newQty) => updateQty(res._id, newQty)}
                    />

                    {/* <div className="quentity-btn">
                      <button
                        onClick={() =>
                          updateQty(res.productId, res.quantity - 1)
                        }
                        className="cart-minus"
                      >
                        −
                      </button>
                      <span>{res.quantity}</span>
                      <button
                        onClick={() =>
                          updateQty(res.productId, res.quantity + 1)
                        }
                        className="cart-plus"
                      >
                        +
                      </button>
                    </div> */}
                  </div>
                  {/* <div>
                    <p>₹{(res.price * res.quantity).toFixed(2)}</p>
                  </div> */}
                </div>
              ))}
            </div>

            <div className="payment">
              <p className="price">Price Details</p>

              <div className="cart-total">
                <div className="cart-mrp">
                  Total MRP <span className="rate"> ₹{total.toFixed(1)}</span>
                </div>
                <div className="tax">Inclusive Of All Taxes</div>
              </div>

              <button
                className="procced-btn"
                onClick={() => alert("Proceeding to checkout…")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BagPage;

// const [bagItems, setBagItems] = useState([]);
// ;

// const fetchBag = async () => {
//   try {
//     const res = await axios.get(`http://localhost:8080/bag/cart`);
//     setBagItems(res.data.items || []);
//   } catch (err) {
//     console.error('Error fetching bag:', err);
//   } finally {
//     setLoading(false);
//   }
// };

// useEffect(() => {
//   fetchBag();
// }, []);
