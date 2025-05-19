import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_RAILWAY_API_URL;

const AddToBagButton = ({ userId, product, customClass = " " }) => {
  const navigate = useNavigate();

  const notify = () => toast("Product is added to Bag");
  const showSignUpToast = () => toast.error("Please sign up first");

  const handleAddToBag = async () => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      showSignUpToast();

      // Wait a moment for the toast to show, then redirect
      setTimeout(() => {
        navigate("/signup");
      }, 2000); // 2 seconds delay
      return;
    }

    try {
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
