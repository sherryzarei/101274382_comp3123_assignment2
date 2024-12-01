import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './components/Signup'; 
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import UpdateEmployee from './components/UpdateEmployee'; 
import ViewEmployee from './components/ViewEmployee';
import AddEmployee from './components/AddEmployee';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employeeList" element={<EmployeeList />} />
        <Route path="/update-employee/:id" element={<UpdateEmployee />} />
        <Route path="/view-employee/:id" element={<ViewEmployee />} />
        <Route path="/add-employee" element={<AddEmployee />} />

      </Routes>
    </Router>
  );
}

export default App;
