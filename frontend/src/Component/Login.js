//login page
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import Navbar from './Navbar';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to manage navigation history

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
  
      if (response.data.success) {
        // Redirect to the home page upon successful login
        navigate('/dashboard');
        setMessage("Logged in successfully")
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      navigate('/dashboard');
      setMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <div style={{backgroundImage:'url("https://images.unsplash.com/photo-1576063523519-6210121fb42d?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', backgroundSize:'cover',height:'150vh'}}>
      <div>
        <Navbar />
      </div>
      <div className='box'>
        <div className='box-styling my-3'>
          <div className='look my-5'>
            <h1 className="h1">Enter Your Details For Sign In</h1> 
            <form className='form1' onSubmit={handleLogin}>
              <div className="mb-3">
              
                <i className="fa fa-user"></i>
                <label htmlFor="exampleInputEmail1" className="form-text"><b>Email: </b><img className="log1" src="./images/email.png" alt="" width="20"/></label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder='Enter your email'
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text"></div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-text"><b>Password:</b><img className="log1" src="./images/lock.png" alt="" width="40"/></label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Sign In</button>
              {message && <p>{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

