import React from "react";
import "./Banner.css";

function Banner() {
  return (
    <div>
      <div className="banner-container">
        <a href="/products">
          <img
            className="banner-img"
            src="https://cdn-eu.dynamicyield.com/api/9879321/images/6848a2db045f.jpg?dpr=2"
            alt="Banner-img"
          />
        </a>
      </div>
    </div>
  );
}

export default Banner;
