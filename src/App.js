import './App.css';
// import Header from './components/header/header';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer />
    <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  </>);
}

export default App;