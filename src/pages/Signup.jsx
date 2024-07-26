import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaPhone, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdPassword, MdDateRange, MdDriveFileRenameOutline } from "react-icons/md";
import { ImOffice, ImLocation2 } from "react-icons/im";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { RiTimeZoneFill } from "react-icons/ri";
import { HiIdentification } from "react-icons/hi";
import { signupService } from "../services/apiService";
import axios from "axios";
import apiClient from "../interceptors/authInterceptor";
import debounce from "lodash.debounce";

const Signup = () => {
  const [isPassVisibal, setPassVisibality] = useState(false);
  const [isConfirmPassVisibal, setConfirmPassVisibality] = useState(false);
  const [timezone, setTimezone] = useState("");
  const [gender, setGender] = useState("");
  const [ddOptionsGender, setDDGenderOptions] = useState([
    { value: "", label: "Select Gender", disabled: true },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "no", label: "Prefer not to say" },
  ]);

  const [ddOptionsTimezone, setDDTimezoneOptions] = useState([
    { value: "", label: "Select Time Zone", disabled: true },
    { value: "IST", label: "IST - Indian Standard Time" },
    { value: "GMT+5:30", label: "GMT+5:30 - India" },
  ]);

  const [registrationFormData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    secondary_email: "",
    phone_number: "",
    sex: "",
    base_location: "",
    office_location: "",
    timezone: { id: "", name: "" },
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [confirmPassTouched, setConfirmPassTouched] = useState(false);
  const [basicError, setBasicError] = useState({});

  const [timezones, setTimezones] = useState([]);
  const [search, setSearch] = useState("");

  // Debounce fetchTimezones function
  const fetchTimezones = useCallback(
    debounce(async (query) => {
      try {
        const response = await apiClient.get(`user/timezones/?search=${query}`);
        setTimezones(response.data);
      } catch (error) {
        console.error("Error fetching timezones:", error);
      }
    }, 500),
    []
  ); // 500ms debounce delay

  useEffect(() => {
    if (search) {
      fetchTimezones(search);
    } else {
      setTimezones([]);
    }
  }, [search, fetchTimezones]);

  const togglePassVisibality = (e) => {
    setPassVisibality(!isPassVisibal);
    e.preventDefault();
  };
  const toggleConfirmPassVisibality = (e) => {
    setConfirmPassVisibality(!isConfirmPassVisibal);
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirm_password") {
      setConfirmPassTouched(true);
      setPasswordsMatch(value === registrationFormData.password);
    }
    if (confirmPassTouched && name === "password") {
      setPasswordsMatch(value === registrationFormData.confirm_password);
    }
    if (name === "timezone") {
      setSearch(value);
      setFormData({
        ...registrationFormData,
        timezone: { id: "", name: value },
      });
    } else {
      setFormData({
        ...registrationFormData,
        [name]: value,
      });
    }
  };

  const handleTimezoneSelect = (timezone) => {
    setFormData({
      ...registrationFormData,
      timezone: timezone,
    });
    setSearch("");
  };

  const validateForm = () => {
    let formErrors = {};

    Object.keys(registrationFormData).forEach((key) => {
      if (typeof registrationFormData[key] === "object" && key === "timezone") {
        if (!registrationFormData[key].id) {
          formErrors[key] = "Time zone is required";
        }
      } else if (!registrationFormData[key] && key!== "secondary_email") {
        formErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });

    if (
      registrationFormData.password !== registrationFormData.confirm_password
    ) {
      formErrors.confirm_password = "Passwords do not match";
    }
    // console.log(formErrors);

    setBasicError(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      user: {
        username: registrationFormData.username,
        email: registrationFormData.email,
        password: registrationFormData.password,
        first_name: registrationFormData.firstname,
        last_name: registrationFormData.lastname,
      },
      secondary_email: registrationFormData.secondary_email,
      phone_number: registrationFormData.phone_number,
      sex: registrationFormData.sex,
      base_location: registrationFormData.base_location,
      office_location: registrationFormData.office_location,
      timezone: registrationFormData.timezone.id,
    };

    // console.log("Payload:", payload);

    try {
      const response = await signupService(payload);
      // console.log("Registered successful", response);
      if (response && response.id) {
        window.location.href = "/login";
      }
    } catch (error) {
      // setBasicError(error.detail);
    }
  };

  return (
    <div className="w-full h-full p-2 signup-form">
      <div className="flex p-0 justify-between">
        <div className="w-1/4 flex justify-start"> 
          <span>
            <Link
              to="/login"
              className="font-light text-xs text-gray-500 hover:text-blue-700"
            >
              {"<"} Log In
            </Link>
          </span>
        </div>
        <div className="w-2/4"> 
          <h2 className="text-2xl font-bold mb-2 text-center">
            Create an account
          </h2>
        </div>
        <div className="w-1/4">
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-2">
          <div className="w-1/2 p-1 pl-0">
            <label
              className="block text-gray-800 text-sm font-medium text-start"
              htmlFor="firstname"
            >
              First Name
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <MdDriveFileRenameOutline className="absolute ml-3 pointer-events-none" />
              <input
                id="firstname"
                type="text"
                placeholder="First name"
                name="firstname"
                value={registrationFormData.firstname}
                onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 bg-white border outline-transparent rounded-lg ${
                  basicError.firstname ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>
          <div className="w-1/2 p-1 pr-0">
            <label
              className="block text-gray-800 text-sm font-medium text-start"
              htmlFor="lastname"
            >
              Last Name
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <MdDriveFileRenameOutline className="absolute ml-3 pointer-events-none" />
              <input
                id="lastname"
                type="text"
                placeholder="Last name"
                name="lastname"
                value={registrationFormData.lastname}
                onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 bg-white border outline-transparent rounded-lg ${
                  basicError.lastname ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>
        </div>

        <div className="flex mb-2">
          <div className="w-1/2 p-1 pl-0">
            <label
              className="block text-gray-700 text-sm font-medium text-start"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <FaUser className="absolute ml-3 pointer-events-none" />
              <input
                id="username"
                type="text"
                placeholder="Username"
                name="username"
                value={registrationFormData.username}
                onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg ${
                  basicError.username ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>

          <div className="w-1/2 p-1 pr-0">
            <label
              className="block text-gray-700 text-sm font-medium text-start"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <MdEmail className="absolute ml-3 pointer-events-none" />
              <input
                id="email"
                type="text"
                placeholder="Primary email"
                name="email"
                value={registrationFormData.email}
                onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg ${
                  basicError.email ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>
        </div>
        <div className="flex mb-2">
          <div className="w-1/2 p-1 pl-0">
            <label
              className="block text-gray-700 text-sm font-medium text-start"
              htmlFor="contact"
            >
              Phone
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <FaPhoneAlt className="absolute ml-3 pointer-events-none" />
              <input
                id="contact"
                type="number"
                placeholder="Phone number"
                name="phone_number"
                value={registrationFormData.phone_number}
                onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg ${
                  basicError.phone_number ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>
          <div className="w-1/2 p-1 pr-0">
            <label
              className="block text-gray-700 text-sm font-medium text-start"
              htmlFor="sceemail"
            >
              Secondary Email
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <MdEmail className="absolute ml-3 pointer-events-none" />
              <input
                id="sceemail"
                type="text"
                placeholder="Secondary email"
                name="secondary_email"
                value={registrationFormData.secondary_email}
                onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg ${
                  basicError.secondary_email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>
        </div>

        <div className="flex mb-2">
          <div className="w-1/2 p-1 pl-0">
            <label
              className="block text-gray-700 text-sm font-medium text-start"
              htmlFor="offlocation"
            >
              Office Location
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <ImOffice className="absolute ml-3 pointer-events-none" />
              <input
                id="offlocation"
                type="text"
                placeholder="Office location"
                name="office_location"
                value={registrationFormData.office_location}
                onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg ${
                  basicError.office_location
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>
          <div className="w-1/2 p-1 pl-0">
            {/* <div className="w-3/4 p-1 pr-0 "> */}
              <label
                className="block text-gray-700 text-sm font-medium text-start"
                htmlFor="worklocation"
              >
                Work Location
              </label>
              <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
                <ImLocation2 className="absolute ml-3 pointer-events-none" />
                <input
                  id="worklocation"
                  type="text"
                  placeholder="Work location"
                  name="base_location"
                  value={registrationFormData.base_location}
                  onChange={handleInputChange}
                  className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg ${
                    basicError.base_location
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </div>
              {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
            {/* </div> */}
          </div>
        </div>

        <div className="flex mb-2">
          <div className="w-1/2 p-1 pl-0">
            <label
              className="block text-gray-700 text-sm font-medium text-start"
              htmlFor="timezone"
            >
              Time Zone
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <RiTimeZoneFill className="absolute ml-3 pointer-events-none" />
              <input
                id="timezone"
                type="text"
                placeholder="Select Time Zone"
                name="timezone"
                value={registrationFormData.timezone.name}
                onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg ${
                  basicError.timezone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {Array.isArray(timezones) && search && (
                <ul className="absolute top-full left-0 w-full bg-white border rounded-lg mt-1 z-10 max-h-48 overflow-y-auto">
                  {timezones.map((tz) => (
                    <li
                      key={tz.id}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleTimezoneSelect(tz)}
                    >
                      {tz.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="w-1/2 p-1 pr-0">
            <label
              className="block text-gray-700 text-sm font-medium text-start"
              htmlFor="sex"
            >
              Gender
            </label>
            <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 rounded-lg">
              <HiIdentification className="absolute ml-3 pointer-events-none" />
              <select
                id="sex"
                name="sex"
                value={registrationFormData.sex}
                onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg ${
                  basicError.sex ? "border-red-500" : "border-gray-300"
                }`}
              >
                {ddOptionsGender.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {/* {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>} */}
          </div>
        </div>

        <div className="flex mb-4">
          <div className="w-1/2 p-1 pl-0">
            <label
              className="block text-gray-700 text-sm font-medium text-start"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <MdPassword className="absolute ml-3 pointer-events-none" />
              <input
                id="password"
                type={isPassVisibal ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={registrationFormData.password}
                onChange={handleInputChange}
                // ${basicError.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 ${basicError.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-${basicError.password ? 'red' : 'blue'}-500
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg ${
                  basicError.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                className="absolute right-3 cursor-pointer"
                onClick={togglePassVisibality}
              >
                {isPassVisibal ? <BiSolidHide /> : <BiSolidShow />}
              </button>
            </div>
          </div>
          <div className="w-1/2 p-1 pr-0">
            <label
              className="block text-gray-700 text-sm font-medium text-start"
              htmlFor="confpassword"
            >
              Confirm Password
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
              <MdPassword className="absolute ml-3 pointer-events-none" />
              <input
                id="confpassword"
                type={isPassVisibal ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirm_password"
                value={registrationFormData.confirm_password}
                onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 bg-white border rounded-lg  ${
                  basicError.confirm_password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <button
                className="absolute right-3 cursor-pointer"
                onClick={toggleConfirmPassVisibality}
              >
                {isConfirmPassVisibal ? <BiSolidHide /> : <BiSolidShow />}
              </button>
            </div>
            {!passwordsMatch && (
              <p className="text-red-500 text-xs mt-1">
                Passwords do not match
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
