import React from "react";
import { useContext } from "react";

import FilterSection from "../Filters/FilterSection.jsx";

import { DataContext } from "../DataContext.jsx";
import "./products.css";
import AddToBagButton from "../../pages/Cart/AddToBagButton.jsx";
import WishlistButton from "../../pages/Wishlist/WishListButton.jsx";

const Products = ({ userId, product }) => {
  const { data, loading, error, fetchData } = useContext(DataContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="products-Container">
        <FilterSection fetchData={fetchData} />

        <section>
          <div className="parent">
            {Array.isArray(data) ? (
              data.map((res, index) => (
                <div key={index} className="all-cards">
                  <div className="wishlist-icon">
                    <WishlistButton userId={userId} product={res} />
                  </div>
                  <img src={res.images[0]} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{res.title}</h5>
                    <p className="description">{res.description}</p>
                    <div className="btns">
                      <a href="#" className="price-btn">
                        ₹{res.price}
                      </a>
                      <div>
                        <AddToBagButton userId={userId} product={res} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;
