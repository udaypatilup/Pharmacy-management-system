import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const ViewUser = () => {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const response = await axios.get('http://localhost:5000/api/customers');
            setUsers(response.data);
         } catch (error) {
            console.error('Error fetching users:', error);
         }
      };

      fetchUsers();
   }, []);

   const handleDelete = async (userID) => {
      try {
         await axios.delete(`http://localhost:5000/api/customer/${userID}`);
         setUsers((prevUsers) => prevUsers.filter((user) => user.userID !== userID));
      } catch (error) {
         console.error('Error deleting user:', error);
      }
   };

   return (
      <div>
      <Navbar/>
      <div style={{backgroundImage:'url("https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize:'cover',height:'150vh'}}>
         <h1 className="box1">View Users</h1>
         <table border="1">
            <thead>
               <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>MobileNumber</th>
                  <th>Address</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               {users.map((user) => (
                  <tr key={user.userID}>
                     <td>{user.userID}</td>
                     <td>{user.name}</td>
                     <td>{user.mobileNumber}</td>
                     <td>{user.email}</td>
                     <td>{user.address}</td>
                     <td>
                        <button className="btn1" onClick={() => handleDelete(user.userID)}>Delete</button>
                        <Link className="btn2 " to={`/UpdateUser/${user.userID}`}><button>Update</button></Link>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
      </div>
   );
};

export default ViewUser;
