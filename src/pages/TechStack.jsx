import React, { useState } from 'react';
import ListItems from '../components/ListItems';
import { MdWorkHistory } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import { RiAddCircleLine } from "react-icons/ri";
import { FaEdit, FaSave } from "react-icons/fa";
import { BiMedal } from "react-icons/bi";

const TechStack = () => {
  const [items, setItems] = useState([
    {
        field1: { type: 'text', value: '', label: 'Skill' },
        field2: { type: 'text', value: '', label: 'Experience' },
        field3: { type: 'text', value: '', label: 'Last Used' },
        field4: { type: 'number', value: '', label: 'Rating' },
    }
  ]);
  const [isEditing, setIsEditing] = useState(0); // Enable editing for the first item initially

  const addItem = () => {
    setItems([
      ...items, 
      {
        field1: { type: 'text', value: '', label: 'Skill' },
        field2: { type: 'text', value: '', label: 'Experience' },
        field3: { type: 'text', value: '', label: 'Last Used' },
        field4: { type: 'number', value: '', label: 'Rating' },
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
    <div className="container mx-auto p-4 bg-white rounded-lg mb-2">
      <h1 className="text-2xl mb-4"> <BiMedal className='inline-flex'/> TechStack</h1>
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

export default TechStack;
