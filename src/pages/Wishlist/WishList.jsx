import React, { useEffect, useState } from "react";
import axios from "axios";
import WishlistButton from "./WishListButton";
import "./Wishlist.css";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Fetch wishlist items from backend
  const fetchWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:8080/wish/wishlist/list");
      setWishlistItems(res.data.items || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  const handleAddToBag = async (item) => {
    try {
      // Add to bag/cart
      await axios.post("http://localhost:8080/cart/add", {
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
    } catch (error) {
      console.error("Error moving item to bag:", error);
    }
  };

  // Remove item from wishlist
  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/wishlist/${productId}`);
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="wishlist-container">
      <h2 className="wish-head">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map((item) => (
            <div key={item.productId} className="wishlist-item">
              <div className="wish-icon">
                <WishlistButton className="wish-icon" />
              </div>
              <img className="wish-img" src={item.image} alt={item.name} />
              <h3 className="wish-title">{item.name}</h3>
              <p className="wish-price">₹{item.price}</p>
              <button className="wish-move" onClick={handleAddToBag}>
                Move To Bag
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

// const fetchWishlist = async () => {

//   try {
//     const res = await axios.get(`http://localhost:8080/wishList/list`);
//     console.log('Fetched wishlist:', res.data.items);

//     setWishlist(res.data.items || []);

//   } catch (err) {
//     console.error('Error fetching wishlist:', err);
//   }
// };

// const removeItem = async (productId) => {
//   try {
//     await axios.delete(`http://localhost:8080/wishList/list`);
//     setWishlist(prev => prev.filter(item => item.productId !== productId));
//   } catch (err) {
//     console.error('Error in removing item:', err);
//   }
// }

// useEffect(() => {
//   fetchWishlist();
// }, []);

//   return (
//     <div className="wishlist-container">
//       <h1>Your Wishlist</h1>
//       <div className="wishlist-grid">
//       {Array.isArray(wishlistItems) && wishlistItems.length > 0 ? (
//             wishlistItems.map((item , index) => (
//               <div key={index} className="wishlist-item">
//                 <img src={item.images} alt={item.name} />
//                 <h3>{item.name}</h3>
//                 <p>${item.price}</p>
//               </div>
//             ))
//           ) : (
//             <p>No items in wishlist.</p>
//           )}
//       </div>
//     </div>
//   );
// };

// export default WishlistPage;

// const [wishlistItems, setWishlistItems] = useState([]);

//   // Fetch wishlist items from the backend
//   const fetchWishlist = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/wishlist/list');
//       setWishlistItems(response.data || []);

//       console.log(response.data)
//     } catch (error) {
//       console.error('Error fetching wishlist:', error);
//     }
//   };

//   // Remove item from wishlist
//   const removeItem = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:8080/wishlist/list/${productId}`);
//       setWishlistItems((prevItems) =>
//         prevItems.filter((item) => item.productId !== productId)
//       );
//     } catch (error) {
//       console.error('Error removing item:', error);
//     }
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, []);
