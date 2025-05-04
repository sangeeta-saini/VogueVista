import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddToBagButton = ({ userId, product }) => {
  const notify = () => toast("Product is added to Bag");

  const handleAddToBag = async () => {
    console.log("product:", product);

    try {
      const userId = localStorage.getItem("user_id");

      await axios.post(
        `http://localhost:8080/cart/`,
        {
          productId: product._id,
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
      notify();
    } catch (err) {
      console.error("Error adding to bag:", err);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" type="success" theme="dark" />
      <button onClick={handleAddToBag} className="add-bag">
        Add To Bag
      </button>
    </>
  );
};

export default AddToBagButton;
