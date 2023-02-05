import './App.css';
import React from 'react';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

 
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home/>} />
            {/* <Route path="/login" element={<Login/>} /> */}
            <Route path="/callback" to = "/" element = {<Home/>} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
