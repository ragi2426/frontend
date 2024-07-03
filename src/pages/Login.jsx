import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { MdEmail, MdPassword } from "react-icons/md";
import { loginService } from '../services/apiService';


// import { loginService } from '../services/authService';

const Login = () => {
  const [isPassVisibal, setPassVisibality] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [basicError, setBasicError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  // Toggle Password
  const togglePassVisibality = (e) => {
    setPassVisibality(!isPassVisibal);
    e.preventDefault()
    console.log(isPassVisibal)
  }

  // Login form Validation
  const LoginFormValidation = () => {
    let isFormValid = true;

    if (!username.trim()) {
      setUsernameError('Username is required');
      isFormValid = false;
    } else {
      setUsernameError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isFormValid = false;
    } else {
      setPasswordError('');
    }

    return isFormValid;


  }
  // Handle Submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!LoginFormValidation()) {
      return;
    }

    console.log(username, password)
    try {
      const response = await loginService(username, password);
      console.log('Login successful', response);
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
    } catch (error) {
      console.log(error);
      setBasicError(error.detail);
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-center bg-transparent p-4 signup-form'>

      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2 text-start" htmlFor="username">
            Username
          </label>
          <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
            <FaUser className="absolute ml-3 pointer-events-none" />
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg`}
            />
          </div>
          {usernameError && <p className="text-red-500 text-xs mt-1">{usernameError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2 text-start" htmlFor="password">
            Password
          </label>
          <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
            <MdPassword className="absolute ml-3 pointer-events-none" />
            <input
              id="password"
              type={isPassVisibal ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-${errors.password ? 'red' : 'blue'}-500
              className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg`}
            />
            <button className="absolute right-3 cursor-pointer" onClick={togglePassVisibality}>
              {isPassVisibal ? <BiSolidHide /> : <BiSolidShow />}
            </button>
          </div>
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>
      {basicError && <p className="text-red-500 text-xs mb-4">{basicError}</p>}

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Sign In
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
