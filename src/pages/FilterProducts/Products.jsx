import React from "react";
import { useContext } from "react";

import FilterSection from "../../components/Filters/FilterSection.jsx";

import { DataContext } from "../../components/DataContext.jsx";
import "./products.css";
import AddToBagButton from "../../pages/Cart/AddToBagButton.jsx";
import WishlistButton from "../../pages/Wishlist/WishListButton.jsx";
import { useNavigate } from "react-router-dom";

const Products = ({ userId, product }) => {
  const navigate = useNavigate();

  const handleNavigate = (productId) => {
    navigate(`/product/${productId}`);
  };
  const { data, loading, error, fetchData } = useContext(DataContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="products-Container">
        <FilterSection fetchData={fetchData} />

        <section className="card-box">
          <div className="parent">
            {Array.isArray(data) ? (
              data.length > 0 ? (
                data.map((res, index) => (
                  <div key={index} className="all-cards">
                    <div className="wishlist-icon">
                      <WishlistButton userId={userId} product={res} />
                    </div>

                    <img
                      onClick={() => handleNavigate(res._id)}
                      src={res.images[0]}
                      className="card-img-top"
                      alt="..."
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
                ))
              ) : (
                <div className="nodata-img">
                  <img
                    className="no-data"
                    src="./assets/nodata.png"
                    alt="No Data Found"
                  />
                </div>
              )
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
