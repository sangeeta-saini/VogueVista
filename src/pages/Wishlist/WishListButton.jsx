import React, { useState, useEffect } from "react";
import axios from "axios";
import WishlistSVG from "./../../assets/wishlist.svg";

const API_BASE_URL = import.meta.env.VITE_RAILWAY_API_URL;

const WishlistButton = ({ userId, product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = async () => {
    try {
      const userId = localStorage.getItem("user_id");

      if (isWishlisted) {
        await axios.delete(`${API_BASE_URL}/wishlist/${product._id}`, {
          headers: {
            user_id: userId,
          },
        });
      } else {
        await axios.post(
          `${API_BASE_URL}/wishlist`,
          {
            product_id: product._id,
            user_id: userId,
          },
          {
            headers: {
              user_id: userId,
            },
          }
        );
      }
      setIsWishlisted(!isWishlisted);
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };

  return (
    <div
      className="wishlist-button"
      onClick={toggleWishlist}
      title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      {isWishlisted ? (
        <img src={WishlistSVG} alt=" wishlist-icon" />
      ) : (
        <img src={WishlistSVG} alt="wishlist-icon" />
      )}
    </div>
  );
};

export default WishlistButton;
