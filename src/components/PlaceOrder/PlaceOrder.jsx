import { useState, useEffect } from "react";
import axios from "axios";
import "./PlaceOrder.css";
import { useNavigate } from "react-router-dom";

const PlaceOrderPage = () => {
  const [bagItems, setBagItems] = useState([]);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchBag();
    fetchAddress();
  }, []);

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter your address.");
      return;
    }

    const orderData = {
      items: cartItems,
      shippingAddress: address,
      paymentMethod,
    };

    try {
      await axios.post("http://localhost:8080/orders/place", orderData);
      await axios.delete("http://localhost:8080/place/"); // Optional: Clear cart after order
      setOrderPlaced(true);
      setTimeout(() => navigate("/order-success"), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  if (orderPlaced) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl text-green-600 font-bold">
          Order placed successfully!
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="place-container">
        <h2 className="place-head">View Details</h2>

        {/* Address Section */}
        <div className="place-address-box">
          {address && (
            <div className="address-display">
              <p className="price">Shipping To:</p>
              <div className="address-box">
                <div className="saved-add">
                  <div className="address-name">{address.name}</div>
                  <div className="address-type">{address.typeOfAddress}</div>
                </div>
                <div className="address-detail">
                  {address.address}, {address.street} <br />
                  {address.city} - {address.pincode}
                  <br />
                  {address.state}
                  <br />
                  Mobile: {address.mobile}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Payment Method</label>
          <select
            className="w-full border p-2"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Credit Card</option>
          </select>
        </div>

        {/* Cart Items */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Items in Your Bag:</h3>
          {!Array.isArray(bagItems) || bagItems.length === 0 ? (
            <p>Your bag is empty.</p>
          ) : (
            <div className="cart-items">
              {bagItems.map((res, index) => (
                <div key={index} className="cart-item">
                  {/* <img
                    className="cart-img"
                    src={res.images[0]}
                    alt={res.name}
                  /> */}
                  <div>
                    {/* <h2 className="cart-name">{res.name}</h2>
                    <h2 className="cart-description">{res.description}</h2> */}
                    <p className="cart-price">₹{res.price.toFixed(2)}</p>
                    {/* <QuantityInput
                      quantity={res.quantity}
                      onChange={(newQty) => updateQty(res._id, newQty)}
                    /> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Place Order
        </button>
      </div>
    </>
  );
};

export default PlaceOrderPage;
