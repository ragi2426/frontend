import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaPhone, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdDateRange, MdDriveFileRenameOutline } from "react-icons/md";
import { ImOffice, ImLocation2 } from "react-icons/im";
import { RiTimeZoneFill } from "react-icons/ri";
import { HiIdentification } from "react-icons/hi";
import { getProfile, updateProfile } from "../services/apiService";
import axios from "axios";
import apiClient from "../interceptors/authInterceptor";
import debounce from "lodash.debounce";

const Profile = () => {
  const [timezone, setTimezone] = useState("");
  const [gender, setGender] = useState("");
  const [ddOptionsGender, setDDGenderOptions] = useState([
    { value: "", label: "Select Gender", disabled: true },
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
    { value: "N", label: "Prefer not to say" },
  ]);

  const [ddOptionsTimezone, setDDTimezoneOptions] = useState([
    { value: "", label: "Select Time Zone", disabled: true },
    { value: "IST", label: "IST - Indian Standard Time" },
    { value: "GMT+5:30", label: "GMT+5:30 - India" },
  ]);

  const initialFormData = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    secondary_email: "",
    phone_number: "",
    sex: "",
    base_location: "",
    office_location: "",
    timezone: { id: "", name: "" },
  };

  const [registrationFormData, setFormData] = useState(initialFormData);
  const [basicError, setBasicError] = useState({});

  const [timezones, setTimezones] = useState([]);
  const [search, setSearch] = useState("");
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [id, setId] = useState(0);
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
    getProfileData();
  }, [search, fetchTimezones]);

  const getProfileData = () => {
    getProfile()
      .then((profileResponse) => {
        const response = profileResponse[0];
        const updatedFormData = {
          firstname: response.first_name || "",
          lastname: response.last_name || "",
          username: response.username || "",
          email: response.email || "",
          secondary_email: response.secondary_email || "",
          phone_number: response.phone_number || "",
          sex: response.sex || "",
          base_location: response.base_location || "",
          office_location: response.office_location || "",
          timezone: { id: response.timezone || "", name: "" },
        };
        setFormData(updatedFormData);
        setId(response.id);
      })
      .catch((error) => {
        console.error("Error fetching Profile data:");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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

  useEffect(() => {
    setIsFormChanged(
      JSON.stringify(registrationFormData) !== JSON.stringify(initialFormData)
    );
  }, [registrationFormData, initialFormData]);

  const validateForm = () => {
    let formErrors = {};

    Object.keys(registrationFormData).forEach((key) => {
      if (typeof registrationFormData[key] === "object" && key === "timezone") {
        if (!registrationFormData[key].id) {
          formErrors[key] = "Time zone is required";
        }
      } else if (!registrationFormData[key] && key !== "secondary_email") {
        formErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });

    setBasicError(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      username: registrationFormData.username,
      email: registrationFormData.email,
      first_name: registrationFormData.firstname,
      last_name: registrationFormData.lastname,
      secondary_email: registrationFormData.secondary_email,
      phone_number: registrationFormData.phone_number,
      sex: registrationFormData.sex,
      base_location: registrationFormData.base_location,
      office_location: registrationFormData.office_location,
      timezone: registrationFormData.timezone.id,
    };

    console.log("Payload:", payload);

    try {
      const response = await updateProfile(id, payload);
      // console.log("Registered successful", response);
      if (response && response.id) {
        // window.location.href = "/login";
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
              to="/home"
              className="font-light text-xs text-gray-500 hover:text-blue-700"
            >
              {"<"} Back
            </Link>
          </span>
        </div>
        <div className="w-2/4">
          <h2 className="text-2xl font-bold mb-2 text-center">
            Update Profile
          </h2>
        </div>
        <div className="w-1/4"></div>
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
          <div className="flex w-1/2">
            <div className="w-3/4 p-1 pr-0 ">
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
            </div>
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

        <div className="flex items-center justify-center">
          <button
            className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isFormChanged
                ? "bg-blue-500 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            type="submit"
            disabled={!isFormChanged}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
