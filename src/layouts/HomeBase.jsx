import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';  

// import backgroundImage from 'src/assets/c5i-logo.png';
import backgroundImage from '../assets/c5i-logo.png'; 

const HomeBase = () => {
  return (
    <div className="flex flex-col h-screen bg-indigo-100">
      <header className="bg-slate-300 text-white">
        <Navbar />
      </header>
      <main className="flex-1 overflow-y-auto p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeBase;
