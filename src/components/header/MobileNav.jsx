import React from "react";
import { FaHome, FaSearch, FaPlusSquare, FaUser } from "react-icons/fa";

const MobileNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gray-900 border-t shadow-md flex justify-around items-center h-14 text-xl text-gray-600">
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
    </div>
  );
};

export default MobileNav;
