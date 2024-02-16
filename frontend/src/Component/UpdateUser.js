import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateUser = () => {
   const { id } = useParams();
   const [user, setUser] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchUserDetails = async () => {
         try {
            const response = await axios.get(`http://localhost:5000/api/customer/${id}`);
            setUser(response.data);
         } catch (error) {
            console.error('Error fetching user details:', error);
         }
      };

      fetchUserDetails();
   }, [id]);

   const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
   };

   const handleUpdate = async () => {
      try {
         await axios.put(`http://localhost:5000/api/customer/${id}`, user);
         alert('User updated successfully');
         navigate('/ViewUser'); // Redirect to the view user page after successful update
      } catch (error) {
         console.error('Error updating user:', error);
      }
   };

   if (!user) {
      return <div>Loading...</div>;
   }

   return (
      <div>
         <h1>Update User</h1>
         <form>
            <label>
               User ID:
               <input type="text" name="userID" value={user.userID} readOnly />
            </label>
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
            <button type="button" onClick={handleUpdate}>
               Update
            </button>
         </form>
      </div>
   );
};

export default UpdateUser;
