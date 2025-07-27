import React, { useState } from "react";
import { FaHome, FaSearch, FaPlusSquare, FaUser, FaRegHeart } from "react-icons/fa";
import { BiSolidMessageDots } from "react-icons/bi";
import NavigateBtn from "../NavigateBtn";
import { useNavigate } from "react-router";
import SearchDrawer from "../Search";

const Sidebar = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const [showSearch, setShowSearch] = useState(false)
  NavigateBtn;
  const navigate = useNavigate()
  return (
    <>
    <div className="h-screen hidden z-30 fixed w-36 bg-[#1c1c1e] border-r md:flex flex-col justify-between items-center py-6 space-y-6 shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-center font-playwrite text-[#f5f5f5]">Tillugram</div>

      {/* Icons */}
      <nav className="flex flex-col gap-8 text-2xl text-[#b0b0b0]">
        <button onClick={() => navigate('/') } className="hover:text-blue-500">
          <FaHome />
        </button>
        <button onClick={() => setShowSearch(true)} className="hover:text-blue-500">
          <FaSearch />
        </button>
        <button onClick={() => navigate('/messages')} className="hover:text-blue-500">
          <BiSolidMessageDots />
        </button>
        <button onClick={() => navigate('/post')} className="hover:text-blue-500">
          <FaPlusSquare />
        </button>
        <button className="hover:text-blue-500">
          <FaRegHeart />
        </button>
        <button onClick={() => navigate('/profile')} className="hover:text-blue-500">
          <FaUser />
        </button>
      </nav>
    
    <div className="m-1">
          {isLoggedIn ? (
        <NavigateBtn title="Log out" navigateTo="/login" token="token" />
      ) : (
        <div className="m-1 flex flex-col gap-1">
          <NavigateBtn title="Log in" navigateTo="/login" />
          <NavigateBtn title="Sign up" navigateTo="/signup" />
        </div>
      )}
    </div>
    </div>
    <SearchDrawer isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
};

export default Sidebar;
