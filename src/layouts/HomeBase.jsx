import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';  
// import backgroundImage from 'src/assets/c5i-logo.png';
import backgroundImage from '../assets/c5i-logo.png'; 

const HomeBase = () => {
  return (
    <div className="flex flex-col h-screen main-bg">
      <header className="bg-gray-300 text-white p-2">
        <Navbar />
      </header>
      <main className="flex-1 overflow-y-auto p-2" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: '400px 200px',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat'
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default HomeBase;
