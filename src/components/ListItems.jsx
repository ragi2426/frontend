import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { VscDiscard } from "react-icons/vsc";

const ListItems = ({
  item,
  onSave,
  editState,
  isEditing,
  setIsEditing,
  onChange,
  isDisabled, 
  onDelete
}) => {
  const [inputs, setInputs] = useState(item);

  useEffect(() => {
    console.log(editState)
    setInputs(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedInputs = {
      ...inputs,
      [name]: {
        ...inputs[name],
        value: value,
      },
    };
    setInputs(updatedInputs);
    onChange(updatedInputs); // Update parent state
  };

  const handleDiscard = () => {
    setInputs(item); // Reset inputs to original item state
    setIsEditing(false); // Exit edit mode
    onChange(item); // Propagate the reset state to the parent
  };


  const handleEdit = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleUpdate = () => {
    const updatedItem = { ...inputs };

    onSave(item.id, updatedItem)
      .then((response) => {
        console.log("Item updated successfully!", response.data);
        setIsEditing(false); // Exit edit mode
        onChange(updatedItem); // Update parent state
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };

  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <li className="flex flex-col p-3 form-control-list">
      <div className="flex flex-wrap -mx-2">
        {Object.keys(inputs)
          .filter((key) => key !== "user_profile" && key !== "id")
          .map((key) => (
            <div key={key} className="flex-1 px-2">
              <div className="relative flex items-center text-base text-gray-400 focus-within:text-gray-600 rounded-lg">
                <input
                  id={key}
                  type={inputs[key].type}
                  name={key}
                  value={inputs[key].value}
                  onChange={handleChange}
                  disabled={!isEditing && isDisabled}
                  className="w-full py-2 pl-4 pr-4 bg-white border rounded-lg"
                />
              </div>
            </div>
          ))}
        <div className="flex items-center px-2 mb-4">
          {editState ? isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-transparent p-2 rounded-lg text-blue-500"
              >
                <FaSave />
              </button>
              <button
                onClick={handleDiscard}
                className="bg-transparent p-2 rounded-lg text-red-500 ml-2"
              >
                <VscDiscard />
              </button>
            </>
          ) : (
            <> 
              <button
                onClick={handleEdit}
                className="bg-transparent p-2 rounded-lg text-yellow-500"
              >
                <FaEdit />
              </button>
              <button
              onClick={handleDelete}
              className="bg-transparent p-2 rounded-lg text-red-500"
              >
                <FaTrash />
              </button>
            </>
          )
        : ''
        }
        </div>
      </div>
    </li>
  );
};

export default ListItems;
