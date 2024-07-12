import React, { useState, useEffect } from 'react';
import ListItems from '../components/ListItems';
import { MdWorkHistory } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import { RiAddCircleLine } from "react-icons/ri";
import { FaEdit, FaSave } from "react-icons/fa";
import { getExperience, addExperience, updateExperience, deleteExperience } from '../services/apiService';

const Experience = () => {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(0); // Enable editing for the first item initially

  useEffect(() => {
    getExperienceData();
  }, []);

  const getExperienceData = () => {
    getExperience().then(response => {
      const formattedData = response.data.map(item => ({
        company_name: { type: 'text', value: item.company_name , label: 'Company Name'},
        start_date: { type: 'date', value: item.start_date , label: 'Start Date'},
        end_date: { type: 'date', value: item.end_date , label: 'End Date'},
        designation: { type: 'text', value: item.designation , label: 'Designation'},
        skills: { type: 'text', value: item.skills , label: 'Skills'},
        user_profile: item.user_profile
      }));
      setItems(formattedData);
    })
      .catch(error => {
        console.error('There was an error fetching the experience data!', error);
      });
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        //   field1: { type: 'text', value: '', label: 'Company Name' }, 
        //   field2: { type: 'date', value: '', label: 'Start Date'}, 
        //   field3: { type: 'date', value: '', label: 'End Date'}, 
        //   field4: { type: 'text', value: '', label: 'Designation'}, 
        //   field5: { type: 'text', value: '', label: 'Skills'}
        company_name: { type: 'text', value: '', label: 'Company Name' },
        start_date: { type: 'date', value: '', label: 'Start Date' },
        end_date: { type: 'date', value: '', label: 'End Date' },
        designation: { type: 'text', value: '', label: 'Designation' },
        skills: { type: 'text', value: '', label: 'Skills' },
        user_profile: items.length + 1
      }
    ]);
    setIsEditing(items.length);
  };

  // const saveItem = (index, updatedItem) => {
  //   console.log(index, updatedItem)
  //   const updatedItems = items.map((item, i) => (i === index ? updatedItem : item));
  //   setItems(updatedItems);
  //   setIsEditing(null); // Disable editing after saving
  // };

  const saveAllItems = () => {
    console.log(items)
    const payload = items.map((item) => ({
      company_name: item.company_name.value,
      start_date: item.start_date.value,
      end_date: item.end_date.value,
      designation: item.designation.value,
      skills: item.skills.value,
      user_profile: item.user_profile
    }));
    console.log(payload);

    addExperience(payload).then(response => {
      console.log('Data saved successfully!', response.data);
      getExperienceData(); // Fetch the updated data
    })
      .catch(error => {
        console.error('There was an error saving the data!', error);
      });
  };

  const saveItem = (index, updatedItem) => {
    const updatedItems = items.map((item, i) => (i === index ? updatedItem : item));
    setItems(updatedItems);
    setIsEditing(null); // Disable editing after saving

    const payload = {
      company_name: updatedItem.company_name.value,
      start_date: updatedItem.start_date.value,
      end_date: updatedItem.end_date.value,
      designation: updatedItem.designation.value,
      skills: updatedItem.skills.value,
      user_profile: updatedItem.user_profile
    };

    updateExperience(index, payload)
      .then(response => {
        console.log('Data updated successfully!', response.data);
      })
      .catch(error => {
        console.error('There was an error updating the data!', error);
      });
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg mb-2">
      <h1 className="text-2xl mb-4"> <MdWorkHistory className='inline-flex' /> Experience</h1>
      <ul>
        {items.map((item, index) => (
          <ListItems
            key={index}
            item={item}
            // labels={labels}
            isEditing={isEditing === index}
            setIsEditing={(editing) => setIsEditing(editing ? index : null)}
            // onSave={(updatedItem) => {
            //   const updatedItems = items.map((item, i) => (i === index ? updatedItem : item));
            //   setItems(updatedItems);
            //   console.log(updatedItem);
            // }}
            onSave={(updatedItem) => saveItem(index, updatedItem)}
            index={index}
            isFirstItem={index === 0 && items.length === 1} // Only Initially editable
          />
        ))}
      </ul>
      <div className="flex space-x-4 justify-end">
        <button onClick={addItem} className="bg-green-500 text-base text-white p-2 rounded-md">
          <RiAddCircleLine className='inline-flex mr-1' />New
        </button>
        <button onClick={saveAllItems} className="bg-blue-500 text-base text-white p-2 rounded-md">
          <FaSave className='inline-flex' /> Save All
        </button>
      </div>
    </div>
  );
};

export default Experience;
