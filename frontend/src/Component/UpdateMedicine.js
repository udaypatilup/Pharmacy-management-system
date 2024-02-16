// UpdateMedicine.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateMedicine = () => {
   const { id } = useParams();
   const [medicine, setMedicine] = useState(null);
   const navigate = useNavigate();
   useEffect(() => {
      const fetchMedicineDetails = async () => {
         try {
            const response = await axios.get(`http://localhost:5000/api/medicines/${id}`);
            setMedicine(response.data);
         } catch (error) {
            console.error('Error fetching medicine details:', error);
         }
      };

      fetchMedicineDetails();
   }, [id]);

   const handleChange = (e) => {
      setMedicine({ ...medicine, [e.target.name]: e.target.value });
   };

   const handleUpdate = async () => {
      try {
         await axios.put(`http://localhost:5000/api/medicines/${id}`, medicine);
         alert('Medicine updated successfully');
         navigate('/ViewMedicine');
      } catch (error) {
         console.error('Error updating medicine:', error);
      }
   };

   if (!medicine) {
      return <div>Loading...</div>;
   }

   return (
      <div>
         <h1>Update Medicine</h1>
         <form>
            <label>
               <b>Medicine ID:</b>
               <input type="text" name="medicineID" value={medicine.medicineID} readOnly />
            </label>
            <label>
               <b>Name:</b>
               <input type="text" name="name" value={medicine.name} onChange={handleChange} />
            </label>
            <label>
               <b>Company Name:</b>
               <input type="text" name="companyName" value={medicine.companyName} onChange={handleChange} />
            </label>
            <label>
               <b>Quantity:</b>
               <input type="number" name="quantity" value={medicine.quantity} onChange={handleChange} />
            </label>
            <label>
               <b>Price Per Unit:</b>
               <input type="number" name="pricePerUnit" value={medicine.pricePerUnit} onChange={handleChange} />
            </label>
            <button type="button" onClick={handleUpdate}>
              <b>Update</b>
            </button>
         </form>
      </div>
   );
};

export default UpdateMedicine;
