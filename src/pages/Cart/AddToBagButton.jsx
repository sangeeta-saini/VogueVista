import React from "react";
import axios from "axios";

const AddToBagButton = ({ userId, product }) => {
  const handleAddToBag = async () => {
    console.log("product:", product);
    // if (!product || !product.productId) {
    //   console.error('Invalid product:', product);
    //   return;
    // }

    try {
      const userId = localStorage.getItem("user_id");

      await axios.post(
        `http://localhost:8080/cart/`,
        {
          Id: product.Id,
          title: product.title,
          price: product.price,
          image: product.images,
          quantity: 1,
        },
        {
          headers: {
            user_id: userId,
          },
        }
      );
      alert(`${product.name} added to bag!`);
    } catch (err) {
      console.error("Error adding to bag:", err);
    }
  };

  return (
    <button onClick={handleAddToBag} className="wish-move">
      Add to Bag
    </button>
  );
};

export default AddToBagButton;
