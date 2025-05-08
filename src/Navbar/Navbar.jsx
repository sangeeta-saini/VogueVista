import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import SearchBar from "./SearchBar.jsx";
import WishlistSVG from "./../assets/wishlist.svg";
import Logo from "./../assets/Logo.png";
import CartSVG from "./../assets/cart.svg";
import ProfileSVG from "./../assets/profile.svg";

function Navbar() {
  useEffect(() => {
    console.log("------ navbar");
  }, []);

  return (
    <nav className="nav-container">
      <div className="nav">
        <div className="nav-logo">
          <a href="/">
            <img className="logo" src={Logo} alt="logo" />
          </a>
        </div>
        <div className="list">
          <ul className="list-items">
            <li>
              <a href="/beautysection">BEAUTY</a>
            </li>
          </ul>
        </div>
        <SearchBar />
        <div className="container-2">
          <div>
            <div className="sign-up">
              <a href="signup">Signup</a>
            </div>
          </div>
          <div className="user">
            <a href="/profile">
              {" "}
              <img src={ProfileSVG} alt="" />
            </a>
          </div>
          <div className="list-icon">
            <a href="/wishlist">
              <img src={WishlistSVG} alt="wishlisticon" />
            </a>
          </div>
          <div className="bag">
            <a href="/cart">
              <img src={CartSVG} alt="" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
