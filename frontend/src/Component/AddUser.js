import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const AddUser = () => {
   const [user, setUser] = useState({
      userrole: '',
      name: '',
      mobileNumber: '',
      email: '',
      address: '',
   });

   const handleChange = (e) => {
      const { name, value } = e.target;

      // Additional validation based on input name
      if (name === 'name') {
         // Ensure that the value is a string
         setUser({ ...user, [name]: String(value) });
      } else if (name === 'mobileNumber') {
         // Ensure that the value is a valid integer
         setUser({ ...user, [name]: Number(value) || '' });
      } else if (name === 'email') {
         // Ensure that the value is a string or integer
         setUser({ ...user, [name]: String(value) });
      } else if (name === 'address') {
         // Ensure that the value is a string, integer, or float
         setUser({ ...user, [name]: value });
      } else {
         // For other fields, use the default behavior
         setUser({ ...user, [name]: value });
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await axios.post('http://localhost:5000/api/customer', user);
         alert('User added successfully');
      } catch (error) {
         console.error('Error adding user:', error);
      }
   };

   return (
      <div>
         <Navbar />
         <div style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/38/70/67/360_F_238706716_aKnllr4AbeSc0wXX7YnwCjYx3K2MvbFL.jpg")', backgroundSize: 'cover', height: '150vh' }}>
            <div>
               <h1 class="box1">Add User</h1>
               <form onSubmit={handleSubmit}>
                  <label>
                     Name:
                     <input type="text" name="name" value={user.name} onChange={handleChange} />
                  </label>

                  <label>
                     Mobile Number:
                     <input type="text" name="mobileNumber" value={user.mobileNumber} onChange={handleChange} />
                  </label>

                  <label>
                     Email:
                     <input type="text" name="email" value={user.email} onChange={handleChange} />
                  </label>

                  <label>
                     Address:
                     <input type="text" name="address" value={user.address} onChange={handleChange} />
                  </label>

                  <button type="submit">Save</button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default AddUser;
