import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink,Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible ,setvisible]=useState(false);
  const {setShowSearch , getCartCount,navigate ,token ,setToken,setCartItems}= useContext(ShopContext);
  const logout=()=>{
    navigate("/login");
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    
  }

  return (
    <div className="flex items-center justify-between py-6 font-medium">
      <img src={assets.logo} alt="" className="w-40" />
      <ul className="hidden sm:flex gap-5 text-lg text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1 py-2">
          <p>Home</p>
          <hr className="w-5 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/collection"
          className="flex flex-col items-center gap-1 py-2"
        >
          <p>Collection</p>
          <hr className="w-5 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1 py-2">
          <p>About</p>
          <hr className="w-5 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/contact"
          className="flex flex-col items-center gap-1 py-2 "
        >
          <p>Contact</p>
          <hr className="w-5 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <div className="inline-block border border-gray-300 rounded-2xl px-5 py-2 bg-white shadow-sm hover:bg-gray-100 transition-all ">
          <a href="https://the-originals-admin.vercel.app">Admin Panel</a>
        </div>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt=""
          className="w-6 cursor-pointer"
        />

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("login"))}
            src={assets.profile_icon}
            alt=""
            className="w-6 cursor-pointer"
          />
          {/* ------------Drop Down Menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
       
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  {" "}
                  Orders
                </p>
                <p
                  onClick={() => logout()}
                  className="cursor-pointer hover:text-black"
                >
                  {" "}
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="" className="w-6 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]  ">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setvisible(true)}
          src={assets.menu_icon}
          className="w-6 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      {/* sidebar menu for small screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setvisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setvisible(false)}
            to="/"
            className=" py-2 pl-6 border"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setvisible(false)}
            to="/collection"
            className=" py-2 pl-6 border"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setvisible(false)}
            to="/about"
            className=" py-2 pl-6 border"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setvisible(false)}
            to="/contact"
            className=" py-2 pl-6 border"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar
