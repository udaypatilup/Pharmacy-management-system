import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const AddMedicine = () => {
   

   const [medicine, setMedicine] = useState({
      medicineID: '',
      name: '',
      companyName: '',
      quantity: 0,
      pricePerUnit: 0,
   });

   const handleChange = (e) => {
      setMedicine({ ...medicine, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await axios.post('http://localhost:5000/api/medicine', medicine);
         alert('Medicine added successfully');
         // Redirect to another page after successful submission
        
      } catch (error) {
         console.error('Error adding medicine:', error);
      }
   };

   return (
      <div>
      <Navbar/>
      <div style={{backgroundImage:'url("https://t4.ftcdn.net/jpg/02/38/70/67/360_F_238706716_aKnllr4AbeSc0wXX7YnwCjYx3K2MvbFL.jpg")', backgroundSize:'cover',height:'150vh'}}>
      <h1 class="box1">Add Medicines</h1>
      <form onSubmit={handleSubmit}>
         <label>
            <b>Medicine ID:</b>
            <input type="text" name="medicineID" onChange={handleChange} required />
         </label>
         <label>
            <b>Name:</b>
            <input type="text" name="name" onChange={handleChange} required />
         </label>
         <label>
           <b>Company Name:</b> 
            <input type="text" name="companyName" onChange={handleChange} required />
         </label>
         <label>
           <b>Quantity:</b> 
            <input type="number" name="quantity" onChange={handleChange} required />
         </label>
         <label>
            <b>Price Per Unit:</b>
            <input type="number" name="pricePerUnit" onChange={handleChange} required />
         </label>
         <button type="submit"><b>Save</b></button>
      </form>
      </div>
      </div>
   );
};

export default AddMedicine;
