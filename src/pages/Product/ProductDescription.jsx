import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./product.css";
import AddToBagButton from "../Cart/AddToBagButton.jsx";
import WishlistButton from "../Wishlist/WishListButton.jsx";
import Rating from "./../../assets/rating.png";

const API_BASE_URL = import.meta.env.VITE_RAILWAY_API_URL;

function ProductDescription({ userId }) {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/products/${product_id}`
        );
        console.log("-----response", response);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [product_id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-container">
      {product.images && product.images.length > 0 && (
        <img
          className="product-image"
          src={product.images[0]}
          alt={product.name}
        />
      )}
      <div className="product-items">
        <h1 className="product-title">{product.name}</h1>
        <div className="product-description">{product.description}</div>
        <div className="product-rate">₹ {product.price.toFixed(2)}</div>
        <div className="product-rating-box">
          <div>
            <img className="rating-img" src={Rating} alt="" />
          </div>
          <div>{product.rating}</div>
        </div>
        <div className="product-rating">Brand {product.brand}</div>
        <div className="product-rating">Category {product.categories}</div>

        <div className="add-wish-btn">
          <div className="wishlist-btn">
            <div className="wish-icon-2">
              <WishlistButton userId={userId} product={product} />
            </div>

            <div className="wish-heading">WISHLIST</div>
          </div>
          <div className="bag-btn">
            <AddToBagButton
              userId={userId}
              product={product}
              customClass="add-btn"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
