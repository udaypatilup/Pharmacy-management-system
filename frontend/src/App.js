import './App.css';
import { BrowserRouter as Router, Routes, Route } from
  'react-router-dom';
import Home from './Component/Home';
import Signup from './Component/Signup';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import AddUser from './Component/AddUser';
import ViewUser from './Component/ViewUser';
import AddMedicine from './Component/AddMedicine';
import ViewMedicine from './Component/ViewMedicine';
import UpdateMedicine from './Component/UpdateMedicine';
import UpdateUser from './Component/UpdateUser';
import SellMedicine from './Component/SellMedicine'
function App() {
  return (
    <>
    <div>
    <Router>
      <Routes>
      <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/Dashboard" element={<Dashboard />} />
        <Route exact path="/AddUser" element={<AddUser/>}/>
        <Route exact path="/ViewUser" element={<ViewUser/>}/>
        <Route exact path="/AddMedicine" element={<AddMedicine/>}/>
        <Route exact path="/ViewMedicine" element={<ViewMedicine/>}/>
        <Route exact path="/UpdateMedicine/:id" element={<UpdateMedicine/>}/>
        <Route exact path="/UpdateUser/:id" element={<UpdateUser/>}/>
        <Route exact path="/SellMedicine" element={<SellMedicine/>}/>
      </Routes>

      
    </Router>
  </div>
  </>
    
  );
}

export default App;
