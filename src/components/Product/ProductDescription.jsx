import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./product.css";
import AddToBagButton from "../../pages/Cart/AddToBagButton.jsx";
import WishlistButton from "../../pages/Wishlist/WishListButton.jsx";

function ProductDescription({ userId }) {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/${product_id}`
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
        <div className="product-rate">Rating: {product.rating}</div>
        <div className="product-rate">Brand: {product.brand}</div>
        <div className="product-rate">Category: {product.categories}</div>
        <div className="product-rate">Stock: {product.stock}</div>
        <div className="wishlist-icon">
          <WishlistButton userId={userId} product={product} />
        </div>
        <div className="btns">
          <AddToBagButton userId={userId} product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
