import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BeautySection.css";
import AddToBagButton from "../../pages/Cart/AddToBagButton.jsx";
import WishlistButton from "../../pages/Wishlist/WishListButton.jsx";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_RAILWAY_API_URL;

function BeautySection({ userId }) {
  const [BeautyItems, setBeauty] = useState([]);

  const navigate = useNavigate();

  const handleNavigate = (productId) => {
    navigate(`/product/${productId}`);
  };

  const fetchBeauty = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/products?category=beauty`);

      setBeauty(res.data.items || []);
    } catch (error) {
      console.log("Error fetching beauty products:", error);
    }
  };

  useEffect(() => {
    fetchBeauty();
  }, []);

  return (
    <section>
      <div className="beauty-container">
        <div className="parent">
          {Array.isArray(BeautyItems) &&
            BeautyItems.length > 0 &&
            BeautyItems.map((res, index) => (
              <div key={index} className="all-cards">
                <div className="wishlist-icon">
                  <WishlistButton userId={userId} product={res} />
                </div>

                <img
                  onClick={() => handleNavigate(res._id)}
                  src={res.images?.[0]}
                  className="card-img-top"
                  alt={res.name || "Product image"}
                />
                <div className="card-body">
                  <h5 className="card-title">{res.name}</h5>
                  <p className="description">{res.description}</p>
                  <p className="price-btn">₹{res.price.toFixed(2)}</p>
                  <div className="btns">
                    <AddToBagButton userId={userId} product={res} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default BeautySection;
