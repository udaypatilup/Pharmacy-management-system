// Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <Navbar/>

      
    <div style={{backgroundImage:'url("https://img.freepik.com/premium-vector/background-pattern-illustration-theme-medical_554445-1008.jpg?w=740")', backgroundSize:'cover',height:'150vh'}}>
    
    <div className="dashboard">
      <Link className="dashboard-item" to="/AddUser">
      <img className="dashboard-item" src="./images/adduser.JPG" alt=""   />
      
      </Link>
      <Link className="dashboard-item" to="/ViewUser">
      <img className="dashboard-item" src="./images/viewuser.JPG" alt="" />
      

      </Link>
      <Link className="dashboard-item" to="/AddMedicine">
      <img className="dashboard-item" src="./images/addmedicine.JPG" alt="" />

      </Link>
      <Link className="dashboard-item" to="/ViewMedicine">
      <img className="dashboard-item" src="./images/viewmedicine.JPG" alt="" />

      </Link>
      <Link className="dashboard-item" to="/SellMedicine">
      <img className="dashboard-item" src="./images/sellmedicine.jpg" alt="" />

      </Link>
    </div>
    </div>
    </div>
  
  );
};

export default Dashboard;
