import React, { useState, useEffect } from "react";
import axios from "axios";

const WishlistButton = ({ userId, product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = async () => {
    try {
      const userId = localStorage.getItem("user_id");

      if (isWishlisted) {
        await axios.delete(`http://localhost:8080/wishlist/${product._id}`, {
          headers: {
            user_id: userId,
          },
        });
      } else {
        await axios.post(
          `http://localhost:8080/wishlist`,
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
        <img src="./assets/wishlist.svg" alt="" />
      ) : (
        <img src="./assets/wishlist.svg" alt="" />
      )}
    </div>
  );
};

export default WishlistButton;
