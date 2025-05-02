import React from "react";
import { useEffect, useState } from "react";
// import cart from './pages/cart.jsx'

import axios from "axios";
import "./ProductCard.css";

function ProductCard({ onAddToBag, loading }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://dummyjson.com/products/categories"
      );

      setData(response.data.products);
      console.log(response.data);
    }

    fetchData();
  }, []);

  let show = data.map((res, index) => (
    <div key={index} className="all-cards">
      <button className="wishlist-icon" onClick={toggleWishlist}>
        <img src="./assets/wishlist.svg" alt="" />
      </button>
      <img src={res.images[0]} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{res.title}</h5>
        <p className="description">{res.description}</p>
        <div className="btns">
          <a href="#" className="price-btn">
            ₹{res.price}
          </a>
          <div>
            <button
              onClick={() => onAddToBag(res._id)}
              disabled={loading}
              className="add-bag-btn"
            >
              {loading ? "Adding..." : "Add to Bag"}
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="parent">{show}</div>;
    </>
  );
}

export default ProductCard;
