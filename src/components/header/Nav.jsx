import React from "react";
import { FaHome, FaSearch, FaPlusSquare, FaUser } from "react-icons/fa";
import NavigateBtn from "../NavigateBtn";

const Sidebar = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  NavigateBtn;
  return (
    <div className="h-screen hidden fixed w-30 bg-gray-900 border-r md:flex flex-col justify-between items-center py-6 space-y-6 shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-center text-white">Spcial media</div>

      {/* Icons */}
      <nav className="flex flex-col gap-8 text-2xl text-gray-600">
        <button className="hover:text-blue-500">
          <FaHome />
        </button>
        <button className="hover:text-blue-500">
          <FaSearch />
        </button>
        <button className="hover:text-blue-500">
          <FaPlusSquare />
        </button>
        <button className="hover:text-blue-500">
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
  );
};

export default Sidebar;
