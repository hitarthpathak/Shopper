import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Men_Category from "./pages/Men_Category";
import Women_Category from "./pages/Women_Category";
import Kids_Category from "./pages/Kids_Category";
import Cart from "./pages/cart/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import New_Collections from "./pages/New_Collections";
import Product_Details from "./pages/product-details/Product_Details";

export const Context_API = createContext();

function App() {

  const [light_mode, set_light_mode] = useState(true);
  const [product_data, set_product_data] = useState([]);
  const [shopper_users, set_shopper_users] = useState(JSON.parse(localStorage.getItem("shopper-users") || "[]"));
  const [logged_in_user, set_logged_in_user] = useState(JSON.parse(localStorage.getItem("shopper-logged-in-user") || "null"));
  const [is_logged_in, set_is_logged_in] = useState(JSON.parse(localStorage.getItem("shopper-login-status") || "false"));
  const [cart, set_cart] = useState(logged_in_user?.cart || []);

  useEffect(() => {
    document.body.className = light_mode ? "bg-white text-black" : "bg-black text-white";
  }, [light_mode]);

  useEffect(() => {
    if (logged_in_user) {
      set_cart(logged_in_user.cart || []);
      localStorage.setItem("shopper-logged-in-user", JSON.stringify(logged_in_user));
      let updated_users = shopper_users.map(user =>
        user.e_mail === logged_in_user.e_mail ? logged_in_user : user
      );
      set_shopper_users(updated_users);
      localStorage.setItem("shopper-users", JSON.stringify(updated_users));
    } else {
      set_cart([]);
    }
  }, [logged_in_user]);

  useEffect(() => {
    axios.get("https://hitarthpathak.github.io/Free-API/E-Commerce-Products.json")
      .then((response) => {
        set_product_data(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return (

    <div className="flex flex-col min-h-screen">

      <Context_API.Provider value={{ light_mode, set_light_mode, product_data, is_logged_in, set_is_logged_in, logged_in_user, set_logged_in_user, shopper_users, set_shopper_users, cart, set_cart }}>

        <Navbar />

        <div className="flex flex-col flex-grow">

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/men-category" element={<Men_Category category="men" />} />

            <Route path="/women-category" element={<Women_Category category="women" />} />

            <Route path="/kids-category" element={<Kids_Category category="kids" />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/new-collections" element={<New_Collections />} />

            <Route path="/product-details/:product_id" element={<Product_Details />} />

            <Route path="*"
              element={
                <div className="404-page flex-grow border h-full w-full flex items-center justify-center">
                  <h1 className="text-3xl">404 Page Not Found!</h1>
                </div>
              }
            />

          </Routes>

        </div>

      </Context_API.Provider>

      <Footer />

    </div>

  );

};

export default App;