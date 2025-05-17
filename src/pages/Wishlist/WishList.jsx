import React, { useEffect, useState } from "react";
import axios from "axios";
import WishlistButton from "./WishListButton";
import "./Wishlist.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Fetch wishlist items from backend
  const fetchWishlist = async () => {
    try {
      const userId = localStorage.getItem("user_id");

      const res = await axios.get(`${API_BASE_URL}/wishlist/`, {
        headers: {
          user_id: userId,
        },
      });
      setWishlistItems(res.data.items || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  const handleAddToBag = async (item) => {
    try {
      // Add to bag/cart
      const userId = localStorage.getItem("user_id");

      await axios.post(
        `${API_BASE_URL}/cart`,
        {
          productId: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
        },
        {
          headers: {
            user_id: userId,
          },
        }
      );
    } catch (error) {
      console.error("Error moving item to bag:", error);
    }
  };

  // Remove item from wishlist
  const removeItem = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/wishlist/${productId}`);
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="wishlist-container">
      <h2 className="wish-head">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map((item) => (
            <div key={item.productId} className="wishlist-item">
              <div className="wish-icon">
                <WishlistButton className="wish-icon" />
              </div>
              <img
                className="wish-img"
                src={item.images && item.images[0]}
                alt={item.name}
              />
              <h3 className="wish-title">{item.name}</h3>
              <p className="wish-price">₹{item.price.toFixed(2)}</p>
              <button className="add-bag" onClick={() => handleAddToBag(item)}>
                Move To Bag
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
