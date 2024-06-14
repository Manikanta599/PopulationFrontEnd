import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Rform from './components/Rform';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import  Home from './components/Home';
import  GetDetails  from './components/GetDetails';
import  Register  from './components/Register';
import  LogOut  from './components/LogOut';
import footer from './components/footer';
import { Loading } from './components/loading';

import UploadExcel from './components/UploadExcel';



function App() {
  
  return(
    <div>
      <Loading/>
      {/* <Navbar /> */}
      <Rform />
      
      <BrowserRouter>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getdetails" element={<GetDetails />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/fileupload" element={<UploadExcel/>} />
        
        </Routes>
      </BrowserRouter>
      
      {/* <footer/> */}
    </div>
  
  );
}

export default App;
