import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter , Routes, Route} from 'react-router-dom'
import { DataProvider } from './components/DataContext.jsx';
import './index.css'
import App from './App.jsx'
import Navbar from './Navbar/Navbar.jsx'
import Home from './components/Home'

import Profile from './pages/Profile/Profile.jsx'
import Orders from './components/Oders'
import ProductDescription from './components/Product/ProductDescription.jsx'
import MenSection from './pages/MenSection.jsx'
import WomenSection from './pages/WomenSection.jsx'
import KidsSection from './pages/KidsSection.jsx'
import BeautySection from './pages/BeautySection/BeautySection.jsx'
import ProductCard from './ProductCard/ProductCard.jsx'
import WishList from './pages/Wishlist/WishList.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Signup from './pages/Login/Signup.jsx'
import Login from './pages/Login/Login.jsx' 
import Products from './components/FilterProducts/Products.jsx'
import SaveEdits from './pages/Profile/SaveEdits.jsx';
// import  WishlistProvider  from './pages/Wishlist/WishlistContext.jsx';


createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <BrowserRouter >
    <DataProvider>
    {/* <WishlistProvider> */}
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element= {< Home />}></Route>
        <Route path="/orders" element= {< Orders />}></Route>
        <Route path="/productdescription" element= {< ProductDescription />}></Route>
        <Route path="/productcard" element= {< ProductCard />}></Route>
        <Route path="/beautysection" element= {< BeautySection/>}></Route>
        <Route path="/mensection" element= {< MenSection />}></Route>
        <Route path="/kidssection" element= {< KidsSection/>}></Route>
        <Route path="/profile" element= {< Profile />}></Route>
        <Route path="/womensection" element= {< WomenSection />}></Route>
        
        <Route path="/wishlist" element= {< WishList />}></Route>
        <Route path="/cart" element= {< Cart />}></Route>
        <Route path="/signup" element= {< Signup  />}></Route>
        <Route path="/login" element= {< Login  />}></Route>
        <Route path="/products" element= {< Products />}></Route>
        <Route path="/edits" element= {< SaveEdits />}></Route>
      </Routes>
      {/* </WishlistProvider>, */}
      </DataProvider>
    </BrowserRouter>
  </StrictMode>
)
