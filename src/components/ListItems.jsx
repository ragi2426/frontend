import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave } from "react-icons/fa";

const ListItems = ({ item, onSave, isEditing, setIsEditing, index, isFirstItem }) => {
  const [inputs, setInputs] = useState(item);

  useEffect(() => {
    setInputs(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: {
        ...prevInputs[name],
        value: value
      }
    }));
  };

  const handleSave = () => {
    onSave(inputs);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <li className="flex flex-col mb-4 p-3 bg-slate-50 rounded-lg form-control-list shadow-md">
      <div className="flex flex-wrap -mx-2 mb-2">
        {Object.keys(inputs)
        .filter(key => key !== 'user_profile' && key !== 'id')
        .map((key) => (
          <div key={key} className="flex-1 px-2 mb-4">
            <label htmlFor={key} className="block text-gray-700 text-base font-medium text-start ml-1">
              {inputs[key].label}:
            </label>
            <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg"> 
              <input
                id={key}
                type={inputs[key].type}
                name={key}
                value={inputs[key].value}
                onChange={handleChange}
                disabled={!isEditing && !isFirstItem}
                className="w-full py-2 pl-4 pr-4 bg-white border rounded-lg"
              />
            </div>
          </div>
        ))}
      <div className="flex justify-end items-center space-x-2 pt-2">
        {isEditing || isFirstItem ? (
          <button onClick={handleSave} className="bg-blue-300 hover:bg-blue-500 text-white p-2 rounded-lg shadow hover:shadow-inner">
          <FaSave/>
          </button>
        ) : (
          <button onClick={handleEdit} className="bg-yellow-300 hover:bg-yellow-500 text-white p-2 rounded-lg shadow hover:shadow-inner">
            <FaEdit/>
          </button>
        )}
      </div>
      </div>
    </li>
  );
};

export default ListItems;
