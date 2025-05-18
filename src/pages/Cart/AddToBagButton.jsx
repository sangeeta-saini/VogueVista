import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_RAILWAY_API_URL;

const AddToBagButton = ({ userId, product, customClass = " " }) => {
  const notify = () => toast("Product is added to Bag");

  const handleAddToBag = async () => {
    console.log("product:", product);

    try {
      const userId = localStorage.getItem("user_id");

      await axios.post(
        `${API_BASE_URL}/cart/`,
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
      <button onClick={handleAddToBag} className={`add-bag ${customClass}`}>
        Add To Bag
      </button>
    </>
  );
};

export default AddToBagButton;
