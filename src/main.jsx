import { StrictMode } from "react";
import "./main.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./components/DataContext.jsx";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./Navbar/Navbar.jsx";

import Profile from "./pages/Profile/Profile.jsx";
import Orders from "./components/Orders/Orders.jsx";
import ProductDescription from "./components/Product/ProductDescription.jsx";

import BeautySection from "./pages/BeautySection/BeautySection.jsx";

import WishList from "./pages/Wishlist/WishList.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Signup from "./pages/Login/Signup.jsx";
import Login from "./pages/Login/Login.jsx";
import Products from "./components/FilterProducts/Products.jsx";

import Address from "./components/Address/Address.jsx";
import Banner from "./components/Banner/Banner.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DataProvider>
        {/* <WishlistProvider> */}
        <Navbar></Navbar>
        <div className="routes">
          <Routes>
            <Route path="/orders" element={<Orders />}></Route>
            <Route
              path="/product/:product_id"
              element={<ProductDescription />}
            ></Route>

            <Route path="/beautysection" element={<BeautySection />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/wishlist" element={<WishList />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/address" element={<Address />}></Route>
            <Route path="/" element={<Banner />}></Route>
          </Routes>
        </div>
        {/* </WishlistProvider>, */}
      </DataProvider>
    </BrowserRouter>
  </StrictMode>
);
