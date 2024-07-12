import React, { useState } from 'react';

import ListItems from '../components/ListItems';
import { MdWorkHistory } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import { RiAddCircleLine } from "react-icons/ri";
import { FaEdit, FaSave } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";

const Education = () => {
  const [items, setItems] = useState([
    {
        field1: { type: 'text', value: '', label: 'Degree' },
        field2: { type: 'text', value: '', label: 'Universitye' },
        field3: { type: 'date', value: '', label: 'Year' },
        field4: { type: 'text', value: '', label: 'percentage' },
    }
  ]);
  const [isEditing, setIsEditing] = useState(0); // Enable editing for the first item initially

  const addItem = () => {
    setItems([
      ...items, 
      {
        field1: { type: 'text', value: '', label: 'Degree' },
        field2: { type: 'text', value: '', label: 'Universitye' },
        field3: { type: 'date', value: '', label: 'Year' },
        field4: { type: 'text', value: '', label: 'percentage' },
    }
    ]);
    setIsEditing(items.length);
  };

  const saveItem = (index, updatedItem) => {
    console.log(index, updatedItem)
    const updatedItems = items.map((item, i) => (i === index ? updatedItem : item));
    setItems(updatedItems);
    setIsEditing(null); // Disable editing after saving
  };

  const saveAllItems = () => {
    console.log(items)
    const payload = items.map((item) => ({
      company_name: item.field1.value,
      start_date: item.field2.value,
      end_date: item.field3.value,
      designation: item.field4.value,
      user_profile: 1
    }));
    console.log(payload);
  };

//   const labels = {
//     field1: 'Company Name',
//     field2: 'Start Date',
//     field3: 'End Date',
//     field4: 'Designation',
//     field5: 'Skills'
//   };

  return (
    <div className="container mx-auto p-4 bg-white rounded- mb-2">
      <h1 className="text-2xl mb-4"> <FaUserGraduate className='inline-flex'/> Education</h1>
      <ul>
        {items.map((item, index) => (
          <ListItems
            key={index}
            item={item}
            // labels={labels}
            isEditing={isEditing === index}
            setIsEditing={(editing) => setIsEditing(editing ? index : null)}
            // onSave={(updatedItem) => saveItem(index, updatedItem)}
            onSave={(updatedItem) => {
              const updatedItems = items.map((item, i) => (i === index ? updatedItem : item));
              setItems(updatedItems);
              console.log(updatedItem);
            }}
            index={index}
            isFirstItem={index === 0 && items.length === 1} // Only Initially editable
          />
        ))}
      </ul>
      <div className="flex space-x-4 justify-end">
        <button onClick={addItem} className="bg-green-500 text-base text-white p-2 rounded-md">
        <RiAddCircleLine className='inline-flex mr-1'/>New
        </button>
        <button onClick={saveAllItems} className="bg-blue-500 text-base text-white p-2 rounded-md">
          <FaSave className='inline-flex'/> Save All
        </button>
      </div>
    </div>
  );
};

export default Education;
