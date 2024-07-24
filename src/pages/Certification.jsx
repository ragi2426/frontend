import React, { useState, useEffect } from 'react';
import ListItems from '../components/ListItems';
import { MdWorkHistory } from "react-icons/md";
import { RiAddCircleLine } from "react-icons/ri";
import { FaSave , FaUserGraduate} from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { getCertification, addCertification, updateCertification, deleteCertification } from '../services/apiService';

const Certification = () => {
  const [items, setItems] = useState([]);
  const [isEditingIndex, setIsEditingIndex] = useState(null); // Start with null
  const [editState, setEditState] = useState(false)

  useEffect(() => {
    getCertificationData();
  }, []);

  const getCertificationData = () => {
    getCertification()
      .then(response => {
        const formattedData = response.map(item => ({
          id: item.id,
          provider: { type: 'text', value: item.provider, label: 'Provider' }, 
          name: { type: 'text', value: item.name, label: 'Name'}, 
          date: { type: 'date', value: item.date, label: 'Date'}, 
          expiry_date: { type: 'date', value: item.expiry_date, label: 'Expiry Date'}, 
          user_profile: item.user_profile
        }));
        setItems(formattedData);

        // Set isEditingIndex if items exist
        if (formattedData.length > 0) {
          setEditState(true)
          setIsEditingIndex(formattedData.length - 1);
        } else {
          setEditState(false)
          setIsEditingIndex(null); 
        }
      })
      .catch(error => {
        console.error('Error fetching Certification data:');
        // console.log( error)
        // setEditState(false);
        setIsEditingIndex(null); // Reset editing state on error
      });
  };
  const deleteItem = (itemId) => {
    deleteCertification(itemId)
    .then(() => {
      // console.log('Item updated successfully:', response.data);
      const updatedItems = items.map(item => item.id !== itemId);
      setItems(updatedItems);
      setIsEditingIndex(null); // Exit editing mode
      // setEditState(true);
      if(updatedItems.length === 0) { 
        setEditState(false)
      }
      getCertificationData();
    })
    .catch(error => {
      console.error('Error updating item:', error);
    });
  };


  const addItem = () => {
    const newItem = {
      provider: { type: 'text', value: '', label: 'Provider' }, 
      name: { type: 'text', value: '', label: 'Name'}, 
      date: { type: 'date', value: '', label: 'Date'}, 
      expiry_date: { type: 'date', value: '', label: 'Expiry Date'}, 
      user_profile: items.length + 1
    };
    setItems([...items, newItem]);
    // setEditState(false);
    setIsEditingIndex(items.length); // Start editing the new item
  };

  const handleItemChange = (index, updatedItem) => {
    const updatedItems = items.map((item, i) => (i === index ? updatedItem : item));
    setItems(updatedItems);
  };

  const handleUpdateItem = (itemId, updatedItem) => {
    updateCertification(itemId, updatedItem)
      .then(response => {
        console.log('Item updated successfully:', response.data);
        const updatedItems = items.map(item => (item.id === itemId ? updatedItem : item));
        setItems(updatedItems);
        setEditState(true);
        setIsEditingIndex(null); 
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });
  };

  const saveAllItems = () => {
    const payload = items.map(item => ({
      provider:  item.provider.value,
      name:  item.name.value,
      date:  item.date.value,
      expiry_date:  item.expiry_date.value, 
      user_profile: item.user_profile
    }));

    addCertification(payload)
      .then(response => {
        console.log('Data saved successfully:', response.data);
        getCertificationData(); 
        setEditState(true)
        console.log('*****', editState)
        setIsEditingIndex(items.length - 1); 
      })
      .catch(error => {
        console.error('Error saving data:', error);
        setEditState(false);
        setIsEditingIndex(null);
      });
  };
  
  return (
    <div className="container mx-auto bg-white rounded-lg mb-2">
      <h1 className="text-start text-2xl bg-slate-400 p-2 pl-5 rounded-t-lg mb-4 font-semibold"><PiCertificateFill className='inline-flex' /> Certification</h1>
      <div className="p-4">
        <div className="bg-slate-50 rounded-lg shadow-md">
          <div className="flex flex-wrap -mx-2 mb-1">
            {items.length > 0 && Object.keys(items[0]).filter(key => key !== 'user_profile' && key !== 'id').map((key, idx) => (
              <div key={idx} className="flex-1 px-2">
                <label className="block mt-2 font-semibold">{items[0][key].label}</label>
              </div>
            ))}
          </div>
          <ul className='mb-4'>
            {items.map((item, index) => (
              <ListItems
                key={index}
                item={item}
                editState={editState}
                isEditing={isEditingIndex === index}
                setIsEditing={(editing) => setIsEditingIndex(editing ? index : null)}
                onChange={(updatedItem) => handleItemChange(index, updatedItem)}
                onSave={handleUpdateItem}
                onDelete={deleteItem}
                index={index}
                isFirstItem={index === 0 && items.length === 1}
              />
            ))}
          </ul>
        </div>
        <div className="flex space-x-4 justify-end">
          <button onClick={addItem} className="bg-green-500 text-base text-white p-2 rounded-md">
            <RiAddCircleLine className='inline-flex mr-1' />New
          </button>
          {items.length > 0 && (
            <button onClick={saveAllItems} className="bg-blue-500 text-base text-white p-2 rounded-md">
              <FaSave className='inline-flex' /> Save All
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certification;

