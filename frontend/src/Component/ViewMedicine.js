// ViewMedicine.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const ViewMedicine = () => {
   const [medicines, setMedicines] = useState([]);

   useEffect(() => {
      const fetchMedicines = async () => {
         try {
            const response = await axios.get('http://localhost:5000/api/getMedicines');
            setMedicines(response.data);
         } catch (error) {
            console.error('Error fetching medicines:', error);
         }
      };

      fetchMedicines();
   }, []);

   const handleDelete = async (medicineId) => {
      try {
         await axios.delete(`http://localhost:5000/api/medicines/${medicineId}`);
         setMedicines((prevMedicines) => prevMedicines.filter((medicine) => medicine.medicineID !== medicineId));
      } catch (error) {
         console.error('Error deleting medicine:', error);
      }
   };

   return (
      <div>
      <Navbar/>
      <div style={{backgroundImage:'url("https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize:'cover',height:'150vh'}}>
         <h1 className="box1">View Medicines</h1>
         <table border="1">
            <thead>
               <tr>
                  <th>Medicine ID</th>
                  <th>Name</th>
                  <th>Company Name</th>
                  <th>Quantity</th>
                  <th>Price Per Unit</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               {medicines.map((medicine) => (
                  <tr key={medicine.medicineID}>
                     <td>{medicine.medicineID}</td>
                     <td>{medicine.name}</td>
                     <td>{medicine.companyName}</td>
                     <td>{medicine.quantity}</td>
                     <td>{medicine.pricePerUnit}</td>
                     <td>
                        <button onClick={() => handleDelete(medicine.medicineID)}>Delete</button>
                        <Link to={`/UpdateMedicine/${medicine.medicineID}`}><button>Update</button></Link>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
      </div>
   );
};

export default ViewMedicine;
