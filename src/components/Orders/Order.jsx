import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const response = await axios.get("http://localhost:8080/order", {
        headers: { user_id: userId },
      });
      console.log("Orders response:", response.data);
      setOrders(response.data.orders || []);
      setError("");
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Could not load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="orders-container">
      <h2 className="orders-head">Your Orders</h2>
      <div className="orders-container-2">
        {orders.map((order) => (
          <div key={order._id}>
            <div className="order-details">
              <h3 className="order-id">
                <strong>Order ID:</strong> {order._id}
              </h3>
              <div className="order-id">
                <strong>Status:</strong> {order.status}
              </div>
              <div className="order-id">
                <strong>Payment:</strong> {order.paymentMethod}
              </div>
              <div className="order-id">
                <strong>Order Date:</strong>{" "}
                {new Date(order.orderDate).toLocaleDateString()}
              </div>
              <div>
                <div className="order-id">
                  <strong> Shipping To:</strong> {order.shippingAddress}
                </div>
              </div>
            </div>
            <h4 className="order-item-head">Items:</h4>
            <div className="order-item-box-1">
              <div className="order-item-box">
                {Array.isArray(order.items) ? (
                  order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <div key={index} className="all-orders">
                        <img
                          className="order-img"
                          src={item.images && item.images[0]}
                          alt={item.name}
                        />
                        <div>
                          <div>
                            <strong className="order-name">{item.name}</strong>
                          </div>
                          <div className="order-price">₹{item.price}</div>
                          <div className="order-quentity">
                            {" "}
                            Quentity:{item.quantity}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No items in this order.</div>
                  )
                ) : (
                  <div>Invalid items data.</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
