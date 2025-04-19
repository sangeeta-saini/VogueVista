import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './product.css'


function ProductDescription() {
  

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/4');
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className='product-container'>
      <img className='product-image' src={product.images[0]}  />
      <div className='product-description'>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p className='rating'>Rating: {product.rating}</p>
      <p className='price'><strong>₹ {product.price}</strong></p>
      <p className='brand'>Brand: {product.brand}</p>
     
      <p className='cat'>Category: {product.category}</p>
      <p className='stock'>Stock: {product.stock}</p>
     
      <p className='return'>Return: {product.returnPolicy}</p>
      </div>
    </div>

  );
}

export default ProductDescription
