import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaAngleDown } from "react-icons/fa";
import { ImProfile, ImCog, ImExit } from "react-icons/im";
import { MdWorkHistory } from "react-icons/md";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-transparent p-0">
      <div className="w-full px-1 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex lg:w-4/12 sm:w-5/12 justify-between sm:justify-around items-center">
            <div className="flex h-1/4">
              <img src="/src/assets/c5i-logo.png" alt="Logo" className="w-20 sm:w-20" />
            </div>
            <Link to="/" className="text-violet-950 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              Resource Vision
            </Link>
          </div>

          <div className="flex justify-center flex-1">
            <div className="flex space-x-4">
              {/* for space @TODO*/}
            </div>
          </div>

          <div className="flex items-center w-3/12 justify-end">
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="flex items-center text-gray-800 focus:outline-none w-12 h-10">
                <FaUserCircle className="w-10 h-10 rounded-full text-violet-950" />
                <FaAngleDown className="w-2rounded-full text-violet-950" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center">
                    <ImProfile className="mr-2" /> Profile
                  </Link>
                  <Link to="/experience" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center">
                    <MdWorkHistory className="mr-2" /> Experience
                  </Link>
                  {/* <Link to="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center">
                    <ImExit className="mr-2" /> Logout
                  </Link> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
