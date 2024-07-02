import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaPhone, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail, MdPassword } from "react-icons/md";
import { ImOffice, ImLocation2 } from "react-icons/im";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { RiTimeZoneFill } from "react-icons/ri";
import { HiIdentification } from "react-icons/hi";

const Signup = () => {
  const [isPassVisibal, setPassVisibality] = useState(false);
  const [timezone, setTimezone] = useState('');
  const [gender, setGender] = useState('');


  const togglePassVisibality = (e) => { 
    setPassVisibality(!isPassVisibal);
    e.preventDefault()
    console.log(isPassVisibal)
  }


  return (
    <div className='w-full h-full p-2 signup-form'>
      <div className='flex p-0 justify-between'> 
      <span><Link to="/login" className="font-light text-xs text-gray-500 hover:text-blue-700">{'<'} Log In</Link></span>
      <h2 className="text-2xl font-bold mb-2 text-center">Create an account</h2>
      <span></span>
      </div>
      <form>
        <div className="flex mb-2">
          <div className="w-1/2 p-1 pl-0">
            <label className="block text-gray-800 text-sm font-medium text-start" htmlFor="firstname">
              First Name
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <FaUser className="absolute ml-3 pointer-events-none" />
              <input
                id="firstname"
                type="text"
                placeholder="First name"
                
                className={`w-full py-2 pl-10 pr-4 bg-white border outline-transparent rounded-lg`}
              />
            </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>
          <div className="w-1/2 p-1 pr-0">
            <label className="block text-gray-800 text-sm font-medium text-start" htmlFor="lastname">
              Last Name
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <FaUser className="absolute ml-3 pointer-events-none" />
              <input
                id="lastname"
                type="text"
                placeholder="Last name"
                
                className={`w-full py-2 pl-10 pr-4 bg-white border outline-transparent rounded-lg`}
              />
            </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>
        </div>

        <div className="flex mb-2"> 
          <div className="w-1/2 p-1 pl-0">
            <label className="block text-gray-700 text-sm font-medium text-start" htmlFor="username">
              Username
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <FaUser className="absolute ml-3 pointer-events-none" />
              <input
                id="username"
                type="text"
                placeholder="Username"
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg`}
              />
            </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>

          <div className="w-1/2 p-1 pr-0">
            <label className="block text-gray-700 text-sm font-medium text-start" htmlFor="email">
              Email
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <MdEmail className="absolute ml-3 pointer-events-none" />
              <input
                id="email"
                type="text"
                placeholder="Enter your email"
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg`}
              />
            </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>
        </div>
        <div className="flex mb-2"> 
          <div className="w-1/2 p-1 pl-0">
            <label className="block text-gray-700 text-sm font-medium text-start" htmlFor="contact">
              Phone
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <FaPhoneAlt className="absolute ml-3 pointer-events-none" />
              <input
                id="contact"
                type="number"
                placeholder="Phone number"
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg`}
              />
            </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>
          <div className="w-1/2 p-1 pr-0">
            <label className="block text-gray-700 text-sm font-medium text-start" htmlFor="sceemail">
              Secondary Email
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <MdEmail className="absolute ml-3 pointer-events-none" />
              <input
                id="sceemail"
                type="text"
                placeholder="Secondary email"
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg`}
              />
            </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>
        </div>

        <div className="flex mb-2">
          <div className="w-1/2 p-1 pl-0">
            <label className="block text-gray-700 text-sm font-medium text-start" htmlFor="offlocation">
              Office Location
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <ImOffice className="absolute ml-3 pointer-events-none" />
              <input
                id="offlocation"
                type="text"
                placeholder="Office location"
                
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg`}
              />
            </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>

          <div className="w-1/2 p-1 pr-0 ">
            <label className="block text-gray-700 text-sm font-medium text-start" htmlFor="worklocation">
              Work Location
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <ImLocation2 className="absolute ml-3 pointer-events-none" />
              <input
                id="worklocation"
                type="text"
                placeholder="Work location"
                
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg`}
              />
            </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>
        </div>

        <div className="flex mb-2">
          <div className="w-1/2 p-1 pl-0">
            <label className="block text-gray-700 text-sm font-medium text-start" htmlFor="timezone">
              Time Zone
            </label>
            <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 rounded-lg">
            <RiTimeZoneFill className="absolute ml-3 pointer-events-none" />
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg`}
            >
              <option value="" disabled>Select Time Zone</option>
              <option value="IST">IST - Indian Standard Time</option>
              <option value="GMT+5:30">GMT+5:30 - India</option>
              {/* Add more options as needed */}
            </select>
          </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>

          <div className="w-1/2 p-1 pr-0">
            <label className="block text-gray-700 text-sm font-medium text-start" htmlFor="sex">
              Gender
            </label>
            <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 rounded-lg">
            <HiIdentification className="absolute ml-3 pointer-events-none" />
            <select
              id="sex"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg`}
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="no">Prefer not to say</option>

            </select>
          </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>
        </div>

        <div className="flex mb-4"> 
          <div className="w-1/2 p-1 pl-0">
            <label className="block text-gray-700 text-sm font-medium text-start" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <MdPassword className="absolute ml-3 pointer-events-none" />
              <input
                id="password"
                type={isPassVisibal ? 'text' : 'password'}
                placeholder="Password"
                // ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-${errors.password ? 'red' : 'blue'}-500
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg`}
              />
              <button className="absolute right-3 cursor-pointer" onClick={togglePassVisibality}> 
                {isPassVisibal ? <BiSolidHide/> : <BiSolidShow/>}
              </button>
            </div>
            {/* {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>} */}
          </div>
          <div className="w-1/2 p-1 pr-0">
            <label className="block text-gray-700 text-sm font-medium text-start" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <MdPassword className="absolute ml-3 pointer-events-none" />
              <input
                id="password"
                type={isPassVisibal ? 'text' : 'password'}
                placeholder="Password"
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg`}
              />
              <button className="absolute right-3 cursor-pointer" onClick={togglePassVisibality}> 
                {isPassVisibal ? <BiSolidHide/> : <BiSolidShow/>}
              </button>
            </div>
            {/* {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>} */}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
