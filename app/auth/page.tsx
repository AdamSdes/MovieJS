"use client"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '@/app/login/page'; // Make sure the path to your Login component is correct
import Register from '@/app/register/page'; // You'll create a Register component similar to Login


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
