import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/orderdetails/orders");
      setOrders([{ items: res.data.items }]);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Could not load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-4">Loading orders...</div>;
  }

  return (
    <div className="orders-container">
      <h1 className="orders-head">My Orders</h1>

      {error && <p>{error}</p>}

      {orders.length === 0 && !error ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="orders-container-2">
            <div className="orders-container-3">
              <h2 className="order-date">
                Order placed on {new Date(order.createdAt).toLocaleDateString()}
              </h2>
              <span
                className={`order-status ${
                  order.deliveryStatus === "Delivered"
                    ? "text-green-600"
                    : order.deliveryStatus === "Shipped"
                    ? "text-blue-600"
                    : order.deliveryStatus === "Cancelled"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {order.deliveryStatus}
              </span>
            </div>

            {Array.isArray(order.items) &&
              order.items.map((items) => (
                <div key={items.productId} className="order-items">
                  <img
                    src={items.image}
                    alt={items.name}
                    className="order-img"
                  />
                  <div>
                    <h3 className="order-name">{items.name}</h3>
                    <p className="order-description">{items.description}</p>
                    <p className="order-quentity">Quantity: {items.quantity}</p>
                    <p className="order-price">₹{items.price}</p>
                  </div>
                </div>
              ))}
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;

// useEffect(() => {
//   const fetchOrders = async () => {
//     try {
//       const res = await fetch("http://localhost:8080/orders", {
//         credentials: "include",
//       });

//       if (!res.ok) {
//         throw new Error("Failed to fetch orders");
//       }

//       const data = await res.json();
//       setOrders(data);
//     } catch (err) {
//       console.error(err);
//       setError("Could not load orders. Please try again later.");
//     }
//   };
