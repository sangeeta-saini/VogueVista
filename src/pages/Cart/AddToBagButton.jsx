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
      await axios.post(`http://localhost:8080/bag/cart/:userId`, {
        Id: product.Id,
        title: product.title,
        price: product.price,
        image: product.images,
        quantity: 1,
      });
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
