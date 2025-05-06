import "./Cart.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import QuantityInput from "./QuantityInput";
import { useNavigate } from "react-router-dom";

const BagPage = () => {
  const [bagItems, setBagItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const fetchBag = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const res = await axios.get("http://localhost:8080/cart/", {
        headers: { user_id: userId },
      });
      setBagItems(res.data.items || []);
    } catch (err) {
      console.error("Error fetching bag:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddress = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const res = await axios.get(`http://localhost:8080/address/${userId}`);
      if (res.data.length > 0) {
        setAddress(res.data[0]); // assuming first address is default
      }
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };

  const updateQty = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      const userId = localStorage.getItem("user_id");
      await axios.put(
        `http://localhost:8080/cart/${productId}`,
        { quantity: newQty },
        {
          headers: { user_id: userId },
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
    fetchAddress();
  }, []);

  const handlePlaceOrder = async () => {
    const userId = localStorage.getItem("user_id");

    if (!userId || !address || !address.address?.trim()) {
      alert("Missing user or address info");
      return;
    }

    const shippingAddressString = `${address.name}, ${address.typeOfAddress}, ${address.address}, ${address.street}, ${address.city} - ${address.pincode}, ${address.state}, Mobile: ${address.mobile}`;

    try {
      const orderPayload = {
        items: bagItems.map((item) => ({
          productId: item.productId || item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: shippingAddressString,
        paymentMethod,
      };

      await axios.post("http://localhost:8080/place/", orderPayload, {
        headers: { user_id: userId },
      });

      setShowPopup(true);
      setOrderPlaced(true);
      // Optionally clear bag: setBagItems([]);
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order.");
    }
  };

  if (loading) return <div>Loading your bag…</div>;

  const total = bagItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-head">Your Bag</h1>

      {bagItems.length === 0 ? (
        <p>Your bag is empty.</p>
      ) : (
        <div className="cart-section">
          <div className="cart-items">
            {bagItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  className="cart-img"
                  src={item.images[0]}
                  alt={item.name}
                />
                <div>
                  <h2 className="cart-name">{item.name}</h2>
                  <h2 className="cart-description">{item.description}</h2>
                  <p className="cart-price">₹{item.price.toFixed(2)}</p>

                  <QuantityInput
                    quantity={item.quantity}
                    onChange={(newQty) => updateQty(item._id, newQty)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="payment">
            {address && (
              <div className="address-display">
                <p className="price">Shipping To:</p>
                <div className="address-box">
                  <div className="saved-add">
                    <div className="address-name">{address.name}</div>
                    <div className="address-type">{address.typeOfAddress}</div>
                  </div>
                  <div className="address-detail">
                    {address.address}, {address.street}
                    <br />
                    {address.city} - {address.pincode}
                    <br />
                    {address.state}
                    <br />
                    Mobile: {address.mobile}
                  </div>
                </div>
              </div>
            )}

            <div className="payment-container">
              <label className="payment-head">Payment Method:</label>
              <select
                className="payment-mode"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option>Cash on Delivery</option>
                <option>UPI</option>
                <option>Credit Card</option>
              </select>
            </div>

            <p className="price">Price Details</p>

            <div className="cart-total">
              <div className="cart-mrp">
                Total MRP <span className="rate"> ₹{total.toFixed(1)}</span>
              </div>
              <div className="tax">Inclusive Of All Taxes</div>
            </div>

            <button className="procced-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}

      {/* ✅ Success Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase.</p>
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BagPage;
